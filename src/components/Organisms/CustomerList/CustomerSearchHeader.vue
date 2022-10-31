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
        button-name="検索"
        :button-color-number=1
      />
      <CustomButton
        @click="clearSearchCond"
        button-name="クリア"
        class="ml-2"
      />
    </div>
  </div>
  <div class="p-3 grid grid-cols-6 gap-4 bg-white">
    <div>
      <InputWithLabel
        v-model:input-value='searchForm.customerId'
        placeholder="1"
        label="顧客ID"
      />
    </div>
    <div>
      <InputWithLabel
        v-model:input-value='searchForm.customerName'
        placeholder="山田"
        label="顧客名"
      />
    </div>
    <div>
      <InputWithLabel
        v-model:input-value='searchForm.age'
        placeholder="25"
        label="年齢"
      />
    </div>
    <div>
      <SelectBoxWithLabel
        v-model:select-value="searchForm.gender"
        :options="GenderList"
        label="性別"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '../../Atoms/Layout/Loading.vue';
import CustomButton from '../../Atoms/Button/CustomButton.vue';
import { computed, ref } from 'vue';
import { useCustomerStore } from '../../../store/customer';
import InputWithLabel from '../../Molecules/InputWithLabel.vue';
import SelectBoxWithLabel from '../../Molecules/SelectBoxWithLabel.vue';
import { GenderList } from '../../../constants/Gender';

const customerStore = useCustomerStore();

/** 検索条件入力欄 */
const searchForm = computed(() => {
  return customerStore.getSearchCond;
});

/** ローティングフラグ */
const isLoading = ref<boolean>(false);

/** 「検索」クリックイベント(検索条件でフィルターをかける) */
const search = async () => {
  try {
    isLoading.value = !isLoading.value;
    await customerStore.search(searchForm.value);
  } catch (error) {
  } finally {
    isLoading.value = !isLoading.value;
  }
}

/** 「クリア」クリックイベント(検索条件入力欄を初期状態にし、データを再取得する) */
const clearSearchCond = () => {
  customerStore.clearSearchCond();
}

</script>

<style>
</style>
