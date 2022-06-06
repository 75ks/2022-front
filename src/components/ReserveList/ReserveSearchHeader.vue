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
          :name="'検索'"
          class="bg-blue-400 hover:bg-blue-500"
        />
        <CustomButton
          @click="clear"
          :name="'クリア'"
          class="bg-gray-400 hover:bg-gray-500 ml-2"
        />
      </div>
    </div>
    <div class="my-4 flex items-center justify-between">
      <div>
<!--        <label for="customerId" class="block">顧客ID</label>-->
<!--        <CustomInput-->
<!--          v-model="searchInput.customerId"-->
<!--          :input-id="'customerId'"-->
<!--        />-->
        <TextInput
          v-model:inputValue='searchInput.customerId'
          label="顧客ID"
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
        <label for="price" class="block">料金</label>
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
        <label for="reserveDate" class="block">来店日</label>
        <CustomInput
          v-model="searchInput.reserveDateMin"
          :input-id="'reserveDate'"
        />
        <span> - </span>
        <CustomInput
          v-model="searchInput.reserveDateMax"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from '../Common/CustomInput.vue';
import CustomButton from '../Common/CustomButton.vue';
import { reactive } from 'vue';
import { ReserveData } from '../../models/types/Reserve';
import { ReserveSearch } from '../../models/types/Reserve';
import { useReserveStore } from '../../store/reserve';
import TextInput from '../Common/TextInput.vue';

const reserveStore = useReserveStore();

/** 検索条件入力欄 */
const searchInput = reactive<ReserveSearch>({
  customerId: null,
  customerName: '',
  stuffName: '',
  rankName: '',
  menu: '',
  priceMin: null,
  priceMax: null,
  reserveDateMin: '',
  reserveDateMax: ''
});

/** 「検索」クリックイベント(検索条件でフィルターをかける) */
const search = () => {
  if (emptyInput()) {
    alert("検索条件を入力してください");
  } else {
    reserveStore.fetchReserves();
    let tmpReserveList: ReserveData[] = reserveStore.getReserves;
    tmpReserveList = searchCustomerId(tmpReserveList);
    tmpReserveList = searchCustomerName(tmpReserveList);
    tmpReserveList = searchStuffName(tmpReserveList);
    tmpReserveList = searchRank(tmpReserveList);
    tmpReserveList = searchMenu(tmpReserveList);
    tmpReserveList = searchPrice(tmpReserveList);
    tmpReserveList = searchReserveDate(tmpReserveList);
    reserveStore.resetReserves();
    reserveStore.addReserves(tmpReserveList);
  }
}

/** 「クリア」クリックイベント(検索条件入力欄を初期状態にし、データを再取得する) */
const clear = () => {
  reserveStore.fetchReserves();
  searchInput.customerId = null;
  searchInput.customerName = '';
  searchInput.stuffName = '';
  searchInput.rankName = '';
  searchInput.menu = '';
  searchInput.priceMin = null;
  searchInput.priceMax = null;
  searchInput.reserveDateMin = '';
  searchInput.reserveDateMax = '';
}

/** 検索条件入力欄がいずれも空の場合にtrueを返す */
const emptyInput = () => {
  return !searchInput.customerId && !searchInput.customerName && !searchInput.stuffName && !searchInput.rankName && !searchInput.menu && !searchInput.priceMin && !searchInput.priceMax && !searchInput.reserveDateMin && !searchInput.reserveDateMax;
}

/** 顧客IDフィルター(完全一致) */
const searchCustomerId = (tmpReserveList: ReserveData[]) => {
  if (searchInput.customerId) {
    tmpReserveList = tmpReserveList.filter(obj => searchInput.customerId == obj.customerId);
  }
  return tmpReserveList;
}

/** 姓名フィルター(部分一致) */
const searchCustomerName = (tmpReserveList: ReserveData[]) => {
  if (searchInput.customerName) {
    const replaceSearchCustomerName = searchInput.customerName.replace(/\s+/g, '');
    tmpReserveList = tmpReserveList.filter(obj => {
      const replaceCustomerName = (obj.customerLastName + obj.customerFirstName).replace(/\s+/g, '');
      return replaceCustomerName.indexOf(replaceSearchCustomerName) != -1
    });
  }
  return tmpReserveList;
}

/** スタッフフィルター(部分一致) */
const searchStuffName = (tmpReserveList: ReserveData[]) => {
  if (searchInput.stuffName) {
    const replaceSearchStuffName = searchInput.stuffName.replace(/\s+/g, '');
    tmpReserveList = tmpReserveList.filter(obj => {
      const replaceStuffName = (obj.stuffLastName + obj.stuffFirstName).replace(/\s+/g, '');
      return replaceStuffName.indexOf(replaceSearchStuffName) != -1
    });
  }
  return tmpReserveList;
}

/** ランクフィルター(完全一致) */
const searchRank = (tmpReserveList: ReserveData[]) => {
  if (searchInput.rankName) {
    tmpReserveList = tmpReserveList.filter(obj => searchInput.rankName == obj.rankName);
  }
  return tmpReserveList;
}

/** メニューフィルター(完全一致) */
const searchMenu = (tmpReserveList: ReserveData[]) => {
  if (searchInput.menu) {
    tmpReserveList = tmpReserveList.filter(obj => searchInput.menu == obj.menu);
  }
  return tmpReserveList;
}

/** 料金フィルター(期間指定) */
const searchPrice = (tmpReserveList: ReserveData[]) => {
  if (searchInput.priceMin && searchInput.priceMax) {
    const NumberPriceMin = Number(searchInput.priceMin);
    const NumberPriceMax = Number(searchInput.priceMax);
    tmpReserveList = tmpReserveList.filter(obj => {
      const NumberObjPrice = Number(obj.price);
      return NumberPriceMin <= NumberObjPrice && NumberObjPrice <= NumberPriceMax;
    });
  }
  return tmpReserveList;
}

/** 来店日フィルター(期間指定) */
const searchReserveDate = (tmpReserveList: ReserveData[]) => {
  if (searchInput.reserveDateMin && searchInput.reserveDateMax) {
    // 後で処理を追加する
  }
  return tmpReserveList;
}
</script>

<style>
</style>
