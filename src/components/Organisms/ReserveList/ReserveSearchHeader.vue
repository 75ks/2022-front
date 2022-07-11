<template>
  <div class="p-2 mt-2 bg-white">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'search']" class="w-4 h-4 font-black" />
        <p class="px-3 test-center">検索条件</p>
      </div>
      <div class="flex items-center">
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
    <div class="my-4 flex items-center justify-evenly">
      <div>
        <InputWithLabel
          v-model:input-value='searchForm.reserveHistoryId'
          label="予約履歴ID"
        />
      </div>
      <div>
        <InputWithLabel
          v-model:input-value='searchForm.customerName'
          label="顧客名"
        />
      </div>
      <div>
        <InputWithLabel
          v-model:input-value='searchForm.stuffName'
          label="担当スタッフ"
        />
      </div>
      <div>
        <SelectBoxWithLabel
          v-model:select-value="searchForm.rankName"
          targetUrl="/selectOption/ranks"
          label="ランク"
        />
      </div>
      <div>
        <SelectBoxWithLabel
          v-model:select-value="searchForm.menu"
          targetUrl="/selectOption/menus"
          label="メニュー"
        />
      </div>
    </div>
    <div class="my-4 flex items-center justify-evenly">
        <IntegerFromTo
          v-model:from-input-value="searchForm.priceMin"
          v-model:to-input-value="searchForm.priceMax"
          label="料金"
        />
        <CalendarFromTo
          v-model:from-input-value="searchForm.reserveDateTimeMin"
          v-model:to-input-value="searchForm.reserveDateTimeMax"
          label="日時"
        />
      <div>
        <SelectBoxWithLabel
          v-model:select-value="searchForm.reserveState"
          targetUrl="/selectOption/reserveStates"
          label="予約状態"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from '../../Atoms/Button/CustomButton.vue';
import { computed } from 'vue';
import { useReserveStore } from '../../../store/reserve';
import IntegerFromTo from '../../Molecules/IntegerFromTo.vue';
import CalendarFromTo from '../../Molecules/CalendarFromTo.vue';
import InputWithLabel from '../../Molecules/InputWithLabel.vue';
import SelectBoxWithLabel from '../../Molecules/SelectBoxWithLabel.vue';

const reserveStore = useReserveStore();

/** 検索条件入力欄 */
const searchForm = computed(() => {
  return reserveStore.getSearchCond;
})

/** 「検索」クリックイベント(検索条件でフィルターをかける) */
const search = async () => {
  await reserveStore.search(searchForm.value);
}

/** 「クリア」クリックイベント(検索条件入力欄を初期状態にし、データを再取得する) */
const clearSearchCond = () => {
  reserveStore.clearSearchCond();
}

</script>

<style>
</style>
