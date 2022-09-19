<template>
  <vue-element-loading
    :active="isLoading"
    is-full-screen
    background-color="rgba(255, 255, 255, .5)"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean
}>();
</script>

<style>
</style>
