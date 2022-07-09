<template>
  <div>
    <Header :header-name="'予約管理'" />
    <ReserveSearchHeader />
    <ReserveSearchDetail :reserve-list="reserveList" />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Atoms/Layout/Header.vue';
import ReserveSearchHeader from '../components/ReserveList/ReserveSearchHeader.vue';
import ReserveSearchDetail from '../components/ReserveList/ReserveSearchDetail.vue';
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
