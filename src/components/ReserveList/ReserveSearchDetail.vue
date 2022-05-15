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
          v-for="(reserve, index) in reserveList" :key="index"
          @click="showModal(reserve)"
          class="hover:bg-slate-100"
        >
          <td class="border border-gray-300 px-2 py-2">{{ reserve.customerId }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.customerLastName }} {{ reserve.customerFirstName }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.stuffLastName }} {{ reserve.stuffFirstName }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.rankName }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.menu }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.price }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.reserveDate }}</td>
        </tr>
      </tbody>
    </table>
    <Modal
      :is-visible="modalVisible"
      :modal-reserve-data="modalReserveData"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import Modal from './Modal.vue';
import { ReserveData } from '../../models/types/Reserve';
import { ref } from 'vue';

const props = defineProps<{
  reserveList: ReserveData[] | undefined
}>();

const modalReserveData = ref<ReserveData>();
const modalVisible = ref<boolean>(false);
const showModal = (reserveData: ReserveData) => {
  modalReserveData.value = reserveData;
  modalVisible.value = true;
}
const closeModal = () => {
  modalVisible.value = false;
}
</script>

<style>
</style>
