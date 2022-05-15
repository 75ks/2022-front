<template>
  <div class="p-2 mt-2 bg-white">
    <table class="w-full">
      <thead>
        <tr>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">顧客ID</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">姓名</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">スタッフ</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">ランク名</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">メニュー</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">値段</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">来店日</th>
        </tr>
      </thead>
      <tbody class="hover:cursor-pointer">
        <tr
          v-for="(sale, index) in saleList" :key="index"
          @click="showModal(sale)"
          class="hover:bg-slate-100"
        >
          <td class="border border-gray-300 px-2 py-2">{{ sale.customerId }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ sale.customerLastName }} {{ sale.customerFirstName }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ sale.stuffLastName }} {{ sale.stuffFirstName }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ sale.rankName }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ sale.menu }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ sale.price }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ sale.salesDate }}</td>
        </tr>
      </tbody>
    </table>
    <Modal
      :is-visible="modalVisible"
      :modal-sale-data="modalSaleData"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import Modal from './Modal.vue';
import { SaleData } from '../../models/types/Sale';
import { ref } from 'vue';

const props = defineProps<{
  saleList: SaleData[] | undefined
}>();

const modalSaleData = ref<SaleData>();
const modalVisible = ref<boolean>(false);
const showModal = (saleData: SaleData) => {
  modalSaleData.value = saleData;
  modalVisible.value = true;
}
const closeModal = () => {
  modalVisible.value = false;
}
</script>

<style>
</style>
