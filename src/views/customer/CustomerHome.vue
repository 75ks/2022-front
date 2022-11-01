<template>
  <div class="w-full mt-12 md:mt-0">
    <div class="w-full m-auto py-8 bg-white">
      <p class="pb-10 text-center font-bold text-2xl">ホーム</p>
      <div class="w-full">
        <p class="mb-4 text-center font-bold">◆予約情報</p>
        <table
          v-if="true"
          class="w-11/12 m-auto">
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">予約日時</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">{{ datetimeFormat("2022-04-03T20:41")}}</td>
          </tr>
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">メニュー</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">カット</td>
          </tr>
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">料金</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">5000</td>
          </tr>
          <tr>
            <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">担当スタッフ</th>
            <td class="w-3/5 border border-gray-300 px-2 py-2">池田 喜一郎</td>
          </tr>
        </table>
        <p
          v-if="false"
          class="text-center"
        >
          ※予約はありません
        </p>
      </div>
      <div class="w-full mt-10">
        <p class="mb-4 text-center font-bold">◆来店履歴</p>
        <table
          v-if="true"
          class="w-11/12 m-auto mb-4"
        >
          <tbody>
            <tr>
              <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">来店日時</th>
              <td class="w-3/5 border border-gray-300 px-2 py-2">{{ datetimeFormat("2022-04-03T20:41")}}</td>
            </tr>
            <tr>
              <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">メニュー</th>
              <td class="w-3/5 border border-gray-300 px-2 py-2">カット</td>
            </tr>
            <tr>
              <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">料金</th>
              <td class="w-3/5 border border-gray-300 px-2 py-2">5000</td>
            </tr>
            <tr>
              <th class="w-2/5 border border-gray-300 px-2 py-2 text-gray-600">担当スタッフ</th>
              <td class="w-3/5 border border-gray-300 px-2 py-2">池田 喜一郎</td>
            </tr>
          </tbody>
        </table>
        <p
          v-if="false"
          class="text-center"
        >
          ※来店履歴はありません
        </p>
        <Pagination
          v-if="true"
          :data-list-split="salesHistoryListSplit"
          v-model:selected-page="selectedPage"
          v-model:left-most-page="leftMostPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { datetimeFormat } from '../../utils/Format';
import { ref, reactive, computed } from 'vue';
import { CustomerHome } from '../../models/CustomerHome';
import _ from 'lodash';
import axios from '../../plugins/axios';
import Pagination from '../../components/Atoms/Layout/Pagination.vue';

interface State {
  salesHistoryList: SalesHistory[];
}

const state = reactive<State>({
  salesHistoryList: []
});

const initialize = (): void => {
  axios.get("/customer/home/initialize")
    .then(({ data }) => {
      Object.assign(state.salesHistoryList, data);
      _.assign(state.salesHistoryList, _.pick(data, _.keys(state.salesHistoryList)));
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
const salesHistoryListSplit = computed<SalesHistory[][]>(() => {
  const salesHistoryList = Object.assign([], state.salesHistoryList);
  const salesHistoryListSplit: SalesHistory[][] = [];
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
