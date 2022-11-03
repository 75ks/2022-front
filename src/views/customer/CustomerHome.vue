<template>
  <div class="w-full mt-12 md:mt-0">
    <div class="w-full m-auto py-8 bg-white">
      <p class="pb-10 text-center font-bold text-2xl">ホーム</p>
      <div class="w-full">
        <p class="mb-4 text-center font-bold">◆予約情報</p>
        <table
          v-if="state.customerHome.customerHomeReserve"
          class="w-11/12 m-auto"
        >
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">予約日時</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">{{ datetimeFormat2(state.customerHome.customerHomeReserve.reserveDatetime) }}</td>
          </tr>
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">メニュー</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">{{ state.customerHome.customerHomeReserve.menu }}</td>
          </tr>
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">料金</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">{{ state.customerHome.customerHomeReserve.price }}</td>
          </tr>
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">担当スタッフ</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">{{ state.customerHome.customerHomeReserve.stuffLastName }} {{ state.customerHome.customerHomeReserve.stuffFirstName }}</td>
          </tr>
        </table>
        <p
          v-if="!state.customerHome.customerHomeReserve"
          class="text-center"
        >
          ※予約はありません
        </p>
      </div>
      <div class="w-full mt-10">
        <p class="mb-4 text-center font-bold">◆来店履歴</p>
        <table
          v-if="salesHistoryListSplit.length"
          v-for="(salesHistory, index) in salesHistoryListSplit[selectedPage - 1]" :key="index"
          class="w-11/12 m-auto mb-4"
        >
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">来店日時</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">{{ datetimeFormat2(salesHistory.salesDatetime) }}</td>
          </tr>
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">メニュー</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">{{ salesHistory.menu }}</td>
          </tr>
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">料金</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">{{ salesHistory.price }}</td>
          </tr>
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">担当スタッフ</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">{{ salesHistory.stuffLastName }} {{ salesHistory.stuffFirstName }}</td>
          </tr>
        </table>
        <p
          v-if="!salesHistoryListSplit.length"
          class="text-center"
        >
          ※来店履歴はありません
        </p>
        <Pagination
          v-if="salesHistoryListSplit.length"
          :data-list-split="salesHistoryListSplit"
          v-model:selected-page="selectedPage"
          v-model:left-most-page="leftMostPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { datetimeFormat2 } from '../../utils/Format';
import { ref, reactive, computed } from 'vue';
import { CustomerHome } from '../../models/CustomerHome';
import { CustomerHomeSales } from '../../models/CustomerHomeSales';
import _ from 'lodash';
import axios from '../../plugins/axios';
import Pagination from '../../components/Atoms/Layout/Pagination.vue';

interface State {
  customerHome: CustomerHome;
}

const state = reactive<State>({
  customerHome: new CustomerHome()
});

const initialize = (): void => {
  axios.get("/customer/home/initialize")
    .then(({ data }) => {
      _.assign(state.customerHome, _.pick(data, _.keys(state.customerHome)));
    });
}
initialize();

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
const salesHistoryListSplit = computed<CustomerHomeSales[][]>(() => {
  const salesHistoryList = Object.assign([], state.customerHome.customerHomeSalesList);
  const salesHistoryListSplit: CustomerHomeSales[][] = [];
  const loopCount = Math.ceil(salesHistoryList.length / numberOfDisplay.value);
  for (let i = 0; i < loopCount; i++) {
    salesHistoryListSplit.push(salesHistoryList.splice(0, numberOfDisplay.value));
  }
  // 1ページ目を設定
  selectedPage.value = 1;
  // 一番左に表示しているページを1ページに設定
  leftMostPage.value = 1;
  return salesHistoryListSplit;
});
</script>

<style>
</style>
