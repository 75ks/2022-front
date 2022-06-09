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
    <div class="my-4 flex items-center justify-evenly">
      <div>
        <TextInput
          v-model:inputValue='searchInput.reserveHistoryId'
          label="顧客ID"
        />
      </div>
      <div>
        <label for="customerName" class="block">顧客名</label>
        <CustomInput
          v-model="searchInput.customerName"
          :input-id="'customerName'"
        />
      </div>
      <div>
        <label for="stuffName" class="block">担当スタッフ</label>
        <CustomInput
          v-model="searchInput.stuffName"
          :input-id="'stuffName'"
        />
      </div>
      <!-- TODO: ランクをプルダウンにする -->
      <div>
        <label for="rank" class="block">ランク</label>
        <CustomInput
          v-model="searchInput.rank"
          :input-id="'rank'"
        />
      </div>
      <!-- TODO: メニューをプルダウンにする -->
      <div>
        <label for="menu" class="block">メニュー</label>
        <CustomInput
          v-model="searchInput.menu"
          :input-id="'menu'"
        />
      </div>
    </div>
    <div class="my-4 flex items-center justify-evenly">
      <div>
        <label for="price" class="block">料金</label>
        <CustomInput
          v-model="searchInput.priceMin"
          :input-id="'price'"
        />
        <span>〜</span>
        <CustomInput
          v-model="searchInput.priceMax"
        />
      </div>
      <div>
        <label for="reserveDateTime" class="block">予約日時</label>
        <input
          v-model="searchInput.reserveDateTimeMin"
          type="datetime-local"
          class="w-48 px-2 py-1 border border-gray-300 active:outline-none focus:outline-none rounded"
          id="reserveDateTime"
        />
        <span>〜</span>
        <input
          v-model="searchInput.reserveDateTimeMax"
          type="datetime-local"
          class="w-48 px-2 py-1 border border-gray-300 active:outline-none focus:outline-none rounded"
        />
      </div>
      <div>
        <label for="reserveState" class="block">予約状態</label>
        <ReserveState
          v-model="searchInput.reserveState"
          :select-id="'reserveState'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from '../Common/CustomInput.vue';
import CustomButton from '../Common/CustomButton.vue';
import ReserveState from '../SelectOptions/ReserveState.vue';
import { reactive } from 'vue';
import { ReserveData } from '../../models/types/Reserve';
import { ReserveSearch } from '../../models/types/Reserve';
import { useReserveStore } from '../../store/reserve';
import TextInput from '../Common/TextInput.vue';

const reserveStore = useReserveStore();

/** 検索条件入力欄 */
const searchInput = reactive<ReserveSearch>({
  reserveHistoryId: '',
  customerName: '',
  stuffName: '',
  rank: '',
  menu: '',
  priceMin: null,
  priceMax: null,
  reserveDateTimeMin: '',
  reserveDateTimeMax: '',
  reserveState: null
});

/** 「検索」クリックイベント(検索条件でフィルターをかける) */
const search = async () => {
  if (emptyInput()) {
    alert("検索条件を入力してください");
  } else {
    await reserveStore.fetchReserves();
    let tmpReserveList: ReserveData[] = reserveStore.getReserves;
    tmpReserveList = searchReserveHistoryId(tmpReserveList);
    tmpReserveList = searchCustomerName(tmpReserveList);
    tmpReserveList = searchStuffName(tmpReserveList);
    tmpReserveList = searchRank(tmpReserveList);
    tmpReserveList = searchMenu(tmpReserveList);
    tmpReserveList = searchPrice(tmpReserveList);
    tmpReserveList = searchReserveDateTime(tmpReserveList);
    tmpReserveList = searchReserveState(tmpReserveList);
    reserveStore.addReserves(tmpReserveList);
  }
}

/** 「クリア」クリックイベント(検索条件入力欄を初期状態にし、データを再取得する) */
const clear = () => {
  reserveStore.fetchReserves();
  searchInput.reserveHistoryId = '';
  searchInput.customerName = '';
  searchInput.stuffName = '';
  searchInput.rank = '';
  searchInput.menu = '';
  searchInput.priceMin = null;
  searchInput.priceMax = null;
  searchInput.reserveDateTimeMin = '';
  searchInput.reserveDateTimeMax = '';
  searchInput.reserveState = null;
}

/** 検索条件入力欄がいずれも空の場合にtrueを返す */
const emptyInput = () => {
  return !searchInput.reserveHistoryId && !searchInput.customerName && !searchInput.stuffName && !searchInput.rank && !searchInput.menu && !searchInput.priceMin && !searchInput.priceMax && !searchInput.reserveDateTimeMin && !searchInput.reserveDateTimeMax && !searchInput.reserveState;
}

/** 予約履歴IDフィルター(完全一致) */
const searchReserveHistoryId = (tmpReserveList: ReserveData[]) => {
  if (searchInput.reserveHistoryId) {
    tmpReserveList = tmpReserveList.filter(obj => searchInput.reserveHistoryId == obj.reserveHistoryId);
  }
  return tmpReserveList;
}

/** 顧客名フィルター(部分一致) */
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

/** 担当スタッフフィルター(部分一致) */
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
  if (searchInput.rank) {
    tmpReserveList = tmpReserveList.filter(obj => searchInput.rank == obj.rank);
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

/** 料金フィルター(範囲指定) */
const searchPrice = (tmpReserveList: ReserveData[]) => {
  if (searchInput.priceMin && searchInput.priceMax) {
    const numberPriceMin = Number(searchInput.priceMin);
    const numberPriceMax = Number(searchInput.priceMax);
    tmpReserveList = tmpReserveList.filter(obj => {
      const numberObjPrice = Number(obj.price);
      return numberPriceMin <= numberObjPrice && numberObjPrice <= numberPriceMax;
    });
  } else if (searchInput.priceMin && !searchInput.priceMax) {
    const numberPriceMin = Number(searchInput.priceMin);
    tmpReserveList = tmpReserveList.filter(obj => {
      const numberObjPrice = Number(obj.price);
      return numberPriceMin <= numberObjPrice;
    });
  } else if (!searchInput.priceMin && searchInput.priceMax) {
    const numberPriceMax = Number(searchInput.priceMax);
    tmpReserveList = tmpReserveList.filter(obj => {
      const numberObjPrice = Number(obj.price);
      return numberObjPrice <= numberPriceMax;
    });
  }
  return tmpReserveList;
}

/** 予約日時フィルター(範囲指定) */
const searchReserveDateTime = (tmpReserveList: ReserveData[]) => {
  if (searchInput.reserveDateTimeMin && searchInput.reserveDateTimeMax) {
    const datetimeMin = new Date(searchInput.reserveDateTimeMin);
    const datetimeMax = new Date(searchInput.reserveDateTimeMax);
    tmpReserveList = tmpReserveList.filter(obj => {
      const dateObjReserveDatetime = new Date(obj.reserveDatetime);
      return datetimeMin <= dateObjReserveDatetime && dateObjReserveDatetime <= datetimeMax;
    });
  } else if (searchInput.reserveDateTimeMin && !searchInput.reserveDateTimeMax) {
    const datetimeMin = new Date(searchInput.reserveDateTimeMin);
    tmpReserveList = tmpReserveList.filter(obj => {
      const dateObjReserveDatetime = new Date(obj.reserveDatetime);
      return datetimeMin <= dateObjReserveDatetime;
    });
  } else if (!searchInput.reserveDateTimeMin && searchInput.reserveDateTimeMax) {
    const datetimeMax = new Date(searchInput.reserveDateTimeMax);
    tmpReserveList = tmpReserveList.filter(obj => {
      const dateObjReserveDatetime = new Date(obj.reserveDatetime);
      return dateObjReserveDatetime <= datetimeMax;
    });
  }
  return tmpReserveList;
}

/** 予約状態フィルター(完全一致) */
const searchReserveState = (tmpReserveList: ReserveData[]) => {
  if (searchInput.reserveState) {
    tmpReserveList = tmpReserveList.filter(obj => searchInput.reserveState == obj.reserveState);
  }
  return tmpReserveList;
}
</script>

<style>
</style>
