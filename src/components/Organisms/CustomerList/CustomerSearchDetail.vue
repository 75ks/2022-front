<template>
  <div class="flex justify-center mt-2 bg-white p-2">
    <table class="w-full">
      <thead>
        <tr>
          <th class="border border-gray-300 p-2 text-gray-600">顧客ID</th>
          <th class="border border-gray-300 p-2 text-gray-600">顧客名</th>
          <th class="border border-gray-300 p-2 text-gray-600">顧客名(カナ)</th>
          <th class="border border-gray-300 p-2 text-gray-600">年齢</th>
          <th class="border border-gray-300 p-2 text-gray-600">性別</th>
        </tr>
      </thead>
      <tbody class="hover:cursor-pointer">
        <tr
          v-for="(customer, index) in customerList" :key="index"
          @click="onRowClicked(customer)"
          class="hover:bg-slate-100"
          >
          <td class="border border-gray-300 p-2">{{ customer.customerId }}</td>
          <td class="border border-gray-300 p-2">{{ customer.lastName }}{{ customer.firstName }}</td>
          <td class="border border-gray-300 p-2">{{ customer.lastNameKana }}{{ customer.firstNameKana }}</td>
          <td class="border border-gray-300 p-2">{{ customer.age }}</td>
          <td class="border border-gray-300 p-2">{{ Gender.getNameByCode(customer.gender) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Customer } from '../../../models/Customer';
import { Gender } from '../../../constants/Gender';
import { useRouter } from 'vue-router';

const props = defineProps<{
  customerList: Customer[]
}>();

const router = useRouter();

/** 顧客レコードクリックイベント(顧客詳細画面へ遷移) */
const onRowClicked = (selectedCustomerScreenObj: Customer) => {
  router.push({ path: `/customerDetail/${selectedCustomerScreenObj.customerId}` });
};
//   const onRowClicked = (selectedCustomerScreenObj: Customer) => {
//   router.push({ path: '/customerDetail', query: { customerId: selectedCustomerScreenObj.customerId } });

//   return {
//     onRowClicked
//   };


</script>

<style>
</style>
