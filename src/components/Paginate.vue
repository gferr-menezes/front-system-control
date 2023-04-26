<template>
  <div>
    <q-btn-dropdown color="grey-2 text-black" class="border-button" dense unelevated size="10px"
      :label="pagination.rowsPerPage" style="min-width: 50px;">
      <q-list v-for="per_page in rows_per_page_options" dense class="q-mt-sm">
        <q-item clickable v-close-popup @click="changeRowsPerPage(per_page)" class="justify-center"
          style="font-size: 12px;">
          {{ per_page }}
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn icon="first_page" color="grey-2 text-black" class="border-button" dense unelevated size="10px"
      @click="changePagination('first_page')" :disable="pagination.page === first_page" />
    <q-btn icon="chevron_left" color="grey-2 text-black" class="border-button" dense unelevated size="10px"
      :disable="pagination.page === first_page" @click="changePagination('previus_page')" />
    <q-btn color="grey-10 text-black" class="border-button q-px-sm" dense unelevated size="10px" flat bordered disable>
      {{ pagination.page }} / {{ last_page }}
    </q-btn>
    <q-btn icon="chevron_right" color="grey-2 text-black" class="border-button" dense unelevated size="10px"
      :disable="last_page === pagination.page" @click="changePagination('next_page')" />
    <q-btn icon="last_page" color="grey-2 text-black" class="border-button" dense unelevated size="10px"
      :disable="last_page === pagination.page" @click="changePagination('last_page')" />
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onBeforeMount } from 'vue';
import { Pagination } from 'src/models';
import { rows_per_page_options } from 'src/util/constants';

/**
 * @props
 */
const props = defineProps<{
  pagination: Pagination,
}>();

/**
 * @emits
 */
const emit = defineEmits<{
  (event: 'changePagination', args: {
    pagination: Pagination
  }): void
}>();

/**
 * @data
 */
const last_page = ref(0);
const first_page = ref(1);
let rows_per_page_selected: number = 0;

/**
 * @methods
 */
const changeRowsPerPage = (per_page: number) => {
  if (rows_per_page_selected === per_page) return;

  rows_per_page_selected = per_page;
  const pagination = props.pagination;
  pagination.rowsPerPage = per_page;
  pagination.page = first_page.value;

  emit('changePagination', {
    pagination
  });
};

const changePagination = (action: string) => {
  if (action === 'next_page') {
    const pagination = props.pagination;
    pagination.page += 1;

    emit('changePagination', {
      pagination
    });
  }

  if (action === 'first_page') {
    const pagination = props.pagination;
    pagination.page = first_page.value;

    emit('changePagination', {
      pagination
    });
  }

  if (action === 'previus_page') {
    const pagination = props.pagination;
    pagination.page -= 1;

    emit('changePagination', {
      pagination
    });
  }

  if (action === 'last_page') {
    const pagination = props.pagination;
    pagination.page = last_page.value;

    emit('changePagination', {
      pagination
    });
  }
}

const calculateLastPage = () => {
  const pagination = props.pagination;
  const total = pagination.rowsNumber;
  const per_page = pagination.rowsPerPage;

  last_page.value = Math.ceil(total / per_page);
};

watch(() => props.pagination, (_) => {
  calculateLastPage();
}, {
  deep: true
});

onBeforeMount(() => {
  rows_per_page_selected = props.pagination.rowsNumber;
  calculateLastPage();
});
</script>

<style scoped></style>
