<template>
  <div class="mt-2 bg-white p-2">
    <Pagination
      :tableItemList="customerList"
      v-model:perPageList="perPageList"
      v-model:currentPage="currentPage"
    />
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
          v-for="(customer, index) in perPageList[currentPage - 1]" :key="index"
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
import Pagination from '../Common/Pagination.vue';
import { ref } from 'vue';

const props = defineProps<{
  customerList: Customer[]
}>();

const router = useRouter();
// 現在のページ
const currentPage = ref<number>(1);
// ページ毎の塊に分割した配列
const perPageList = ref<Customer[][]>([]);

/** 顧客レコードクリックイベント(顧客詳細画面へ遷移) */
const onRowClicked = (selectedCustomerScreenObj: Customer) => {
  router.push({ path: `/customerDetail/${selectedCustomerScreenObj.customerId}` });
};

</script>

<style>
</style>
