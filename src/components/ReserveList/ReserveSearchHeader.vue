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
          v-model:input-value='searchForm.reserveHistoryId'
          label="予約履歴ID"
        />
      </div>
      <div>
        <TextInput
          v-model:input-value='searchForm.customerName'
          label="顧客名"
        />
      </div>
      <div>
        <TextInput
          v-model:input-value='searchForm.stuffName'
          label="担当スタッフ"
        />
      </div>
      <div>
        <Rank
          v-model:select-value="searchForm.rank"
        />
      </div>
      <div>
        <Menu
          v-model:select-value="searchForm.menu"
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
        <ReserveState
          v-model:select-value="searchForm.reserveState"
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
import { Reserve } from '../../models/Reserve';
import { ReserveSearchForm } from '../../models/form/ReserveSearchForm';
import { useReserveStore } from '../../store/reserve';
import TextInput from '../Common/TextInput.vue';
import IntegerFromTo from '../Common/IntegerFromTo.vue';
import CalendarFromTo from '../Common/CalendarFromTo.vue';

const reserveStore = useReserveStore();

/** 検索条件入力欄 */
const searchForm = reactive<ReserveSearchForm>({
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
    let tmpReserveList: Reserve[] = reserveStore.getReserves;
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
  searchForm.reserveHistoryId = '';
  searchForm.customerName = '';
  searchForm.stuffName = '';
  searchForm.rank = '指定なし';
  searchForm.menu = '指定なし';
  searchForm.priceMin = null;
  searchForm.priceMax = null;
  searchForm.reserveDateTimeMin = '';
  searchForm.reserveDateTimeMax = '';
  searchForm.reserveState = '指定なし';
}

/** 検索条件入力欄がいずれも空の場合にtrueを返す */
const emptyInput = () => {
  return !searchForm.reserveHistoryId && !searchForm.customerName && !searchForm.stuffName && searchForm.rank === '指定なし' && searchForm.menu === '指定なし' && !searchForm.priceMin && !searchForm.priceMax && !searchForm.reserveDateTimeMin && !searchForm.reserveDateTimeMax && searchForm.reserveState === '指定なし';
}

/** 予約履歴IDフィルター(完全一致) */
const searchReserveHistoryId = (tmpReserveList: Reserve[]) => {
  if (searchForm.reserveHistoryId) {
    tmpReserveList = tmpReserveList.filter(obj => searchForm.reserveHistoryId == obj.reserveHistoryId);
  }
  return tmpReserveList;
}

/** 顧客名フィルター(部分一致) */
const searchCustomerName = (tmpReserveList: Reserve[]) => {
  if (searchForm.customerName) {
    const replaceSearchCustomerName = searchForm.customerName.replace(/\s+/g, '');
    tmpReserveList = tmpReserveList.filter(obj => {
      const replaceCustomerName = (obj.customerLastName + obj.customerFirstName).replace(/\s+/g, '');
      return replaceCustomerName.indexOf(replaceSearchCustomerName) != -1
    });
  }
  return tmpReserveList;
}

/** 担当スタッフフィルター(部分一致) */
const searchStuffName = (tmpReserveList: Reserve[]) => {
  if (searchForm.stuffName) {
    const replaceSearchStuffName = searchForm.stuffName.replace(/\s+/g, '');
    tmpReserveList = tmpReserveList.filter(obj => {
      const replaceStuffName = (obj.stuffLastName + obj.stuffFirstName).replace(/\s+/g, '');
      return replaceStuffName.indexOf(replaceSearchStuffName) != -1
    });
  }
  return tmpReserveList;
}

/** ランクフィルター(完全一致) */
const searchRank = (tmpReserveList: Reserve[]) => {
  if (searchForm.rank !== '指定なし') {
    tmpReserveList = tmpReserveList.filter(obj => searchForm.rank == obj.rank);
  }
  return tmpReserveList;
}

/** メニューフィルター(完全一致) */
const searchMenu = (tmpReserveList: Reserve[]) => {
  if (searchForm.menu !== '指定なし') {
    tmpReserveList = tmpReserveList.filter(obj => searchForm.menu == obj.menu);
  }
  return tmpReserveList;
}

/** 料金フィルター(範囲指定) */
const searchPrice = (tmpReserveList: Reserve[]) => {
  if (searchForm.priceMin && searchForm.priceMax) {
    tmpReserveList = tmpReserveList.filter(obj => {
      return searchForm.priceMin! <= obj.price! && obj.price! <= searchForm.priceMax!;
    });
  } else if (searchForm.priceMin && !searchForm.priceMax) {
    tmpReserveList = tmpReserveList.filter(obj => {
      return searchForm.priceMin! <= obj.price!;
    });
  } else if (!searchForm.priceMin && searchForm.priceMax) {
    tmpReserveList = tmpReserveList.filter(obj => {
      return obj.price! <= searchForm.priceMax!;
    });
  }
  return tmpReserveList;
}

/** 予約日時フィルター(範囲指定) */
const searchReserveDateTime = (tmpReserveList: Reserve[]) => {
  if (searchForm.reserveDateTimeMin && searchForm.reserveDateTimeMax) {
    const datetimeMin = new Date(searchForm.reserveDateTimeMin);
    const datetimeMax = new Date(searchForm.reserveDateTimeMax);
    tmpReserveList = tmpReserveList.filter(obj => {
      const dateObjReserveDatetime = new Date(obj.reserveDatetime);
      return datetimeMin <= dateObjReserveDatetime && dateObjReserveDatetime <= datetimeMax;
    });
  } else if (searchForm.reserveDateTimeMin && !searchForm.reserveDateTimeMax) {
    const datetimeMin = new Date(searchForm.reserveDateTimeMin);
    tmpReserveList = tmpReserveList.filter(obj => {
      const dateObjReserveDatetime = new Date(obj.reserveDatetime);
      return datetimeMin <= dateObjReserveDatetime;
    });
  } else if (!searchForm.reserveDateTimeMin && searchForm.reserveDateTimeMax) {
    const datetimeMax = new Date(searchForm.reserveDateTimeMax);
    tmpReserveList = tmpReserveList.filter(obj => {
      const dateObjReserveDatetime = new Date(obj.reserveDatetime);
      return dateObjReserveDatetime <= datetimeMax;
    });
  }
  return tmpReserveList;
}

/** 予約状態フィルター(完全一致) */
const searchReserveState = (tmpReserveList: Reserve[]) => {
  if (searchForm.reserveState !== '指定なし') {
    tmpReserveList = tmpReserveList.filter(obj => searchForm.reserveState == obj.reserveState);
  }
  return tmpReserveList;
}
</script>

<style>
</style>
