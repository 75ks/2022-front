<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <CustomerCreateList />
</template>

<script>
import CustomerCreateList from './components/CustomerCreateList.vue'

export default {
  name: 'App',
  components: {
    CustomerCreateList
  }
}
</script>

<!-- <template>
  <div>
    <Header :header-name="'顧客登録'" />
    <ReserveSearchHeader />
    <CustomerCreateDetail :customer-create="customerCreateList" />
  </div>

</template>

<script setup lang="ts">
import Header from '../components/Common/Header.vue';
// import ReserveSearchDetail from '../components/CustomerCreate/CustomerCreateDetail.vue';
import { computed } from 'vue';
import { useCustomerCreateStore } from '../store/customerCreate';

const customerCreateStore = useCustomerCreateStore();

customerCreateStore.fetchCustomerCreates();

// const customerCreateList = computed(() => {
//   return customerCreateStore.getCustomerCreates;
// });
</script>

<style>
</style> -->
