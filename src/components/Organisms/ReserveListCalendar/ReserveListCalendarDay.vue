<template>
  <div class="w-full">
    <div class="w-full flex bg-white sticky top-12 z-50">
      <div class="w-16"></div>
      <div class="w-full flex border-l border-gray-300">
        <div class="w-full text-center border-r border-gray-300">
          <p>
            {{ getDayofWeek() }}
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
        <div class="w-full border-r border-gray-300">
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
  /** -1(日) */
  (e: "prevDay", value: moment.Moment): void;
  /** +1(日) */
  (e: "nextDay", value: moment.Moment): void;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const day = computed<Calender>(() => {
  return getCalenderDay();
});

/** 現在日時の曜日を取得 */
const getDayofWeek = (): string => {
  const date: moment.Moment = moment(props.currentDate);
  return props.dayOfWeek[date.day()];
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

/** カレンダー(日)を取得 */
const getCalenderDay = (): Calender => {
  const day: Calender = {
    date: props.currentDate.get("date"),
    dayReserves: getDayReserves(props.currentDate)
  }
  return day;
}
</script>

<style>
</style>
