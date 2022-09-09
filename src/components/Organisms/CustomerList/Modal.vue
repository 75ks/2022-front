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
      <p>スタッフID: {{ modalCustomerData?.customerId }}</p>
      <p>店舗コードID: {{ modalCustomerData?.storeId }}</p>
      <p>スタッフ名: {{ modalCustomerData?.lastName }} {{ modalCustomerData?.firstName }}</p>
      <p>スタッフ仮名: {{ modalCustomerData?.lastNameKana }} {{ modalCustomerData?.firstNameKana }}</p>
      <p>ランク: {{ modalCustomerData?.rank }}</p>
      <p>年齢: {{ modalCustomerData?.age }}</p>
      <p>性別: {{ modalCustomerData?.gender }}</p>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { Customer } from '../../../models/Customer';

interface Props {
  /** モーダル表示フラグ */
  isVisibleModal: boolean;
  /** モーダルが表示するデータ */
  modalCustomerData: Customer;
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