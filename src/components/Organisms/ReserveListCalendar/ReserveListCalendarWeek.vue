<template>
  <div class="w-full">
    <div class="w-full flex bg-white sticky top-12 z-50">
      <div class="w-16"></div>
      <div class="w-full flex border-l border-gray-300">
        <div
          v-for="(day, index) in week" :key="index"
          class="w-full text-center border-r border-gray-300"
        >
          <p>
            {{ dayOfWeek[index] }}
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

interface Emits {
  /** -1(週) */
  (e: "prevWeek", value: moment.Moment): void;
  /** +1(週) */
  (e: "nextWeek", value: moment.Moment): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const week = computed<Calender[]>(() => {
  return getCalenderWeek();
});

/** 週の最初の日付を取得 */
const getStartDate = (): moment.Moment => {
  const date: moment.Moment = moment(props.currentDate);
  return date.startOf("week");
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

/** カレンダー(週)を取得 */
const getCalenderWeek = (): Calender[] => {
  const startDate: moment.Moment = getStartDate();
  const week: Calender[] = [];
  for (let day = 0; day < 7; day++) {
    const dayReserves: Reserve[] = getDayReserves(startDate);
    week.push({
      date: startDate.get("date"),
      dayReserves
    });
    startDate.add(1, "days");
  }
  return week;
}
</script>

<style>
</style>
