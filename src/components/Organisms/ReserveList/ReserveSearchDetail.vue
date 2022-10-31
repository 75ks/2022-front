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
          v-for="(reserve, index) in reserveListSplit[selectedPage - 1]" :key="index"
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
    <Pagination
      v-if="reserveListSplit.length"
      :data-list-split="reserveListSplit"
      v-model:selected-page="selectedPage"
      v-model:left-most-page="leftMostPage"
    />
    <Modal
      :is-visible-modal="isVisibleModal"
      :modal-reserve-data="modalReserveData"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import Modal from './Modal.vue';
import SelectBoxWithLabel from '../../Molecules/SelectBoxWithLabel.vue';
import Pagination from '../../Atoms/Layout/Pagination.vue';
import { Reserve } from '../../../models/Reserve';
import { datetimeFormat } from '../../../utils/Format';
import { ref, computed } from 'vue';

const props = defineProps<{
  reserveList: Reserve[]
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
const reserveListSplit = computed<Reserve[][]>(() => {
  const reserveList = Object.assign([], props.reserveList);
  const reserveListSplit: Reserve[][] = [];
  const loopCount = Math.ceil(reserveList.length / numberOfDisplay.value);
  for (let i = 0; i < loopCount; i++) {
    reserveListSplit.push(reserveList.splice(0, numberOfDisplay.value));
  }
  // 1ページ目を設定
  selectedPage.value = 1;
  // 一番左に表示しているページを1ページに設定
  leftMostPage.value = 1;
  return reserveListSplit;
});

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
