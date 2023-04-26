<template>
  <div>
    <div class="row">
      <div class="col-12">
        <q-table title="" :rows="tableData" :columns="columns" row-key="id" id="table-ticket" square flat bordered
          v-model:pagination="companyStore.company_pagination" @request="changePagination" binary-state-sort hide-bottom
          style="max-height: calc(100vh - 65px); min-height: 200px;" class="text-portal">
          <template v-slot:top>
            <div class="q-pl-sm" style="margin-bottom: 50px;">
              <div class="flex">

                <div class="flex" style="position: absolute; top: 16px">
                  <div>
                    <q-btn icon="fas fa-plus-circle" color="grey-2 text-grey-8" class="border-button" unelevated
                      size="9px" label="Novo cadastro" @click="goToPage('companyCreate')" />
                  </div>

                  <div class="q-pl-sm">
                    <Paginate :pagination="companyStore.company_pagination" @change-pagination="changePagination" />
                  </div>
                </div>

                <!-- FILTER HEADER -->
                <div class="filter flex justify-end" style="margin-top: 1px">
                  <div style="width: 300px">
                    <q-input emit-value v-model="filter.input" v-bind="{ ...$visualInput }"
                      :standout="$q.dark.mode ? 'bg-input-custom-dark' : 'primary'"
                      :color="$q.dark.mode ? 'white' : 'grey-4'" :bg-color="!$q.dark.mode ? 'input-color' : ''"
                      :outlined="!$q.dark.mode ? true : false" class="full-width" clearable label="Pesquisar dados"
                      @keypress.enter="search">
                    </q-input>
                  </div>
                  <div class="q-pl-xs" style="padding-top: 4px;">
                    <q-btn color="grey-7" icon="fas fa-search" size="10px" round @click="search" />
                  </div>
                </div>
                <!-- / FILTER HEADER -->
              </div>
            </div>

            <div class="full-width absolute" style="margin-top: 47px">
              <q-separator />
            </div>
          </template>

          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th> - </q-th>
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props" class="animated fadeIn">
              <q-td auto-width>
                <div class="flex" style="min-width: 50px">
                  <div :class="checkIsLoading(props.rowIndex) ? '' : 'cursor-pointer'"
                    @click="goToPage('companyEdit', props.row.id)">
                    <!-- <q-spinner-tail color="primary" size="1.3rem" style="position: absolute; left: 12px"
                      v-if="checkIsLoading(props.rowIndex)" /> -->
                    <q-icon name="fas fa-pencil-alt" />
                  </div>
                  <div class="q-pl-md cursor-pointer">
                    <q-icon name="fas fa-file-alt"
                      :class="checkIsLoading(props.rowIndex) ? 'text-grey-5' : 'text-grey-7'" />
                  </div>
                </div>
              </q-td>

              <q-td v-for="col in props.cols" :key="col.name" :props="props" class="ellipsis">
                <div v-if="col.name !== 'priority' &&
                  col.name !== 'status' &&
                  col.name !== 'company' &&
                  col.name !== 'requester' &&
                  col.name !== 'responsible' &&
                  col.name !== 'subject'
                  ">
                  {{ col.value }}
                </div>
                <div v-if="col.name === 'company' || col.name === 'requester' || col.name === 'subject'"
                  :style="getMaxWithColum" class="ellipsis">
                  {{ col.value }}
                  <q-tooltip>
                    {{ col.value }}
                  </q-tooltip>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>

  <!-- DIALOG LOADING -->
  <DialogLoading v-if="loading" />
  <!-- / DIALOG LOADING -->
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount, computed } from 'vue';
import { useQuasar } from 'quasar';
import { firstCapitalize } from 'src/util/utils';
import Paginate from 'src/components/Paginate.vue';
import { useRouter } from 'vue-router';
import { CompanyService, TYPE_COMPANY } from '../services/company.service';
import { useCompanyStore } from 'src/stores/company';
import { OCCUPATION_AREA } from '../services/company.service';
import DialogLoading from 'src/components/DialogLoading.vue';

/**
 * @data
 */
const $q = useQuasar();
const router = useRouter();
const companyService = new CompanyService();
const companyStore = useCompanyStore();
const tableData: any = ref([]);
const rows_loading = ref<Array<number>>([]);
const loading = ref(true);
const filter = reactive({
  input: '',
});


const columns: any = [
  {
    name: 'id',
    required: true,
    label: 'id',
    align: 'left',
    field: (row: any) => row.id,
    format: (val: any) => !val ? ' - ' : val,
    sortable: true,
  },
  {
    name: 'cnpj',
    required: true,
    label: 'CNPJ',
    align: 'left',
    field: (row: any) => row.cnpj,
    format: (val: any) => !val ? ' - ' : val,
    sortable: true,
  },
  {
    name: 'corporate_name',
    required: true,
    label: 'Razão Social',
    align: 'left',
    field: (row: any) => row.corporate_name,
    format: (val: any) => !val ? ' - ' : firstCapitalize(val),
    sortable: true,
  },
  {
    name: 'occupation_area',
    required: true,
    label: 'Area de atuação',
    align: 'left',
    field: (row: any) => row.occupation_area,
    format: (val: any) => !val ? ' - ' : firstCapitalize(getOccupationArea(val) ?? ''),
    sortable: true,
  },
  {
    name: 'type_company',
    required: true,
    label: 'Tipo de empresa',
    align: 'left',
    field: (row: any) => row.type_company,
    format: (val: any) => !val ? ' - ' : firstCapitalize(getTypeCompany(val) ?? ''),
    sortable: true,
  }
];

/**
 * @methods
 */
const getData = async () => {

  try {

    const result = await companyService.getAll({
      input: companyStore.filter.input ?? '',
    }, {
      page: companyStore.company_pagination.page,
      per_page: companyStore.company_pagination.rowsPerPage,
      sort_by: companyStore.company_pagination.sortBy,
      sort_order: companyStore.company_pagination.descending ? 'desc' : 'asc',
    });

    tableData.value = result.data;

    companyStore.company_pagination.rowsNumber = result.total;

  } catch (error) {
    hideLoading();
  }
};

const changePagination = async (pagination: any) => {
  loading.value = true;
  let pagination_data = JSON.parse(JSON.stringify(pagination));
  pagination_data = pagination_data.pagination;
  companyStore.company_pagination = pagination_data;
  await getData();

  hideLoading();
};

const getTypeCompany = (typeCompany: string) => {
  if (typeCompany === TYPE_COMPANY.REAL_STATE) {
    return 'imobiliária';
  }
  if (typeCompany === TYPE_COMPANY.PROPERTY_DEVELOPER) {
    return 'incorporadora';
  }
};

const getOccupationArea = (occupationArea: string) => {
  if (occupationArea === OCCUPATION_AREA.INDUSTRIAL) {
    return 'industrial';
  }
  if (occupationArea === OCCUPATION_AREA.RESIDENTIAL) {
    return 'residencial';
  }
};

const search = async () => {
  loading.value = true;
  companyStore.filter.input = filter.input;
  await getData();
  hideLoading();
};

const checkIsLoading = (index: number) => {
  const check = rows_loading.value.includes(index);
  return check ? true : false;
};

const goToPage = (routeName: string, id?: number) => {

  if (!id) {
    router.push({
      name: routeName,
    });
  } else {
    router.push({
      name: routeName, params: {
        id: id,
      },
    });
  }
};

const hideLoading = () => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
};


/**
 * @computed
 */
const getMaxWithColum = computed(() => {
  const width = $q.screen.width;
  if (width <= 1024) {
    return 'max-width: 90px;';
  }
});

onBeforeMount(async () => {
  await getData();
  // pagination.value = { ...useTicketStore.ticket_pagination };
  // await useTicketStore.getTickets();
  hideLoading();
});
</script>

<style lang="scss" scoped>
.q-table thead tr,
.q-table tbody td {
  height: 30px;
}

.filter {
  position: absolute;
  right: 10px;
  min-width: 400px;
}

.table-tickets .q-table__top,
.q-table__bottom,
thead tr:first-child th {
  background-color: #ffff;
  color: $grey-7;
}

thead tr th {
  position: sticky;
  z-index: 1;
}

thead tr:first-child th {
  top: 0;
}
</style>

<style lang="scss">
#table-ticket .q-table__top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 0px;
  padding-right: 0px;
}
</style>
