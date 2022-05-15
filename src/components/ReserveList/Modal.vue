<template>
  <teleport to="body">
    <div
      v-show="isVisible"
      @click="close"
      class="fixed inset-0 bg-slate-700 opacity-75 flex flex-col items-center justify-center"
    >
    </div>
    <div
      v-show="isVisible"
      class="fixed top-1/2 left-1/2 bg-white flex flex-col items-center justify-center w-1/2 h-auto rounded p-5"
      id="modal-content"
    >
      <p>顧客ID: {{ modalReserveData?.customerId }}</p>
      <p>姓名: {{ modalReserveData?.customerLastName }} {{ modalReserveData?.customerFirstName }}</p>
      <p>スタッフ: {{ modalReserveData?.stuffLastName }} {{ modalReserveData?.stuffFirstName }}</p>
      <p>ランク名: {{ modalReserveData?.rankName }}</p>
      <p>メニュー: {{ modalReserveData?.menu }}</p>
      <p>値段: {{ modalReserveData?.price }}</p>
      <p>来店日: {{ modalReserveData?.reserveDate }}</p>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ReserveData } from '../../models/types/Reserve';

const props = defineProps<{
  isVisible: boolean
  modalReserveData?: ReserveData
}>();

const emits = defineEmits<{
  (e: 'close'): void
}>();

const close = () => {
  emits('close');
}
</script>

<style>
#modal-content {
  transform: translate(-50%, -50%);
}
</style>
