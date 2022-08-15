<template>
  <div class="custom-height p-2 mt-2 bg-white">
    <select
      v-model="calendarSelectValue"
      class="h-10 p-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
    >
      <option value="1">日</option>
      <option value="2">週</option>
      <option value="3">月</option>
    </select>
    <div class="w-full h-12 py-2 flex justify-between font-bold text-2xl bg-white sticky top-0 z-50">
      <button
        @click="prevCalendar(currentDate)"
        class="text-black hover:text-gray-500"
      >
        ◀︎
      </button>
      <p>{{ currentDateFormat }}</p>
      <button
        @click="nextCalendar(currentDate)"
        class="text-black hover:text-gray-500"
      >
        ▶︎
      </button>
    </div>
    <div v-if="calendarSelectValue === '1'">
      <ReserveListCalendarDay
        :reserve-list="reserveList"
        :current-date="currentDate"
        :current-date-format="currentDateFormat"
        :day-of-week="dayOfWeek"
        @prev-day="prevDay"
        @next-day="nextDay"
      />
    </div>
    <div v-if="calendarSelectValue === '2'">
      <ReserveListCalendarWeek
        :reserve-list="reserveList"
        :current-date="currentDate"
        :current-date-format="currentDateFormat"
        :day-of-week="dayOfWeek"
        @prev-week="prevWeek"
        @next-week="nextWeek"
      />
    </div>
    <div class="custom-height-2" v-if="calendarSelectValue === '3'">
      <ReserveListCalendarMonth
        :reserve-list="reserveList"
        :current-date="currentDate"
        :current-date-format="currentDateFormat"
        :day-of-week="dayOfWeek"
        @prev-month="prevMonth"
        @next-month="nextMonth"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { Reserve } from '../../../models/Reserve';
import ReserveListCalendarDay from './ReserveListCalendarDay.vue';
import ReserveListCalendarMonth from './ReserveListCalendarMonth.vue';
import ReserveListCalendarWeek from './ReserveListCalendarWeek.vue'
import { ref, computed } from 'vue';

interface Props {
  /** 予約情報一覧 */
  reserveList: Reserve[]
}

const props = defineProps<Props>();

/** 初期画面をカレンダー(月)に設定 */
const calendarSelectValue = ref<string>("3");

/** 現在日時を取得 */
const currentDate = ref<moment.Moment>(moment());

/** 現在日時をフォーマット */
const currentDateFormat = computed<string>(() => {
  return currentDate.value.format('YYYY[年]MM[月]');
});

/** 曜日 */
const dayOfWeek: string[] = ["日", "月", "火", "水", "木", "金", "土"];

/** ◀ボタンクリックイベント */
const prevCalendar = (value: moment.Moment): void => {
  switch (calendarSelectValue.value) {
    case "1":
      prevDay(value);
      break;
    case "2":
      prevWeek(value);
      break;
    case "3":
      prevMonth(value);
      break;
  }
}

/** ▶︎ボタンクリックイベント */
const nextCalendar = (value: moment.Moment): void => {
  switch (calendarSelectValue.value) {
    case "1":
      nextDay(value);
      break;
    case "2":
      nextWeek(value);
      break;
    case "3":
      nextMonth(value);
      break;
  }
}

/** -1(日) */
const prevDay = (value: moment.Moment): void => {
  currentDate.value = moment(value).subtract(1, "day");
}

/** +1(日) */
const nextDay = (value: moment.Moment): void => {
  currentDate.value = moment(value).add(1, "day");
}

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
    height: calc(100% - 48px - 1px);
  }
  .custom-height-2 {
    /** カレンダー高さ微調整(カレンダー表示形式プルダウン:38px - 現在日時:48px - border:1px) */
    height: calc(100% - 38px - 48px - 1px);
  }
</style>
