<template>
  <div class="p-2 mt-2 bg-white">
    <div class="w-2/3 m-auto flex justify-between font-bold text-2xl">
      <button
        @click="prevMonth"
        class="text-black hover:text-gray-500"
      >
        ◀︎
      </button>
      <p>{{ currentDateFormat }}</p>
      <button
        @click="nextMonth"
        class="text-black hover:text-gray-500"
      >
        ▶︎
      </button>
    </div>
    <div class="w-2/3 my-2 m-auto border-t border-gray-300">
      <div class="flex border-l border-gray-300">
        <div
          v-for="n in 7" :key="n"
          class="w-28 text-center border-r border-b border-gray-300"
        >
          {{ youbi(n-1) }}
        </div>
      </div>
      <div
        v-for="(week, index) in calendars" :key="index"
        class="flex border-l border-gray-300"
      >
        <div
          v-for="(day, index) in week" :key="index"
          class="w-28 h-36 border-r border-b border-gray-300"
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
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { Reserve } from '../../../models/Reserve';
import { computed, ref } from 'vue';

const props = defineProps<{
  reserveList: Reserve[]
}>();

interface Calender {
  date: number,
  dayReserves: Reserve[]
}

const calendars = computed<Calender[][]>(() => {
  return getCalender();
});

/** 現在日時を取得 */
const currentDate = ref<moment.Moment>(moment());
const currentDateFormat = computed(() => {
  return currentDate.value.format('YYYY[年]MM[月]');
});

/** カレンダーの最初の日付を取得 */
const getStartDate = (): moment.Moment => {
  let date: moment.Moment = moment(currentDate.value);
  date.startOf("month");
  const youbiNum: number = date.day();
  return date.subtract(youbiNum, "days");
}

/** カレンダーの最後の日付を取得 */
const getEndDate = (): moment.Moment => {
  let date: moment.Moment = moment(currentDate.value);
  date.endOf("month");
  const youbiNum: number = date.day();
  return date.add(6 - youbiNum, "days");
}

/** 予約情報取得 */
const getDayReserves = (date: moment.Moment): Reserve[] => {
  let dayReserves: Reserve[] = [];
  props.reserveList.forEach(reserve => {
    let reserveDate: string = moment(reserve.reserveDatetime).format('YYYY-MM-DD');
    let targetDate: string = date.format('YYYY-MM-DD');
    if (reserveDate === targetDate) {
      dayReserves.push(reserve);
    }
  });
  return dayReserves;
}

/** カレンダーの日付を取得 */
const getCalender = (): Calender[][] => {
  let startDate: moment.Moment = getStartDate();
  let endDate: moment.Moment = getEndDate();
  // カレンダーに表示する週数を取得
  const weekNumber: number = Math.ceil(endDate.diff(startDate, "days") / 7);
  let calendars: Calender[][] = [];
  for (let week = 0; week < weekNumber; week++) {
    let weekRow: Calender[] = [];
    for (let day = 0; day < 7; day++) {
      let dayReserves: Reserve[] = getDayReserves(startDate);
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

/** -1(月) */
const prevMonth = (): void => {
  currentDate.value = moment(currentDate.value).subtract(1, "month");
}

/** +1(月) */
const nextMonth = (): void => {
  currentDate.value = moment(currentDate.value).add(1, "month");
}

/** 曜日取得 */
const youbi = (index: number): string => {
  const week = ["日", "月", "火", "水", "木", "金", "土"];
  return week[index];
}
</script>

<style>
</style>
