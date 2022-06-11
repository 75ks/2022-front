<template>
  <div class="p-2 mt-2 bg-white">
    <table class="w-full">
      <thead>
        <tr>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">予約履歴ID</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">顧客名</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">担当スタッフ</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">ランク</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">メニュー</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">料金</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">予約日時</th>
          <th class="border border-gray-300 px-2 py-2 text-gray-600">予約状態</th>
        </tr>
      </thead>
      <tbody class="hover:cursor-pointer">
        <tr
          v-for="(reserve, index) in reserveList" :key="index"
          @click="showModal(reserve)"
          class="hover:bg-slate-100"
        >
          <td class="border border-gray-300 px-2 py-2">{{ reserve.reserveHistoryId }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.customerLastName }} {{ reserve.customerFirstName }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.stuffLastName }} {{ reserve.stuffFirstName }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.rank }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.menu }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.price }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ datetimeFormat(reserve.reserveDatetime) }}</td>
          <td class="border border-gray-300 px-2 py-2">{{ reserve.reserveState && ReserveStates.get(reserve.reserveState) ? ReserveStates.get(reserve.reserveState) : "不明" }}</td>
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
import { ReserveStates } from '../../constants/ReserveStates';
import { datetimeFormat } from '../../utils/Format';
import { ref } from 'vue';

const props = defineProps<{
  reserveList: ReserveData[]
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
