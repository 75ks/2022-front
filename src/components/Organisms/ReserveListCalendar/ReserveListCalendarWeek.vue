<template>
  <div class="w-full py-2 flex justify-between font-bold text-2xl bg-white sticky top-0 z-50">
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
  <div class="w-full">
    <div class="w-full flex bg-white sticky top-12 z-50">
      <div class="w-16"></div>
      <div class="w-full flex border-l border-gray-300">
        <div
          v-for="(day, index) in week" :key="index"
          class="w-full text-center border-r border-gray-300"
        >
        <p>
          {{ youbi(index) }}
        </p>
        <p class="border-b border-gray-300">
          {{ day.date }}
        </p>
        </div>
      </div>
    </div>
    <div class="w-full flex">
      <div class="w-16">
        <div
          class="h-12 leading-none text-center"
          v-for="(n, index) in 12" :key="index"
        >
          <span class="relative top-10 text-xs text-gray-400">
            {{ n === 12 ? "午後" + n + "時" : "午前" +  n + "時" }}
          </span>
        </div>
        <div
          class="h-12 leading-none text-center"
          v-for="(n, index) in 11" :key="index"
        >
          <span class="relative top-10 text-xs text-gray-400">
            {{ "午後" +  n + "時" }}
          </span>
        </div>
      </div>
      <div class="w-full flex border-l border-gray-300">
        <div
          v-for="(day, index) in week" :key="index"
          class="w-full border-r border-gray-300"
        >
          <div
            v-for="(n, index) in 24" :key="index"
            class="w-full h-12 boder-r border-b border-gray-300"
          >
            <div v-if="day.dayReserves.length > 0">
              <div v-for="(reserve, index) in day.dayReserves" :key=index>
                <div v-if="n-1 === Number(moment(reserve.reserveDatetime).format('HH'))">
                  <p class="w-full text-white pl-1 text-xs bg-red-500">{{ reserve.menu }}</p>
                  <p class="w-full text-white pl-1 text-xs bg-red-500">{{ moment(reserve.reserveDatetime).format('HH:mm[〜]') }}</p>
                </div>
              </div>
            </div>
          </div>
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

const week = computed<Calender[]>(() => {
  return getWeek();
});

/** 現在日時を取得 */
const currentDate = ref<moment.Moment>(moment());
const currentDateFormat = computed(() => {
  return currentDate.value.format('YYYY[年]MM[月]');
});

/** 週の最初の日付を取得 */
const getStartDate = (): moment.Moment => {
  let date: moment.Moment = moment(currentDate.value);
  return date.startOf("week");
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

/** 週の日付を取得 */
const getWeek = (): Calender[] => {
  let startDate: moment.Moment = getStartDate();
  let week: Calender[] = [];
  for (let day = 0; day < 7; day++) {
    let dayReserves: Reserve[] = getDayReserves(startDate);
    week.push({
      date: startDate.get("date"),
      dayReserves
    });
    startDate.add(1, "days");
  }
  return week;
}

/** -1(週) */
const prevMonth = (): void => {
  currentDate.value = moment(currentDate.value).subtract(1, "week");
}

/** +1(週) */
const nextMonth = (): void => {
  currentDate.value = moment(currentDate.value).add(1, "week");
}

/** 曜日取得 */
const youbi = (index: number): string => {
  const week = ["日", "月", "火", "水", "木", "金", "土"];
  return week[index];
}
</script>

<style>
</style>
