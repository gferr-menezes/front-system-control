<template>
  <q-layout>
    <q-page-container>
      <div class="bg-grey-9 full-width text-white" style="min-height: 40px; position: absolute; z-index: 999;">

        <div class="flex">
          <div>
            <img src="~/assets/web/logo.png" style="height: 40px; width: 40px; margin: 10px;" />
            <span style="position: absolute; top: 20px;">LOGO</span>
          </div>

          <div style="padding-left: 200px">
            <q-btn color="primary" label="Como funciona" flat class="text-white full-height" />
          </div>
          <div style="padding-left: 10px">
            <q-btn color="primary" label="Incorporador" flat class="text-white full-height" />
          </div>
          <div style="padding-left: 10px">
            <q-btn color="primary" label="Imobiliária" flat class="text-white full-height" />
          </div>
          <div style="position: absolute; right: 80px; height: 66px;">
            <q-btn color="primary" label="CADASTRE - SE" flat class="text-white full-height" square />
          </div>
          <div style="position: absolute; right: 0px; height: 66px;">
            <q-btn color="primary" label="LOGIN" flat class="text-white full-height bg-green" square
              @click="goToPage('auth')" />
          </div>

        </div>

      </div>
      <MainBanner class="q-pb-md" />
      <div style="max-width: 80vw; margin: 0 auto;">
        <IndexPage />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router';

import MainBanner from 'src/components/web/MainBanner.vue';
import IndexPage from 'src/components/web/IndexPage.vue';

const router = useRouter();

/**
 * methods
 */
const goToPage = (pageName: string) => {
  router.push({ name: pageName });
}
</script>

<style scoped></style>
