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
          @click="clear"
          :button-name="'クリア'"
          class="ml-2"
        />
      </div>
    </div>
    <div class="my-4 flex items-center justify-evenly">
      <div>
        <TextInput
          v-model:input-value='searchInput.reserveHistoryId'
          label="予約履歴ID"
        />
      </div>
      <div>
        <TextInput
          v-model:input-value='searchInput.customerName'
          label="顧客名"
        />
      </div>
      <div>
        <TextInput
          v-model:input-value='searchInput.stuffName'
          label="担当スタッフ"
        />
      </div>
      <div>
        <Rank
          v-model:select-value="searchInput.rank"
        />
      </div>
      <div>
        <Menu
          v-model:select-value="searchInput.menu"
        />
      </div>
    </div>
    <div class="my-4 flex items-center justify-evenly">
        <IntegerFromTo 
          v-model:from-input-value="searchInput.priceMin"
          v-model:to-input-value="searchInput.priceMax"
          label="料金"
        />
        <CalendarFromTo 
          v-model:from-input-value="searchInput.reserveDateTimeMin"
          v-model:to-input-value="searchInput.reserveDateTimeMax"
          label="日時"
        />
      <div>
        <ReserveState
          v-model:select-value="searchInput.reserveState"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from '../Common/CustomButton.vue';
import ReserveState from '../SelectOptions/ReserveState.vue';
import Rank from '../SelectOptions/Rank.vue';
import Menu from '../SelectOptions/Menu.vue';
import { reactive } from 'vue';
import { ReserveData } from '../../models/types/Reserve';
import { ReserveSearch } from '../../models/types/Reserve';
import { useReserveStore } from '../../store/reserve';
import TextInput from '../Common/TextInput.vue';
import IntegerFromTo from '../Common/IntegerFromTo.vue';
import CalendarFromTo from '../Common/CalendarFromTo.vue';

const reserveStore = useReserveStore();

/** 検索条件入力欄 */
const searchInput = reactive<ReserveSearch>({
  reserveHistoryId: '',
  customerName: '',
  stuffName: '',
  rank: '指定なし',
  menu: '指定なし',
  priceMin: null,
  priceMax: null,
  reserveDateTimeMin: '',
  reserveDateTimeMax: '',
  reserveState: '指定なし'
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
  searchInput.rank = '指定なし';
  searchInput.menu = '指定なし';
  searchInput.priceMin = null;
  searchInput.priceMax = null;
  searchInput.reserveDateTimeMin = '';
  searchInput.reserveDateTimeMax = '';
  searchInput.reserveState = '指定なし';
}

/** 検索条件入力欄がいずれも空の場合にtrueを返す */
const emptyInput = () => {
  return !searchInput.reserveHistoryId && !searchInput.customerName && !searchInput.stuffName && searchInput.rank === '指定なし' && searchInput.menu === '指定なし' && !searchInput.priceMin && !searchInput.priceMax && !searchInput.reserveDateTimeMin && !searchInput.reserveDateTimeMax && searchInput.reserveState === '指定なし';
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
  if (searchInput.rank !== '指定なし') {
    tmpReserveList = tmpReserveList.filter(obj => searchInput.rank == obj.rank);
  }
  return tmpReserveList;
}

/** メニューフィルター(完全一致) */
const searchMenu = (tmpReserveList: ReserveData[]) => {
  if (searchInput.menu !== '指定なし') {
    tmpReserveList = tmpReserveList.filter(obj => searchInput.menu == obj.menu);
  }
  return tmpReserveList;
}

/** 料金フィルター(範囲指定) */
const searchPrice = (tmpReserveList: ReserveData[]) => {
  if (searchInput.priceMin && searchInput.priceMax) {
    tmpReserveList = tmpReserveList.filter(obj => {
      return searchInput.priceMin! <= obj.price! && obj.price! <= searchInput.priceMax!;
    });
  } else if (searchInput.priceMin && !searchInput.priceMax) {
    tmpReserveList = tmpReserveList.filter(obj => {
      return searchInput.priceMin! <= obj.price!;
    });
  } else if (!searchInput.priceMin && searchInput.priceMax) {
    tmpReserveList = tmpReserveList.filter(obj => {
      return obj.price! <= searchInput.priceMax!;
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
  if (searchInput.reserveState !== '指定なし') {
    tmpReserveList = tmpReserveList.filter(obj => searchInput.reserveState == obj.reserveState);
  }
  return tmpReserveList;
}
</script>

<style>
</style>
