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
      <p>顧客ID: {{ modalSaleData?.customerId }}</p>
      <p>姓名: {{ modalSaleData?.customerLastName }} {{ modalSaleData?.customerFirstName }}</p>
      <p>スタッフ: {{ modalSaleData?.stuffLastName }} {{ modalSaleData?.stuffFirstName }}</p>
      <p>ランク名: {{ modalSaleData?.rankName }}</p>
      <p>メニュー: {{ modalSaleData?.menu }}</p>
      <p>値段: {{ modalSaleData?.price }}</p>
      <p>来店日: {{ modalSaleData?.salesDate }}</p>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { SaleData } from '../../models/types/Sale';

const props = defineProps<{
  isVisible: boolean
  modalSaleData?: SaleData
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
