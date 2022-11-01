<template>
  <div>
    <Header
      header-name="スタッフ管理"
      createButtonTo="/stuffCreate"
    />
    <StuffSearchHeader />
    <StuffSearchDetail :stuff-list="stuffList" />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Atoms/Layout/Header.vue';
import StuffSearchHeader from '../components/Organisms/StuffList/StuffSearchHeader.vue';
import StuffSearchDetail from '../components/Organisms/StuffList/StuffSearchDetail.vue';
import { computed } from 'vue';
import { useStuffStore } from '../store/stuff';

const stuffStore = useStuffStore();

stuffStore.fetchStuffs();

const stuffList = computed(() => {
  return stuffStore.getStuffs;
});
</script>

<style>
</style>
