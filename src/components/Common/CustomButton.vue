<template>
  <button class="text-white font-bold py-1 px-3 active:outline-none focus:outline-none rounded">
    {{ name }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
}>();
</script>

<style>
</style>
