<template>
  <div class="h-10 p-2 bg-white flex items-center">
    <p class="test-center font-bold">{{ headerName }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  headerName: string
}>();
</script>

<style>
</style>
