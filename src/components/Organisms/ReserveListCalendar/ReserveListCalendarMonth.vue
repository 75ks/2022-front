<template>
  <div class="w-full py-2 flex justify-between font-bold text-2xl">
    <button
      @click="$emit('prevMonth', currentDate)"
      class="text-black hover:text-gray-500"
    >
      ◀︎
    </button>
    <p>{{ currentDateFormat }}</p>
    <button
      @click="$emit('nextMonth', currentDate)"
      class="text-black hover:text-gray-500"
    >
      ▶︎
    </button>
  </div>
  <div class="flex border-l border-t  border-gray-300">
    <div
      v-for="n in 7" :key="n"
      class="w-full text-center border-r border-b border-gray-300"
    >
      {{ dateWeek[n-1] }}
    </div>
  </div>
  <div class="w-full pb-4 custom-height border-gray-300">
    <div
      v-for="(week, index) in calendars" :key="index"
      class="flex border-l border-gray-300"
      :class="[`h-1/${calendars.length}`]"
    >
      <!-- 上記のようにv-bindでclassを指定する場合、キャッシュがないとCSSが反映されないため下記を追加 -->
      <span class="h-1/4 h-1/5 h-1/6"></span>
      <div
        v-for="(day, index) in week" :key="index"
        class="w-full border-r border-b border-gray-300"
      >
        <p class="ml-1">
          {{ day.date }}
        </p>
        <p class="text-white pl-1" :class="day.dayReserves.length > 0 ? 'bg-red-500' : 'bg-gray-500'">
          {{ day.dayReserves.length }}件
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { Reserve } from '../../../models/Reserve';
import { Calender } from '../../../models/Calender';
import { computed } from 'vue';

interface Props {
  /** 予約情報一覧 */
  reserveList: Reserve[],
  /** 現在日時 */
  currentDate: moment.Moment,
  /** 現在日時フォーマット(YYYY年MM月) */
  currentDateFormat: string,
  /** 曜日 */
  dateWeek: string[]
}

interface Emits {
  /** -1(月) */
  (e: "prevMonth", value: moment.Moment): void;
  /** +1(月) */
  (e: "nextMonth", value: moment.Moment): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const calendars = computed<Calender[][]>(() => {
  return getCalenderMonth();
});

/** カレンダーの最初の日付を取得 */
const getStartDate = (): moment.Moment => {
  const date: moment.Moment = moment(props.currentDate);
  date.startOf("month");
  const youbiNum: number = date.day();
  return date.subtract(youbiNum, "days");
}

/** カレンダーの最後の日付を取得 */
const getEndDate = (): moment.Moment => {
  const date: moment.Moment = moment(props.currentDate);
  date.endOf("month");
  const youbiNum: number = date.day();
  return date.add(6 - youbiNum, "days");
}

/** 予約情報取得 */
const getDayReserves = (date: moment.Moment): Reserve[] => {
  const dayReserves: Reserve[] = [];
  props.reserveList.forEach(reserve => {
    const reserveDate: string = moment(reserve.reserveDatetime).format('YYYY-MM-DD');
    const targetDate: string = date.format('YYYY-MM-DD');
    if (reserveDate === targetDate) {
      dayReserves.push(reserve);
    }
  });
  return dayReserves;
}

/** カレンダー(月)を取得 */
const getCalenderMonth = (): Calender[][] => {
  const startDate: moment.Moment = getStartDate();
  const endDate: moment.Moment = getEndDate();
  // カレンダーに表示する週数を取得
  const weekNumber: number = Math.ceil(endDate.diff(startDate, "days") / 7);
  const calendars: Calender[][] = [];
  for (let week = 0; week < weekNumber; week++) {
    const weekRow: Calender[] = [];
    for (let day = 0; day < 7; day++) {
      const dayReserves: Reserve[] = getDayReserves(startDate);
      weekRow.push({
        date: startDate.get("date"),
        dayReserves
      });
      startDate.add(1, "days");
    }
    calendars.push(weekRow);
  }
  return calendars;
}
</script>

<style>
  .custom-height {
    /** カレンダー高さ微調整(ヘッダー:48px - border:1px) */
    height: calc(100% - 47px);
  }
</style>
