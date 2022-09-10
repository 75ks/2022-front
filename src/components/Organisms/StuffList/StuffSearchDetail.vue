<template>
  <div class="flex justify-center mt-2 bg-white p-2">
    <table class="w-full">
      <thead>
        <tr>
          <th class="border border-gray-300 p-2 text-gray-600">スタッフID</th>
          <th class="border border-gray-300 p-2 text-gray-600">店舗コードID</th>
          <th class="border border-gray-300 p-2 text-gray-600">スタッフ名</th>
          <th class="border border-gray-300 p-2 text-gray-600">スタッフ仮名</th>
          <th class="border border-gray-300 p-2 text-gray-600">ランク</th>
          <th class="border border-gray-300 p-2 text-gray-600">年齢</th>
          <th class="border border-gray-300 p-2 text-gray-600">性別</th>
        </tr>
      </thead>
      <tbody class="hover:cursor-pointer">
        <tr
          v-for="(stuff, index) in stuffList" :key="index"
          @click="showModal(stuff)"
          class="hover:bg-slate-100"
        >
          <td class="border border-gray-300 p-2">{{ stuff.stuffId }}</td>
          <td class="border border-gray-300 p-2">{{ stuff.storeId }}</td>
          <td class="border border-gray-300 p-2">{{ stuff.lastName }}{{ stuff.firstName }}</td>
          <td class="border border-gray-300 p-2">{{ stuff.lastNameKana }}{{ stuff.firstNameKana }}</td>
          <td class="border border-gray-300 p-2">{{ stuff.rank }}</td>
          <td class="border border-gray-300 p-2">{{ stuff.age }}</td>
          <td class="border border-gray-300 p-2">{{ stuff.gender }}</td>
        </tr>
      </tbody>
    </table>
    <Modal
      :is-visible-modal="isVisibleModal"
      :modal-stuff-data="modalStuffData"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import Modal from './Modal.vue';
import { Stuff } from '../../../models/Stuff';
import { ref } from 'vue';

const props = defineProps<{
  stuffList: Stuff[]
}>();

/** モーダルに渡すデータ */
const modalStuffData = ref<Stuff>(new Stuff());
/** モーダル表示フラグ */
const isVisibleModal = ref<boolean>(false);
/** レコードクリックイベント(モーダルを表示する) */
const showModal = (stuffData: Stuff) => {
  modalStuffData.value = stuffData;
  isVisibleModal.value = true;
}
/** モーダル表示時、モーダル外クリックイベント(モーダルを非表示する) */
const closeModal = () => {
  isVisibleModal.value = false;
}
</script>

<style>
</style>
