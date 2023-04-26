<template>
  <q-item clickable @click="goTo(routeName)">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
      <div style="position: absolute; top: 32px; font-size: 12px; left: 0px; padding-left: 1px;" class="full-width">
        {{ title }}
      </div>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

/**
 * data
 */
const router = useRouter();

/**
 * define props
 */
defineProps({
  title: {
    type: String,
    required: true
  },
  routeName: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    default: '',
    required: false
  }
});

/**
 * methods
 */
const goTo = (routeName?: string) => {
  if (routeName) {
    console.log('routeName', routeName);
    router.push({ name: routeName });
  }
}

</script>
