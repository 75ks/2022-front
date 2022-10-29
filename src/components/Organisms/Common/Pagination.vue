<template>
  <div class="mt-4 py-2 flex float-right">
    <div class="mr-4">
      <label class="px-2 text-gray-500">表示件数</label>
      <select
        v-model="perPage"
        class="p-1 text-gray-500 border border-gray-300 rounded-md"
      >
        <option v-for="pageOption in pageOptions">{{ pageOption }}</option>
      </select>
    </div>
    <div class="mt-1">
      <ul class="inline-flex -space-x-px">
        <li>
          <a
            class="py-2 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            @click="showPreviousPage"
          >
            {{ '<' }}
          </a>
        </li>
        <li>
          <a
            v-for="pageNumber in pageNumberList"
            :key="pageNumber"
            class="py-2 px-3 border border-gray-300 cursor-pointer"
            :class="
              pageNumber === currentPage
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            "
            @click="changePage(pageNumber)"
          >
            {{ pageNumber }}
          </a>
        </li>

        <li>
          <a
            class="py-2 px-3 text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            @click="showNextPage"
          >
            {{ '>' }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

interface Props<T = unknown> {
  tableItemList?: T[];
  perPageList: T[][];
  currentPage: number;
}

interface Emits<T = unknown> {
  (e: "update:perPageList", perPageList: T[][]): void;
  (e: "update:currentPage", currentPage: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  tableItemList: () => [],
});

const emit = defineEmits<Emits>();

// 1ページあたりの表示数
const perPage = ref<number>(25);
// 1ページあたりの表示数選択肢
const pageOptions = ref<number[]>([5, 10, 25, 50]);

// 1ページあたりの表示数, 全ページのオブジェクト配列の変更を監視
watch(
  () => [perPage.value, props.tableItemList],
  <T = unknown>() => {
    // ページ毎の塊に分割した配列を親コンポーネントに返す
    const perPageList: T[][] = [];
    let tempList: T[] = [];
    props.tableItemList.forEach((obj, index) => {
      tempList.push(obj as T);
      //  1ページあたりの表示数、または一覧の最後に達した場合
      if (
        tempList.length == perPage.value ||
        index === props.tableItemList.length - 1
      ) {
        // ページ毎の塊を追加する
        perPageList.push(tempList);
        // tempListを初期化する
        tempList = [];
      }
    });
    // ページ毎の塊を親コンポーネントに返す
    emit("update:perPageList", perPageList);
    // 表示数が変更されたら1ページ目を表示する
    emit("update:currentPage", 1);
  }, { immediate: true, deep: true }
);

// ページ数の配列 例)[1,2,3,4,5]
const pageNumberList = computed<number[]>(() => {
  const pageNumberList = props.perPageList.map((obj, index) => {
    return index + 1;
  });

  if (props.currentPage - 2 <= 0) {
    // 現在のページが 1 or 2 の場合 1〜5まで表示
    return pageNumberList.slice(0, 5); // [1,2,3,4,5]
  } else if (props.currentPage + 1 >= props.perPageList.length) {
    // 現在のページが 最後 or 最後-1 の場合　最後〜5ページまで表示
    return pageNumberList.slice(-5);
  } else {
    // 上記以外の場合　現在のページ ±2 を表示
    // 例) 現在のページ: 11  [9,10,11,12,13]
    return pageNumberList.slice(props.currentPage - 3, props.currentPage + 2);
  }
});

/**
 * ページ変更イベント
 * @param pageNumber
 */
const changePage = (pageNumber: number) => {
  emit("update:currentPage", pageNumber);
};

/**
 * 前ページボタン押下イベント
 */
const showPreviousPage = () => {
  if (props.currentPage === 1) {
    return;
  }
  emit("update:currentPage", props.currentPage - 1);
};

/**
 * 次ページボタン押下イベント
 */
const showNextPage = () => {
  if (props.currentPage === props.perPageList.length) {
    return;
  }
  emit("update:currentPage", props.currentPage + 1);
};
</script>

<style scoped></style>
