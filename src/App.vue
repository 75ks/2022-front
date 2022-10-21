<template>
  <div id="app" class="w-full min-h-screen md:flex">
    <SideBar v-if="isVisible" />
    <div class="w-full">
      <SuccessMessage class="mt-12 md:mt-0" />
      <router-view class="w-full p-2 bg-gray-200 min-h-screen" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from './components/Atoms/Layout/SideBar.vue';
import SuccessMessage from './components/Atoms/Layout/SuccessMessage.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const isVisible = computed<boolean>(() => {
  return !(useRoute().path === '/login' || useRoute().path === '/customer/login' || useRoute().name === 'NotFound');
});
</script>

<style>
</style>
