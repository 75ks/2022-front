<template>
  <div>
    <Header :header-name="'顧客登録'" />
    <!-- <ReserveSearchHeader /> -->
    <!-- <CustomerCreateDetail :customer-create="customerCreate" /> -->
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Common/Header.vue';
// import ReserveSearchDetail from '../components/ReserveList/ReserveSearchDetail.vue';
import { computed } from 'vue';
import { useCustomerCreateStore } from '../store/customerCreate';

const customerCreateStore = useCustomerCreateStore();

customerCreateStore.fetchCustomerCreates();

const customerCreateList = computed(() => {
  return customerCreateStore.getCustomerCreates;
});
</script>

<style>
</style>
