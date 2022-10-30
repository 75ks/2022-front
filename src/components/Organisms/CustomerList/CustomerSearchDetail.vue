<template>
  <div class="p-2 mt-2 bg-white">
    <div class="pb-2 w-1/5 ml-1">
      <SelectBoxWithLabel
        v-model:select-value="numberOfDisplay"
        targetUrl="/selectOption/numberOfDisplay"
        label="表示件数"
        :sideBySideFlg="true"
        inputWidth="w-2/3"
        :emptyOptionFlg="false"
      />
    </div>
    <table class="w-full mb-4">
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
          v-for="(customer, index) in customerListSplit[selectedPage - 1]" :key="index"
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
    <Pagination
      v-if="customerListSplit.length"
      :data-list-split="customerListSplit"
      v-model:selected-page="selectedPage"
      v-model:left-most-page="leftMostPage"
    />
  </div>
</template>

<script setup lang="ts">
import SelectBoxWithLabel from '../../Molecules/SelectBoxWithLabel.vue';
import Pagination from '../../Atoms/Layout/Pagination.vue';
import { Customer } from '../../../models/Customer';
import { Gender } from '../../../constants/Gender';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const props = defineProps<{
  customerList: Customer[]
}>();

const router = useRouter();

/** 選択ページ(初期値: 1ページ) */
const selectedPage = ref<number>(1);

/** ページネーション左端ページ(初期値: 1ページ) */
const leftMostPage = ref<number>(1);

/** 表示件数(初期値: 10件) */
const numberOfDisplayContainer = ref<number>(10);
const numberOfDisplay = computed<number>({
  get: () => numberOfDisplayContainer.value,
  set: (value) => numberOfDisplayContainer.value = value
});

/** 10件ずつデータを分割 */
const customerListSplit = computed<Customer[][]>(() => {
  const customerList = Object.assign([], props.customerList);
  const customerListSplit: Customer[][] = [];
  const loopCount = Math.ceil(customerList.length / numberOfDisplay.value);
  for (let i = 0; i < loopCount; i++) {
    customerListSplit.push(customerList.splice(0, numberOfDisplay.value));
  }
  // 1ページ目を設定
  selectedPage.value = 1;
  // 一番左に表示しているページを1ページに設定
  leftMostPage.value = 1;
  return customerListSplit;
});

/** 顧客レコードクリックイベント(顧客詳細画面へ遷移) */
const onRowClicked = (selectedCustomerScreenObj: Customer) => {
  router.push({ path: `/customerDetail/${selectedCustomerScreenObj.customerId}` });
};

</script>

<style>
</style>
