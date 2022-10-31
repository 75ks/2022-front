<template>
  <div class="p-2 flex justify-between bg-white mt-2">
    <Loading :is-loading="isLoading"/>
    <div class="flex">
      <font-awesome-icon :icon="['fas', 'search']" class="w-4 h-4 font-black" />
      <p class="px-3 text-center">検索条件</p>
    </div>
    <div class="flex">
      <CustomButton
        @click="search"
        :button-name="'検索'"
        :button-color-number=1
      />
      <CustomButton
        @click="clearSearchCond"
        :button-name="'クリア'"
        class="ml-2"
      />
    </div>
  </div>
  <div class="p-3 grid grid-cols-6 gap-4 bg-white">
    <div>
      <InputWithLabel
        v-model:input-value='searchForm.stuffId'
        label="スタッフID"
      />
    </div>
    <div>
      <InputWithLabel
        v-model:input-value='searchForm.storeId'
        label="店舗コードID"
      />
    </div>
    <div>
      <InputWithLabel
        v-model:input-value='searchForm.stuffName'
        label="スタッフ名"
      />
    </div>
    <div>
      <SuggestInputWithLabel
        v-model:input-value='searchForm.rankName'
        targetUrl="/selectOption/ranks"
        label="ランク"
      />
    </div>
    <div>
      <InputWithLabel
        v-model:input-value='searchForm.age'
        label="年齢"
      />
    </div>
    <div>
      <InputWithLabel
        v-model:input-value='searchForm.gender'
        label="性別"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '../../Atoms/Layout/Loading.vue';
import CustomButton from '../../Atoms/Button/CustomButton.vue';
import { computed, ref } from 'vue';
import { useStuffStore } from '../../../store/stuff';
import InputWithLabel from '../../Molecules/InputWithLabel.vue';
import SuggestInputWithLabel from '../../Molecules/SuggestInputWithLabel.vue';

const stuffStore = useStuffStore();

/** 検索条件入力欄 */
const searchForm = computed(() => {
  return stuffStore.getSearchCond;
});

/** ローティングフラグ */
const isLoading = ref<boolean>(false);

/** 「検索」クリックイベント(検索条件でフィルターをかける) */
const search = async () => {
  try {
    isLoading.value = !isLoading.value;
    await stuffStore.search(searchForm.value);
  } catch (error) {
  } finally {
    isLoading.value = !isLoading.value;
  }
}

/** 「クリア」クリックイベント(検索条件入力欄を初期状態にし、データを再取得する) */
const clearSearchCond = () => {
  stuffStore.clearSearchCond();
}

</script>

<style>
</style>
