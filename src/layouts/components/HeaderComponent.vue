<template>
  <q-header :style="styleHeader">
    <q-toolbar>
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="$emit('toggleDrawer')" />
      <q-toolbar-title class="q-pl-none">
        <q-img src="~assets/logo.jpeg" spinner-color="primary" spinner-size="20px" width="80px" />
      </q-toolbar-title>

      <q-avatar color="primary" size="35px" class="cursor-pointer">
        <img src="~assets/profile-default.png">

        <q-menu class="q-pa-md" style="min-width: 200px;">
          <div class=" justify-center">
            <div class="column items-center">
              <q-avatar size="72px">
                <img src="~assets/profile-default.png">
              </q-avatar>
              <div class="text-subtitle1 q-mt-md q-mb-xs">Nome logado</div>
              <q-btn color="primary" label="Sair do sistema" push size="sm" v-close-popup @click="logout" />
            </div>
          </div>
        </q-menu>
      </q-avatar>
    </q-toolbar>
  </q-header>

  <DialogLoading v-if="dialogLogout" message="Efetuando logout" />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import DialogLoading from 'src/components/DialogLoading.vue';
import { ref, watch } from 'vue';

/**
 * emits
 */
defineEmits(['toggleDrawer']);

/**
 * props
 */
const props = defineProps({
  miniStateControl: {
    type: Boolean,
    default: false,
  },
});

/**
 * data
 */
const $q = useQuasar();
const dialogLogout = ref(false);
const styleHeader = ref({
  left: '70px',
});

/**
 * methods
 */
const logout = () => {
  dialogLogout.value = true;
  setTimeout(() => {
    $q.localStorage.clear();
    window.location.href = '/';
  }, 3000);
};

watch(
  () => props.miniStateControl,
  (value) => {
    if (!value) {
      styleHeader.value.left = '300px';
    } else {
      styleHeader.value.left = '70px';
    }
  },
);

</script>

<style scoped></style>
