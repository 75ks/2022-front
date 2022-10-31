<template>
  <div class="p-2 mt-2 bg-white">
    <div class="pb-2 w-1/5 ml-1">
      <SelectBoxWithLabel
        v-model:select-value="numberOfDisplay"
        targetUrl="/selectOption/numberOfDisplay"
        label="表示件数"
        :sideBySideFlg="true"
        inputWidth="w-2/3"
        :emptyOptionFlg="false"
      />
    </div>
    <table class="w-full mb-4">
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
          v-for="(stuff, index) in stuffListSplit[selectedPage - 1]" :key="index"
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
    <Pagination
      v-if="stuffListSplit.length"
      :data-list-split="stuffListSplit"
      v-model:selected-page="selectedPage"
      v-model:left-most-page="leftMostPage"
    />
    <Modal
      :is-visible-modal="isVisibleModal"
      :modal-stuff-data="modalStuffData"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import Modal from './Modal.vue';
import SelectBoxWithLabel from '../../Molecules/SelectBoxWithLabel.vue';
import Pagination from '../../Atoms/Layout/Pagination.vue';
import { Stuff } from '../../../models/Stuff';
import { ref, computed } from 'vue';

const props = defineProps<{
  stuffList: Stuff[]
}>();

/** 選択ページ(初期値: 1ページ) */
const selectedPage = ref<number>(1);

/** ページネーション左端ページ(初期値: 1ページ) */
const leftMostPage = ref<number>(1);

/** 表示件数(初期値: 10件) */
const numberOfDisplayContainer = ref<number>(10);
const numberOfDisplay = computed<number>({
  get: () => numberOfDisplayContainer.value,
  set: (value) => numberOfDisplayContainer.value = value
});

/** 10件ずつデータを分割 */
const stuffListSplit = computed<Stuff[][]>(() => {
  const stuffList = Object.assign([], props.stuffList);
  const stuffListSplit: Stuff[][] = [];
  const loopCount = Math.ceil(stuffList.length / numberOfDisplay.value);
  for (let i = 0; i < loopCount; i++) {
    stuffListSplit.push(stuffList.splice(0, numberOfDisplay.value));
  }
  // 1ページ目を設定
  selectedPage.value = 1;
  // 一番左に表示しているページを1ページに設定
  leftMostPage.value = 1;
  return stuffListSplit;
});

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
