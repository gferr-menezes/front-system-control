<template>
  <div>
    <q-card flat bordered square>
      <div class="q-pl-md bg-grey-2" style="padding-top: 13px; padding-bottom: 10px;">
        <div class="text-weight-bold text-grey-8 text-uppercase">
          {{ typeAction === 'create' ? 'Cadastro' : 'Edição' }} de empresa
        </div>
        <!-- <div class="text-caption text-grey-5">
          {{ typeAction === 'create' ? 'Preencha os campos abaixo para cadastrar uma nova empresa.' : '' }}
        </div> -->
      </div>
      <q-card-section>
        <FormCompany />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import FormCompany from '../components/FormCompany.vue';
import { useRoute } from 'vue-router';

/**
 * @data
 */
const route = useRoute();
const typeAction = ref<'create' | 'edit'>('create');

onBeforeMount(() => {
  if (route.name === 'companyCreate') {
    typeAction.value = 'create';
  } else {
    typeAction.value = 'edit';
  }
});
</script>

<style scoped></style>
