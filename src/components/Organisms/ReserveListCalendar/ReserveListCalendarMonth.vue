<template>
  <div class="h-7 flex border-l border-t  border-gray-300">
    <div
      v-for="n in 7" :key="n"
      class="w-full text-center border-r border-b border-gray-300"
    >
      {{ dayOfWeek[n-1] }}
    </div>
  </div>
  <div class="w-full custom-height-2 border-gray-300">
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
  dayOfWeek: string[]
}

const props = defineProps<Props>();

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
        datetime: startDate.format("YYYY-MM-DD HH:mm"),
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
  .custom-height-2 {
    /** カレンダー硬さ微調整(画面余白:16px - ヘッダー:40px - ヘッダー下余白:8px - 画面余白:16px - カレンダー表示形式プルダウン:38px - 現在日時:48px - 曜日:28px - border:2px) */
    height: calc(100vh - 16px - 40px - 8px - 16px - 38px - 48px - 28px - 2px);
  }
</style>
