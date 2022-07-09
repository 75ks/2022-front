<template>
  <div id="app" class="w-full flex">
    <SideBar />
    <router-view class="w-full h-screen p-2 bg-gray-200" />
  </div>
</template>

<script setup lang="ts">
import SideBar from './components/Atoms/Layout/SideBar.vue';
</script>

<style>
</style>
