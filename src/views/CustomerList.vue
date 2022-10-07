<template>
  <div>
    <Header
      header-name="顧客管理"
      createButtonTo="/customerCreate"
    />
    <CustomerSearchHeader />
    <CustomerSearchDetail :customer-list="customerList" />
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Atoms/Layout/Header.vue';
import CustomerSearchHeader from '../components/Organisms/CustomerList/CustomerSearchHeader.vue';
import CustomerSearchDetail from '../components/Organisms/CustomerList/CustomerSearchDetail.vue';
import { computed } from 'vue';
import { useCustomerStore } from '../store/customer';

const customerStore = useCustomerStore();

customerStore.fetchCustomers();

const customerList = computed(() => {
  return customerStore.getCustomers;
});
</script>

<style>
</style>
