<template>
  <div>
    <administor :reserve-list="reserveList"/>
  </div>
</template>

<script setup lang="ts">
import administor from '../components/Organisms/ReserveList/ Administor.vue';
import { computed } from 'vue';
import { useReserveStore } from '../store/reserve';

const administorStore = useReserveStore();

administorStore.fetchReserves();

const reserveList = computed(() => {
  return administorStore.getReserves;
});
</script>

<style>
</style>
