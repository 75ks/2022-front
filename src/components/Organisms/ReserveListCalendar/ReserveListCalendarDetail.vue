<template>
  <div class="custom-height p-2 mt-2 bg-white">
    <select
      v-model="calendarSelectValue"
      class="px-2 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
    >
      <option value="1">週</option>
      <option value="2">月</option>
    </select>
    <div v-if="calendarSelectValue === '1'">
      <ReserveListCalendarWeek
        :reserve-list="reserveList"
        :current-date="currentDate"
        @prev-week="prevWeek"
        @next-week="nextWeek"
      />
    </div>
    <div class="custom-height" v-if="calendarSelectValue === '2'">
      <ReserveListCalendarMonth
        :reserve-list="reserveList"
        :current-date="currentDate"
        @prev-month="prevMonth"
        @next-month="nextMonth"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { Reserve } from '../../../models/Reserve';
import ReserveListCalendarMonth from './ReserveListCalendarMonth.vue';
import ReserveListCalendarWeek from './ReserveListCalendarWeek.vue'
import { ref } from 'vue';

interface Props {
  /** 予約情報一覧 */
  reserveList: Reserve[]
}

const props = defineProps<Props>();

/** 初期画面をカレンダー(月)に設定 */
const calendarSelectValue = ref<string>("2");

/** 現在日時を取得 */
const currentDate = ref<moment.Moment>(moment());

/** -1(週) */
const prevWeek = (value: moment.Moment): void => {
  currentDate.value = moment(value).subtract(1, "week");
}

/** +1(週) */
const nextWeek = (value: moment.Moment): void => {
  currentDate.value = moment(value).add(1, "week");
}

/** -1(月) */
const prevMonth = (value: moment.Moment): void => {
  currentDate.value = moment(value).subtract(1, "month");
}

/** +1(月) */
const nextMonth = (value: moment.Moment): void => {
  currentDate.value = moment(value).add(1, "month");
}
</script>

<style>
  .custom-height {
    /** カレンダー高さ微調整(ヘッダー:48px - border:1px) */
    height: calc(100% - 47px);
  }
</style>
