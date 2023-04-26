<template>
  <q-dialog v-model="openDialog" transition-duration="50" transition-show="fadeIn" transition-hide="fadeOut"
    position="top" no-backdrop-dismiss :full-width="$q.screen.lt.lg" :full-height="$q.screen.height < 800 ? true : false">
    <q-card :style="getWidth" square>

      <q-card-section class="bg-grey-2 q-py-none text-bold" style="padding-top: 10px; padding-bottom: 10px;">
        {{ title }}
      </q-card-section>

      <q-card-section class="q-pa-none">

        <FormCompany @closeDialog="openDialog = false" />

      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

import { ref, watch, computed } from 'vue';
import { useQuasar } from 'quasar';
import FormCompany from './FormCompany.vue';

/**
 * @types
 */
export type DialogFormData = {
  args: {
    open_dialog: boolean,
    action: 'create' | 'edit',
    field_id?: number,
  }
}

/**
 * @props
 */
const props = defineProps<{
  dataDialog: DialogFormData
}>();

/**
 * @data
 */
const $q = useQuasar();
const openDialog = ref(false);
const title = ref('');



/**
 * @computed
 */
const getWidth = computed(() => {
  const screen = $q.screen;

  if (screen.width > 1900 && screen.width < 2000) {
    return 'min-width: 70vw; margin-top: 1vh;';
  }

  if (screen.gt.lg) {
    return 'min-width: 50vw; margin-top: 1vh;';
  }

  if (screen.gt.md) {
    return 'min-width: 90vw; ';
  }

  if (screen.md) {
    if (screen.height < 800) {
      return 'min-width: 90vw; margin-top: 1vh;';
    }
    return 'min-width: 90vw';
  }
});

watch(props.dataDialog, async (value) => {

  if (value.args.action === 'create') {
    title.value = 'CADASTRO DE EMPRESA';
  } else {
    title.value = 'EDIÇÃO EMPRESA';
  }

  if (value.args.open_dialog) {
    openDialog.value = true
  }
})

</script>
