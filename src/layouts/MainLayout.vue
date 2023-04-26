<template>
  <q-layout view="lHh lpR lFf">

    <HeaderComponent v-if="showComponentsLayout" @toggleDrawer="toggleLeftDrawer" :miniStateControl="miniState" />

    <q-drawer v-model="leftDrawerOpen" bordered show-if-above :mini="miniState" v-if="showComponentsLayout">
      <q-list>
        <q-item-label header class="text-center">
          Menus de acesso
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container :style="stylePageContainer">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onBeforeMount, ref, watch } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import HeaderComponent from './components/HeaderComponent.vue';

/**
 * data
 */
const stylePageContainer = ref({
  paddingLeft: '80px',
  paddingRight: '11px',
  paddingTop: '62px',
});

const route = useRoute();

const linksList = [
  {
    title: 'Início',
    icon: 'home',
    link: null,
  },
  {
    title: 'Empresas',
    icon: 'store',
    routeName: 'company',
  },
  {
    title: 'Clientes',
    icon: 'group',
    link: null,
  }
];


const showComponentsLayout = ref(false);
const miniState = ref(true);
const leftDrawerOpen = ref(false);
const essentialLinks = linksList;




const toggleLeftDrawer = () => {
  miniState.value = !miniState.value;
}

const checkRoute = () => {
  const routeName = route.name;
  if (routeName === 'auth') {
    showComponentsLayout.value = false;
  } else {
    showComponentsLayout.value = true;
  }
}

watch(route, () => {
  checkRoute();
});

onBeforeMount(() => {
  checkRoute();
});

</script>

<style scoped>
div>>>.q-drawer {
  background-color: #252e35 !important;
  min-width: 70px;
  color: #A5A9AD;
}

div>>>.q-header {

  background-color: #FFFFFF !important;
  color: #252e35;
}
</style>
