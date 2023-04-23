<template>
  <q-layout view="lHh lpR lFf">

    <HeaderComponent v-if="showComponentsLayout" @toggleDrawer="toggleLeftDrawer" />

    <q-drawer v-model="leftDrawerOpen" bordered show-if-above :mini="miniState" v-if="showComponentsLayout">
      <q-list>
        <q-item-label header>
          Essential Links
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
});

const route = useRoute();

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
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
  left: 70px !important;
  background-color: #FFFFFF !important;
  color: #252e35;
}
</style>
