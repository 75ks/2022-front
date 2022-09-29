<template>
  <div>
    <Loading :is-loading="isLoading"/>
    <Header :header-name="'売上集計'" />
    <div class="p-2 mt-2 bg-white">
      <div class="w-full h-12 py-2 flex justify-between font-bold text-2xl bg-white sticky top-0 z-40">
        <button
          @click="prevYear()"
          class="text-black hover:text-gray-500"
        >
          ◀︎
        </button>
        <p>{{ year }}年</p>
        <button
          @click="nextYear()"
          class="text-black hover:text-gray-500"
        >
          ▶︎
        </button>
      </div>
      <ul class="w-full flex justify-center items-center">
        <li
          v-for="(n, index) in 12" :key="index"
          class="w-1/12 mr-1 h-10 leading-10 text-center font-bold cursor-pointer border-gray-300 border-t border-x rounded-t-lg"
          :class="[month == n ? 'text-black bg-white' : 'text-white bg-gray-400 hover:bg-gray-500']"
          @click="chengeMonth(n)"
        >
          {{ n }}月
        </li>
      </ul>
      <table class="p-2 mt-10 w-full">
        <thead>
          <tr>
            <th class="border border-gray-300 px-2 py-2 text-gray-600 text-xl text-center">来店人数（月 / 年）</th>
            <th class="border border-gray-300 px-2 py-2 text-gray-600 text-xl text-center">売上金額（月 / 年）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-2 py-2 text-xl text-center">{{ salesTotalMonth.numberOfVisitors }}人　/　{{ sumNumberOfVisitorsYears }}人</td>
            <td class="border border-gray-300 px-2 py-2 text-xl text-center">{{ salesTotalMonth.salesAmount }}円　/　{{ sumSalesAmountYears }}円</td>
          </tr>
        </tbody>
      </table>
      <table class="mt-10 w-full">
        <thead>
          <tr>
            <th class="border border-gray-300 px-2 py-2 text-gray-600">売上履歴ID</th>
            <th class="border border-gray-300 px-2 py-2 text-gray-600">顧客名</th>
            <th class="border border-gray-300 px-2 py-2 text-gray-600">担当スタッフ</th>
            <th class="border border-gray-300 px-2 py-2 text-gray-600">ランク</th>
            <th class="border border-gray-300 px-2 py-2 text-gray-600">メニュー</th>
            <th class="border border-gray-300 px-2 py-2 text-gray-600">料金</th>
            <th class="border border-gray-300 px-2 py-2 text-gray-600">来店日時</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(salesHistory, index) in salesHistorys" :key="index"
          >
            <td class="border border-gray-300 px-2 py-2">{{ salesHistory.salesHistoryId }}</td>
            <td class="border border-gray-300 px-2 py-2">{{ salesHistory.customerLastName }} {{salesHistory.customerFirstName}}</td>
            <td class="border border-gray-300 px-2 py-2">{{ salesHistory.stuffLastName }} {{ salesHistory.stuffFirstName }}</td>
            <td class="border border-gray-300 px-2 py-2">{{ salesHistory.rank }}</td>
            <td class="border border-gray-300 px-2 py-2">{{ salesHistory.menu }}</td>
            <td class="border border-gray-300 px-2 py-2">{{ salesHistory.price }}</td>
            <td class="border border-gray-300 px-2 py-2">{{ datetimeFormat(salesHistory.salesDatetime) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Atoms/Layout/Header.vue';
import Loading from '../components/Atoms/Layout/Loading.vue';
import { ref, computed, watch } from 'vue';
import { useSalesStore } from '../store/sales';
import { datetimeFormat } from '../utils/Format';
import moment from 'moment';

const salesStore = useSalesStore();

const salesTotalYears = computed(() => {
  return salesStore.getSalesTotalYears;
});
const salesTotalMonth = computed(() => {
  return salesStore.getSalesTotalMonth;
});
const salesHistorys =  computed(() => {
  return salesStore.getSalesHistorys;
})

/** ローティングフラグ */
const isLoading = ref<boolean>(false);

/** 現在日時を取得 */
const currentDate = ref<moment.Moment>(moment());
/** 年(YYYY) */
const year = ref<number>(Number(currentDate.value.format('YYYY')));
/** 月(M) */
const month = ref<number>(Number(currentDate.value.format('M')));

/** 来店人数合計(年) */
const sumNumberOfVisitorsYears = ref<number>(0);
/** 売上金額合計(年) */
const sumSalesAmountYears = ref<number>(0);

/** 年(YYYY) -1 */
const prevYear = () => {
  year.value -= 1;
}
/** 年(YYYY) +1 */
const nextYear = () => {
  year.value += 1;
}
/** 月(M) 変更 */
const chengeMonth = (n: number) => {
  month.value = n;
}

/** 月変更 */
watch(month, (after, before) => {
  try {
    isLoading.value = !isLoading.value;
    salesStore.fetchSalesTotalMonth(year.value.toString() + month.value.toString());
    salesStore.fetchSalesHistorys(year.value.toString() + month.value.toString());
  } catch (error) {
  } finally {
    isLoading.value = !isLoading.value;
  }
});

/** 年変更 */
watch(year, async (after, before) => {
  try {
    isLoading.value = !isLoading.value;
    sumNumberOfVisitorsYears.value = 0;
    sumSalesAmountYears.value = 0;
    await salesStore.fetchSalesTotalYears(year.value.toString());
    await salesStore.fetchSalesTotalMonth(year.value.toString() + month.value.toString());
    await salesStore.fetchSalesHistorys(year.value.toString() + month.value.toString());
    if (salesTotalYears.value.length > 0) {
      salesTotalYears.value.forEach(obj  => {
        if (obj.numberOfVisitors) {
          sumNumberOfVisitorsYears.value += obj.numberOfVisitors;
        }
        if (obj.salesAmount) {
          sumSalesAmountYears.value += obj.salesAmount;
        }
      });
    }
  } catch(error) {
  } finally {
    isLoading.value = !isLoading.value;
  }
},
{
  immediate: true
});
</script>

<style>
</style>
