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
      <div
        v-for="(week, index) in calendars" :key="index"
        class="flex border-l border-gray-300"
      >
        <div
          v-for="(day, index) in week" :key="index"
          class="w-28 h-36 border-r border-b border-gray-300"
        >
          {{ day.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { computed, ref } from 'vue';

interface Calender {
  date: number
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
      weekRow.push({
        date: startDate.get("date")
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
</script>

<style>
</style>
