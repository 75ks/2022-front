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
          <td class="border border-gray-300 px-2 py-2">{{ reserve.reserveStateName }}</td>
        </tr>
      </tbody>
    </table>
    <Modal
      :is-visible-modal="isVisibleModal"
      :modal-reserve-data="modalReserveData"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import Modal from './Modal.vue';
import { Reserve } from '../../../models/Reserve';
import { datetimeFormat } from '../../../utils/Format';
import { ref } from 'vue';

const props = defineProps<{
  reserveList: Reserve[]
}>();

/** モーダルに渡すデータ */
const modalReserveData = ref<Reserve>(new Reserve());
/** モーダル表示フラグ */
const isVisibleModal = ref<boolean>(false);
/** レコードクリックイベント(モーダルを表示する) */
const showModal = (reserveData: Reserve) => {
  modalReserveData.value = reserveData;
  isVisibleModal.value = true;
}
/** モーダル表示時、モーダル外クリックイベント(モーダルを非表示する) */
const closeModal = () => {
  isVisibleModal.value = false;
}
</script>

<style>
</style>
