<template>
  <div id="app" class="w-full min-h-screen flex">
    <SideBar v-if="isVisible" />
    <router-view class="w-full p-2 bg-gray-200" />
  </div>
</template>

<script setup lang="ts">
import SideBar from './components/Atoms/Layout/SideBar.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const isVisible = computed<boolean>(() => {
  return !(useRoute().path === '/login' || useRoute().path.match('^/customer/.*$'));
});
</script>

<style>
</style>

