<template>
  <div class="flex justify-center mt-2 bg-white p-2">
    <table class="w-full">
      <thead>
        <tr>
          <th class="border border-gray-300 p-2 text-gray-600">顧客ID</th>
          <th class="border border-gray-300 p-2 text-gray-600">店舗コードID</th>
          <th class="border border-gray-300 p-2 text-gray-600">顧客名</th>
          <th class="border border-gray-300 p-2 text-gray-600">顧客仮名</th>
          <th class="border border-gray-300 p-2 text-gray-600">ランク</th>
          <th class="border border-gray-300 p-2 text-gray-600">年齢</th>
          <th class="border border-gray-300 p-2 text-gray-600">性別</th>
        </tr>
      </thead>
      <tbody class="hover:cursor-pointer">
        <tr
          v-for="(customer, index) in customerList" :key="index"
          @click="showModal(customer)"
          class="hover:bg-slate-100"
        >
          <td class="border border-gray-300 p-2">{{ customer.customerId }}</td>
          <td class="border border-gray-300 p-2">{{ customer.storeId }}</td>
          <td class="border border-gray-300 p-2">{{ customer.lastName }}{{ customer.firstName }}</td>
          <td class="border border-gray-300 p-2">{{ customer.lastNameKana }}{{ customer.firstNameKana }}</td>
          <td class="border border-gray-300 p-2">{{ customer.rank }}</td>
          <td class="border border-gray-300 p-2">{{ customer.age }}</td>
          <td class="border border-gray-300 p-2">{{ customer.gender }}</td>
        </tr>
      </tbody>
    </table>
    <Modal
      :is-visible-modal="isVisibleModal"
      :modal-customer-data="modalCustomerData"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import Modal from './Modal.vue';
import { Customer } from '../../../models/Customer';
import { ref } from 'vue';

const props = defineProps<{
  customerList: Customer[]
}>();

/** モーダルに渡すデータ */
const modalCustomerData = ref<Customer>(new Customer());
/** モーダル表示フラグ */
const isVisibleModal = ref<boolean>(false);
/** レコードクリックイベント(モーダルを表示する) */
const showModal = (customerData: Customer) => {
  modalCustomerData.value = customerData;
  isVisibleModal.value = true;
}
/** モーダル表示時、モーダル外クリックイベント(モーダルを非表示する) */
const closeModal = () => {
  isVisibleModal.value = false;
}
</script>

<style>
</style>
