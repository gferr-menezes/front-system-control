<template>
  <div>

    <div style="position: absolute; top: 10px; left: 23px;  z-index: 999;">
      <q-btn icon="fas fa-check-circle" color="white text-grey-8" class="border-button q-mr-sm" unelevated size="9px"
        label="Novo cadastro" :disable="route.name === 'companyCreate'" @click="newRegister">
      </q-btn>
    </div>

    <q-form @submit.prevent ref="myForm" style="padding-top: 30px;">
      <div class="row q-pl-sm">
        <div class="col-12 col-md-5 col-lg-3 col-xl-2 q-pr-sm">
          <label class="label-input">
            Tipo de empresa
            <span class="required">*</span>
          </label>
          <q-select transition-show="jump-up" transition-hide="jump-up" emit-value map-options v-model="form.type_company"
            v-bind="{ ...$visualInput }" :options="select.typeCompany"
            :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''" :color="$q.dark.mode ? 'white' : 'grey-4'"
            :bg-color="!$q.dark.mode ? 'input-color' : ''" :outlined="!$q.dark.mode ? true : false" class="full-width"
            :rules="[required]" :option-label="(val: any) => firstCapitalize(val.label)">
            <template v-slot:selected-item="scope">
              <div class="ellipsis">{{ firstCapitalize(scope.opt.label) }}</div>
            </template>
          </q-select>
        </div>
        <div class="col-12 col-md-5 col-lg-3 col-xl-2 q-pr-sm">
          <label class="label-input">
            Area de atuação
            <span class="required">*</span>
          </label>
          <q-select transition-show="jump-up" transition-hide="jump-up" emit-value map-options
            v-model="form.occupation_area" v-bind="{ ...$visualInput }" :options="select.occupationArea"
            :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''" :color="$q.dark.mode ? 'white' : 'grey-4'"
            :bg-color="!$q.dark.mode ? 'input-color' : ''" :outlined="!$q.dark.mode ? true : false" class="full-width"
            :rules="[required]" :option-label="(val: any) => firstCapitalize(val.label)">
            <template v-slot:selected-item="scope">
              <div class="ellipsis">{{ firstCapitalize(scope.opt.label) }}</div>
            </template>
          </q-select>
        </div>
        <div class="col-12 col-md-2 col-lg-6 col-xl-8" style="padding-top: 20px;">
          <q-checkbox v-model="form.gericada" label="Gericada ?" color="primary" />
        </div>
        <div class="col-12 col-md-3 col-lg-2 col-xl-2 q-pr-sm">
          <label class="label-input">
            CNPJ
            <span class="required">*</span>
          </label>
          <q-input emit-value v-model="form.cnpj" :clearable="false" v-bind="{ ...$visualInput }"
            :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''" :color="$q.dark.mode ? 'white' : 'grey-4'"
            :bg-color="!$q.dark.mode ? 'input-color' : ''" :outlined="!$q.dark.mode ? true : false" class="full-width"
            :rules="[required]" mask="##.###.###/####-##">
          </q-input>
        </div>
        <div class="col-12 col-md-4 col-lg-3 col-xl-3">
          <label class="label-input">
            Razão social
            <span class="required">*</span>
          </label>
          <q-input emit-value v-model="form.corporate_name" v-bind="{ ...$visualInput }"
            :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''" :color="$q.dark.mode ? 'white' : 'grey-4'"
            :bg-color="!$q.dark.mode ? 'input-color' : ''" :outlined="!$q.dark.mode ? true : false" :rules="[required]"
            class="full-width">
          </q-input>
        </div>
        <div class="col-12 col-md-5 col-lg-3 col-xl-3 q-pl-sm">
          <label class="label-input">
            Nome de fantasia
          </label>
          <q-input emit-value v-model="form.fantasy_name" v-bind="{ ...$visualInput }"
            :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''" :color="$q.dark.mode ? 'white' : 'grey-4'"
            :bg-color="!$q.dark.mode ? 'input-color' : ''" :outlined="!$q.dark.mode ? true : false" class="full-width">
          </q-input>
        </div>
      </div>

      <div v-for="(contact, index) in form.contacts">

        <div class="row q-pl-sm q-pb-sm" :class="index > 0 ? 'q-mt-lg' : ''">
          <div class="col-4">
            <div class="text-uppercase">
              Endereço {{ index + 1 }}
            </div>
            <q-separator />
          </div>
        </div>

        <div class="row q-py-sm">
          <div class="col-3 flex">
            <div class="q-pl-sm text-blue cursor-pointer" @click="actionAddress('add')">
              <q-icon name="fas fa-add" />
              Adicionar
            </div>
            <div class="q-px-md">
              |
            </div>
            <div class="text-red cursor-pointer" @click="actionAddress('remove', index)">
              <q-icon name="fas fa-trash" />
              Remover
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12 col-md-3 col-lg-2 col-xl-2 q-pl-sm">
            <label class="label-input">
              Telefone
              <span class="required">*</span>
            </label>
            <q-input emit-value v-model="form.contacts[index].phone" :clearable="false" v-bind="{ ...$visualInput }"
              :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''" :color="$q.dark.mode ? 'white' : 'grey-4'"
              :bg-color="!$q.dark.mode ? 'input-color' : ''" :outlined="!$q.dark.mode ? true : false" :rules="[required]"
              class="full-width" v-maska data-maska="['(##) ####-####', '(##) #####-####']">
            </q-input>
          </div>
          <div class="col-12 col-md-4 col-lg-2 col-xl-3 q-pl-sm">
            <label class="label-input">
              Email
            </label>
            <q-input emit-value v-model="form.contacts[index].email" :clearable="false" v-bind="{ ...$visualInput }"
              :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''" :color="$q.dark.mode ? 'white' : 'grey-4'"
              :bg-color="!$q.dark.mode ? 'input-color' : ''" :outlined="!$q.dark.mode ? true : false" class="full-width">
            </q-input>
          </div>
        </div>

        <div class="row q-pl-sm">
          <div class="col-12 col-md-3 col-lg-2 col-xl-1 q-pr-sm">
            <label class="label-input">
              CEP
            </label>
            <q-input emit-value v-model="form.contacts[index].zip_code" :clearable="false" v-bind="{ ...$visualInput }"
              :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''" :color="$q.dark.mode ? 'white' : 'grey-4'"
              :bg-color="!$q.dark.mode ? 'input-color' : ''" :outlined="!$q.dark.mode ? true : false" class="full-width"
              mask="#####-###" @keypress.enter="getAddressPerZipCode(form.contacts[index].zip_code as string, index)">

              <template v-slot:append>
                <q-btn icon="fas fa-search" color="primary" flat round size="10px"
                  @click="getAddressPerZipCode(form.contacts[index].zip_code as string, index)" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-md-5 col-lg-3 col-xl-2 q-pr-sm">
            <label class="label-input">
              Endereço
            </label>
            <q-input emit-value v-model="form.contacts[index].address" :clearable="false" v-bind="{ ...$visualInput }"
              :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''" :color="$q.dark.mode ? 'white' : 'grey-4'"
              :bg-color="!$q.dark.mode ? 'input-color' : ''" :outlined="!$q.dark.mode ? true : false" class="full-width">
            </q-input>
          </div>
          <div class="col-12 col-md-4 col-lg-2 col-xl-2" :class="{ 'q-pr-sm': $q.screen.gt.md }">
            <label class="label-input">
              Bairro
            </label>
            <q-input emit-value v-model="form.contacts[index].neighborhood" :clearable="false"
              v-bind="{ ...$visualInput }" :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''"
              :color="$q.dark.mode ? 'white' : 'grey-4'" :bg-color="!$q.dark.mode ? 'input-color' : ''"
              :outlined="!$q.dark.mode ? true : false" class="full-width" hint="">
            </q-input>
          </div>
          <div class="col-12 col-md-2 col-lg-2 col-xl-1 q-pr-sm">
            <label class="label-input">
              Numero
            </label>
            <q-input emit-value v-model="form.contacts[index].address_number" :clearable="false"
              v-bind="{ ...$visualInput }" :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''"
              :color="$q.dark.mode ? 'white' : 'grey-4'" :bg-color="!$q.dark.mode ? 'input-color' : ''"
              :outlined="!$q.dark.mode ? true : false" class="full-width">
            </q-input>
          </div>
          <div class="col-12 col-md-2 col-lg-2 col-xl-2 q-pr-sm">
            <label class="label-input">
              Complemento
            </label>
            <q-input emit-value v-model="form.contacts[index].address_complement" :clearable="false"
              v-bind="{ ...$visualInput }" :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''"
              :color="$q.dark.mode ? 'white' : 'grey-4'" :bg-color="!$q.dark.mode ? 'input-color' : ''"
              :outlined="!$q.dark.mode ? true : false" class="full-width">
            </q-input>
          </div>

          <div class="col-12 col-md-3 col-lg-2 col-xl-2 q-pr-sm">
            <label class="label-input">
              Estado
            </label>
            <q-select transition-show="jump-up" transition-hide="jump-up" emit-value map-options
              v-model="form.contacts[index].state" v-bind="{ ...$visualInput }" :options="select.states"
              :color="$q.dark.mode ? 'white' : 'primary'" :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''"
              :option-label="(opt: any) => firstCapitalize(opt.label)" :bg-color="!$q.dark.mode ? 'input-color' : ''"
              :outlined="!$q.dark.mode ? true : false" class="full-width" :clearable="false"
              @update:model-value="changeState(index)" />
          </div>
          <div class="col-12 col-md-5 col-lg-4 col-xl-2 q-pl-sm">
            <label class="label-input">
              Cidade
            </label>
            <q-select transition-show="jump-up" transition-hide="jump-up" emit-value map-options
              v-model="form.contacts[index].city" v-bind="{ ...$visualInput }" :options="select.cities"
              :color="$q.dark.mode ? 'white' : 'primary'" :standout="$q.dark.mode ? 'bg-input-custom-dark' : ''"
              :option-label="(opt: any) => firstCapitalize(opt.label)" :bg-color="!$q.dark.mode ? 'input-color' : ''"
              :outlined="!$q.dark.mode ? true : false" class="full-width" :clearable="false"
              :disable="!select.cities.length ? true : false || !form.contacts[index].state" />
          </div>
        </div>

      </div>

      <div class="q-pl-sm q-pr-sm text-left q-pt-md">
        <q-btn icon="fas fa-check-circle" color="white text-grey-8" class="border-button q-mr-sm" unelevated size="9px"
          label="Salvar" @click="submitForm" />
        <q-btn icon="fas fa-cancel" color="white text-grey-8" class="border-button" unelevated size="9px" label="Cancelar"
          @click="router.replace({
              name: 'company'
            })" />
      </div>
    </q-form>

    <!-- DIALOGS -->
    <DialogLoading v-if="loading" />
    <!-- / DIALOGS -->
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, ref, watch } from 'vue';
import { SelectBoxInterface } from 'src/models';
import { required } from 'src/util/rules-validaton';
import { firstCapitalize } from 'src/util/utils';
import DialogLoading from 'src/components/DialogLoading.vue';
import notification from 'src/util/notification';
import { CompanyService, InputCompany, OCCUPATION_AREA, TYPE_COMPANY } from '../services/company.service';
import { vMaska } from "maska";
import { GeolocaleService } from 'src/modules/geolocale/geolocale.service';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { InputContact } from '../services/company.service';

/**
 * @data
 */
const route = useRoute();
const router = useRouter();
const loading = ref(false);
const myForm: any = ref();
const geolocale = new GeolocaleService();
const companyService = new CompanyService();
const form = reactive<InputCompany>({
  type_company: TYPE_COMPANY.PROPERTY_DEVELOPER,
  cnpj: '',
  corporate_name: '',
  fantasy_name: '',
  gericada: false,
  occupation_area: OCCUPATION_AREA.RESIDENTIAL,
  contacts: [
    {
      phone: '',
      address: '',
      address_complement: '',
      address_number: '',
      city: '',
      state: '',
      email: '',
      neighborhood: '',
      zip_code: '',
    }
  ],
});

const select = reactive<{
  typeCompany: SelectBoxInterface[];
  occupationArea: SelectBoxInterface[];
  states: SelectBoxInterface[];
  cities: SelectBoxInterface[];
}>({
  typeCompany: [],
  occupationArea: [],
  states: [],
  cities: [],
});

/**
 * @methods
 */

const newRegister = () => {
  resetForm();
  router.replace({ name: 'companyCreate' });
}

const submitForm = async () => {
  const isValidForm = await myForm.value?.validate();
  if (!isValidForm) return;
  if (!form.id) {
    save();
  } else {
    update();
  }
};

const save = async () => {
  try {
    loading.value = true;
    const response = await companyService.create(form);
    router.replace({ name: 'companyEdit', params: { id: response.id } });
    notification.success();
    hideLoading();
  } catch (error) {
    notification.error();
    hideLoading();
  }
};

const update = async () => {

  try {
    loading.value = true;
    await companyService.update(form.id!, form);
    await edit();
    notification.success();
    hideLoading();
  } catch (error) {
    notification.error();
    hideLoading();
  }
};

const edit = async () => {

  try {

    const id = route.params.id as unknown as number;
    if (!id) return;
    const result = await companyService.findById(id);
    form.id = result.id;
    form.type_company = result.type_company as TYPE_COMPANY;
    form.cnpj = result.cnpj;
    form.corporate_name = firstCapitalize(result.corporate_name)!;
    form.fantasy_name = result.fantasy_name ? firstCapitalize(result.fantasy_name) : '';
    form.gericada = result.gericada;
    form.occupation_area = result.occupation_area as OCCUPATION_AREA;

    const contacts: InputContact[] = [];

    for await (const [index, contact] of result.contacts.entries()) {

      form.contacts[index].state = contact.state ?? '';
      await changeState(index);

      contacts.push({
        phone: contact.phone ?? '',
        address: contact.address ? firstCapitalize(contact.address) : '',
        address_complement: contact.address_complement ? firstCapitalize(contact.address_complement) : '',
        address_number: contact.address_number ? firstCapitalize(contact.address_number) : '',
        city: contact.city ? contact.city : '',
        state: contact.state ?? '',
        email: contact.email ?? '',
        neighborhood: contact.neighborhood ? firstCapitalize(contact.neighborhood) : '',
        zip_code: contact.zip_code ?? '',
      })

    }

    form.contacts = contacts;

    hideLoading();

  } catch (error) {
    hideLoading();
  }

};

const changeState = async (index: number) => {
  form.contacts[index].city = '';
  const contact = form.contacts[index];
  const state = contact.state ?? null;
  if (!state) return;
  loading.value = true;
  const cities = await geolocale.getCities(state);
  select.cities = cities.map((city) => {
    return {
      value: city.value,
      label: city.label,
    };
  });

  hideLoading();
}

const actionAddress = (action: 'add' | 'remove', index?: number) => {
  if (action === 'add') {

    form.contacts.push({
      phone: '',
      address: '',
      address_complement: '',
      address_number: '',
      city: '',
      state: '',
      email: '',
      neighborhood: '',
      zip_code: '',
    });

  }

  if (action === 'remove') {
    if (form.contacts.length === 1) {
      form.contacts = [];
      form.contacts.push({
        phone: '',
        address: '',
        address_complement: '',
        address_number: '',
        city: '',
        state: '',
        email: '',
        neighborhood: '',
        zip_code: '',
      });
    } else {
      if (index !== undefined && index !== null) {
        form.contacts.splice(index, 1);
      }
    }
  }

}

const getAddressPerZipCode = async (zipCode: string, index: number) => {
  if (!zipCode) return;

  try {

    loading.value = true;

    const address = await geolocale.getAddressPerZipCode(zipCode);
    if (!address) return;
    form.contacts[index].address = firstCapitalize(address.address);
    form.contacts[index].neighborhood = firstCapitalize(address.neighborhood);
    form.contacts[index].state = address.state;
    form.contacts[index].address_complement = address.complement ? firstCapitalize(address.complement) : '';

    await changeState(index);

    setTimeout(() => {
      form.contacts[index].city = address.city;
    }, 100);

    hideLoading();

  } catch (error) {
    hideLoading();
  }
}

const resetForm = () => {

  delete form.id;
  form.type_company = TYPE_COMPANY.PROPERTY_DEVELOPER;
  form.cnpj = '';
  form.corporate_name = '';
  form.fantasy_name = '';
  form.gericada = false;
  form.occupation_area = OCCUPATION_AREA.RESIDENTIAL;
  form.contacts = [];

  form.contacts.push({
    phone: '',
    address: '',
    address_complement: '',
    address_number: '',
    city: '',
    state: '',
    email: '',
    neighborhood: '',
    zip_code: '',
  });
}

const hideLoading = () => {
  setTimeout(() => {
    loading.value = false;
  }, 300);
};

watch(() => route.name, () => {
  if (route.name === 'companyEdit' && route.params.id) {
    edit();
  }
});

onBeforeMount(async () => {

  loading.value = true;

  select.typeCompany = [
    {
      label: 'Incorporadora',
      value: TYPE_COMPANY.PROPERTY_DEVELOPER
    }, {
      label: 'Imobiliária',
      value: TYPE_COMPANY.REAL_STATE
    }
  ];

  select.occupationArea = [
    {
      label: 'Residencial',
      value: OCCUPATION_AREA.RESIDENTIAL
    },
    {
      label: 'Industrial',
      value: OCCUPATION_AREA.INDUSTRIAL
    }
  ];

  const states = await geolocale.getStates();
  select.states = states.map((state) => {
    return {
      label: state.label,
      value: state.value
    }
  });


  /**
   * check route
   */
  if (route.name === 'companyEdit' && route.params.id) {
    edit();
  } else {
    hideLoading();
  }

});

</script>

<style scoped></style>
