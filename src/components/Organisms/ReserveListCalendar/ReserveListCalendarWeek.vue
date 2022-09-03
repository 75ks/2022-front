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
          class="w-full border-r border-gray-300 overflow-hidden"
        >
          <div
            v-for="(n, index) in 24" :key="index"
            @click="showRegisterModal(day.datetime, n-1)"
            class="flex w-full h-12 boder-r border-b border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            <div
              v-for="(reserve, index) in timeReserves(n, day.dayReserves)" :key=index
              @click.stop="showEditModal(reserve)"
              class="h-9"
              :class="`w-1/${timeReserves(n, day.dayReserves).length}`"
            >
              <p
                class="w-full text-white border pl-1 text-xs whitespace-nowrap overflow-scroll"
                :class="reserve.salesHistoryId !== null ? 'bg-gray-400' : 'bg-red-400 hover:bg-red-500'"
              >
                {{ reserve.menu }}<br>
                {{ moment(reserve.reserveDatetime).subtract(9, 'hours').format('HH:mm[〜]') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RegisterModal
    :is-visible-modal="isVisibleRegisterModal"
    :select-date-time="selectDateTime"
    @closeModal="closeRegisterModal"
  />
  <EditModal
    :is-visible-modal="isVisibleEditModal"
    :select-reserve="selectReserve"
    @closeModal="closeEditModal"
  />
</template>

<script setup lang="ts">
import moment from 'moment';
import { Reserve } from '../../../models/Reserve';
import { Calender } from '../../../models/Calender';
import RegisterModal from './RegisterModal.vue';
import EditModal from './EditModal.vue';
import { useMessageStore } from '../../../store/message';
import { computed, ref } from 'vue';

const messageStore = useMessageStore();

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

/** 登録モーダル表示フラグ */
const isVisibleRegisterModal = ref<boolean>(false);
/** 編集モーダル表示フラグ */
const isVisibleEditModal = ref<boolean>(false);

/** 選択予約日時 */
const selectDateTime = ref<string>("");
/** 予約情報 */
const selectReserve = ref<Reserve>(new Reserve());

/** 各時間の予約情報を取得 */
const timeReserves = computed(() => (n: number, reserves: Reserve[]) => {
  return reserves.filter(reserve => {
    return n-1 === Number(moment(reserve.reserveDatetime).subtract(9, 'hours').format('HH'))
  });
});

/** 予約日時クリックイベント */
const showRegisterModal = (datetime: string, hours: number) => {
  selectDateTime.value = moment(datetime).add(hours, "hours").format("YYYY-MM-DD HH:mm");
  isVisibleRegisterModal.value = true;
}

/** 予約情報クリックイベント */
const showEditModal = (reserve: Reserve) => {
  selectReserve.value = reserve;
  isVisibleEditModal.value = true;
}

/** 登録モーダル✖︎ボタンクリックイベント */
const closeRegisterModal = () => {
  selectDateTime.value = "";
  messageStore.resetMessageList();
  messageStore.resetMessageType();
  isVisibleRegisterModal.value = false;
}

/** 編集モーダル✖︎ボタンクリックイベント */
const closeEditModal = () => {
  selectReserve.value = new Reserve();
  messageStore.resetMessageList();
  messageStore.resetMessageType();
  isVisibleEditModal.value = false;
}

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
    // 日本時間にするためマイナス9時間で設定
    const reserveDate: string = moment(reserve.reserveDatetime).subtract(9, 'hours').format('YYYY-MM-DD');
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
      datetime: startDate.format("YYYY-MM-DD HH:mm"),
      dayReserves
    });
    startDate.add(1, "days");
  }
  return week;
}
</script>

<style>
</style>
