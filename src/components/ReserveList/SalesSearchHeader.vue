<template>
  <div class="p-2 mt-2 bg-white">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'search']" class="w-4 h-4 font-black" />
        <p class="px-3 test-center">検索条件</p>
      </div>
      <div class="flex items-center">
        <CustomButton
          :name="'検索'"
          class="bg-blue-400 hover:bg-blue-500"
        />
        <CustomButton
          @click="clearInput"
          :name="'クリア'"
          class="bg-gray-400 hover:bg-gray-500 ml-2"
        />
      </div>
    </div>
    <div class="my-4 flex items-center justify-between">
      <div>
        <label for="customerId" class="block">顧客ID</label>
        <CustomInput
          v-model="searchInput.customerId"
          :input-id="'customerId'"
        />
      </div>
      <div>
        <label for="customerName" class="block">姓名</label>
        <CustomInput
          v-model="searchInput.customerName"
          :input-id="'customerName'"
        />
      </div>
      <div>
        <label for="stuffName" class="block">スタッフ</label>
        <CustomInput
          v-model="searchInput.stuffName"
          :input-id="'stuffName'"
        />
      </div>
      <div>
        <label for="rankName" class="block">ランク名</label>
        <CustomInput
          v-model="searchInput.rankName"
          :input-id="'rankName'"
        />
      </div>
      <div>
        <label for="menu" class="block">メニュー</label>
        <CustomInput
          v-model="searchInput.menu"
          :input-id="'menu'"
        />
      </div>
      <div>
        <label for="price" class="block">値段</label>
        <CustomInput
          v-model="searchInput.priceMin"
          :input-id="'price'"
        />
        <span> - </span>
        <CustomInput
          v-model="searchInput.priceMax"
        />
      </div>
      <div>
        <label for="salesDate" class="block">来店日</label>
        <CustomInput
          v-model="searchInput.salesDateMin"
          :input-id="'salesDate'"
        />
        <span> - </span>
        <CustomInput
          v-model="searchInput.salesDateMax"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from '../Common/CustomInput.vue';
import CustomButton from '../Common/CustomButton.vue';
import { reactive } from 'vue';
import { SaleSearch } from '../../models/types/Sale';

/** 検索条件入力欄 */
const searchInput = reactive<SaleSearch>({
  customerId: null,
  customerName: '',
  stuffName: '',
  rankName: '',
  menu: '',
  priceMin: null,
  priceMax: null,
  salesDateMin: '',
  salesDateMax: ''
});

/** 「クリア」クリックイベント（検索条件入力欄を初期状態にする） */
const clearInput = () => {
  searchInput.customerId = null;
  searchInput.customerName = '';
  searchInput.stuffName = '';
  searchInput.rankName = '';
  searchInput.menu = '';
  searchInput.priceMin = null;
  searchInput.priceMax = null;
  searchInput.salesDateMin = '';
  searchInput.salesDateMax = '';
}
</script>

<style>
</style>
