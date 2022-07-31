<template>
  <div>
    <Header :header-name="'予約カレンダー'" />
    <ReserveListCalendarDetailVue />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Atoms/Layout/Header.vue';
import ReserveListCalendarDetailVue from '../components/Organisms/ReserveListCalendar/ReserveListCalendarDetail.vue';
import { computed } from 'vue';
import { useReserveStore } from '../store/reserve';

const reserveStore = useReserveStore();

reserveStore.fetchReserves();

const reserveList = computed(() => {
  return reserveStore.getReserves;
});
</script>

<style>
</style>
