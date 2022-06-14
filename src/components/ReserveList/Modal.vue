<template>
  <teleport to="body">
    <div
      v-show="isVisibleModal"
      @click="close"
      class="fixed inset-0 bg-slate-700 opacity-75 flex flex-col items-center justify-center"
    >
    </div>
    <div
      v-show="isVisibleModal"
      class="fixed top-1/2 left-1/2 bg-white flex flex-col items-center justify-center w-1/2 h-auto rounded p-5"
      id="modal-content"
    >
      <p>予約履歴ID: {{ modalReserveData?.reserveHistoryId }}</p>
      <p>顧客名: {{ modalReserveData?.customerLastName }} {{ modalReserveData?.customerFirstName }}</p>
      <p>担当スタッフ: {{ modalReserveData?.stuffLastName }} {{ modalReserveData?.stuffFirstName }}</p>
      <p>ランク: {{ modalReserveData?.rank }}</p>
      <p>メニュー: {{ modalReserveData?.menu }}</p>
      <p>料金: {{ modalReserveData?.price }}</p>
      <p>予約日時: {{ modalReserveData ? datetimeFormat(modalReserveData.reserveDatetime) : "" }}</p>
      <p>予約状態: {{ modalReserveData?.reserveState }}</p>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ReserveData } from '../../models/types/Reserve';
import { datetimeFormat } from '../../utils/Format';

interface Props {
  /** モーダル表示フラグ */
  isVisibleModal: boolean;
  /** モーダルが表示するデータ */
  modalReserveData: ReserveData;
}

interface Emits {
  (e: 'close'): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

/** モーダル表示時、モーダル外クリックイベント(モーダルを非表示する) */
const close = () => {
  emits('close');
}

</script>

<style>
#modal-content {
  transform: translate(-50%, -50%);
}
</style>
