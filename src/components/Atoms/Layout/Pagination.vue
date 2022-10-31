<template>
  <div class="flex flex-col">
    <ul class="pb-2 flex justify-center">
      <li
        @click="changePage(1, 1)"
        class="w-9 py-1 mr-2 text-center border border-blue-400 cursor-pointer select-none rounded text-blue-400 bg-white hover:bg-slate-100"
      >
        &lt&lt
      </li>
      <li
        @click="changePage(leftMostPage - 5, leftMostPage - 5)"
        class="w-9 py-1 mr-2 text-center border border-blue-400 cursor-pointer select-none rounded text-blue-400 bg-white hover:bg-slate-100"
      >
        &lt
      </li>
      <li
        v-for="(n, index) in dataListSplit.length > 5 ? 5 : dataListSplit.length" :key="index"
        @click="changePage(n + (leftMostPage - 1))"
        class="w-9 py-1 mr-2 text-center border border-blue-400 select-none rounded"
        :class="selectedPage === n + (leftMostPage - 1) ? 'text-white bg-blue-400 font-bold' : 'cursor-pointer text-blue-400 bg-white hover:bg-slate-100'"
      >
        {{ n + (leftMostPage - 1) }}
      </li>
      <li
        @click="changePage(leftMostPage + 5, leftMostPage + 5)"
        class="w-9 py-1 mr-2 text-center border border-blue-400 cursor-pointer select-none rounded text-blue-400 bg-white hover:bg-slate-100"
      >
        &gt
      </li>
      <li
        @click="changePage(dataListSplit.length, dataListSplit.length - 4)"
        class="w-9 py-1 text-center border border-blue-400 cursor-pointer select-none rounded text-blue-400 bg-white hover:bg-slate-100"
      >
        &gt&gt
      </li>
    </ul>
    <p class="text-center text-sm text-gray-400">{{ selectedPage }} / {{ dataListSplit.length }}ページ</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  /** データ分割リスト */
  dataListSplit: Object[][];
  /** 選択ページ */
  selectedPage: number;
  /** ページネーション左端ページ */
  leftMostPage: number;
}

interface Emits {
  (e: "update:selectedPage", value: number): number;
  (e: "update:leftMostPage", value: number): number;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const selectedPage = computed({
  get: () => props.selectedPage,
  set: (value) => {
    emits("update:selectedPage", value);
  }
});

const leftMostPage = computed ({
  get: () => props.leftMostPage,
  set: (value) => {
    emits("update:leftMostPage", value);
  }
});

/** ページボタン、"<<"ボタン、"<"ボタン、">"ボタン、">>"ボタンクリックイベント */
const changePage = (changePage: number, changeLeftMostPage?: number): void => {
  // 選択ページを変更
  // 選択ページがマイナスにならないようにチェック
  if (1 > changePage) {
    selectedPage.value = 1;
  // 選択ページがデータのlengthを超えないようにチェック
  } else if (props.dataListSplit.length < changePage) {
    selectedPage.value = props.dataListSplit.length;
  } else {
    selectedPage.value = changePage;
  }

  // 左端ページを変更
  if (changeLeftMostPage !== undefined && changeLeftMostPage !== null) {
    // "<<"ボタン、"<"ボタンクリック時
    if (changeLeftMostPage < leftMostPage.value) {
      changeLeftMostPagePrev(changeLeftMostPage);
    // ">"ボタン、">>"ボタンクリック時
    } else {
      changeLeftMostPageNext(changeLeftMostPage);
    }
  }
}

/** 左端ページを戻す */
const changeLeftMostPagePrev = (changeLeftMostPage: number) => {
  //  左端ページがマイナスにならないようにチェック
  if (leftMostPage.value <= 5 && changeLeftMostPage <= 5) {
    leftMostPage.value = 1;
  } else {
    leftMostPage.value = changeLeftMostPage;
  }
}

/** 左端ページを進める */
const changeLeftMostPageNext = (changeLeftMostPage: number) => {
  //  右端ページがデータのlengthを超えないようにチェック
  const datalistSplitLength = props.dataListSplit.length - 4;
  if (changeLeftMostPage > datalistSplitLength) {
    if (datalistSplitLength <= 0) {
      leftMostPage.value = 1;
    } else {
      leftMostPage.value = datalistSplitLength;
    }
  } else {
    leftMostPage.value = changeLeftMostPage;
  }
}
</script>

<style>
</style>
