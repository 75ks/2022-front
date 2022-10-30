<template>
  <div>
    <Loading :is-loading="isLoading"/>
    <Header :header-name="'売上集計'" />
    <div class="p-2 mt-2 bg-white">
      <div class="sticky top-0 z-30 bg-white">
        <div class="w-full h-12 py-2 flex justify-between font-bold text-2xl">
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
        <ul
          v-if="displayType == 1"
          class="w-full flex justify-center items-center"
        >
          <li
            v-for="(n, index) in 12" :key="index"
            class="w-1/12 mr-1 h-10 leading-10 text-center font-bold cursor-pointer border-gray-300 border-t border-x rounded-t-lg"
            :class="[month == n ? 'text-black bg-white' : 'text-white bg-gray-400 hover:bg-gray-500']"
            @click="chengeMonth(n)"
          >
            {{ n }}月
          </li>
        </ul>
        <div
          v-if="displayType == 2"
          class="w-full h-10"
        >
        </div>
      </div>
      <div
        v-if="displayType == 1"
        class="mt-4 w-full text-right"
      >
        <CustomButton
          class="w-1/6"
          button-name="年間売上ベースに変更"
          :button-color-number="1"
          @click="changeType(2)"
        />
      </div>
      <div
        v-if="displayType == 2"
        class="mt-4 w-full text-right"
      >
        <CustomButton
          class="w-1/6"
          button-name="月売上ベースに変更"
          :button-color-number="1"
          @click="changeType(1)"
        />
      </div>
      <div v-if="displayType == 1">
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
        <PieChart
          v-if="salesTotalPieChartsMenu.length > 0 && salesTotalPieChartsNumberOfOrders.length > 0"
          class="mt-10"
          :="pieChartProps"
        />
        <div class="pb-2 w-1/5 ml-1">
          <SelectBoxWithLabel
            v-model:select-value="numberOfDisplay"
            targetUrl="/selectOption/numberOfDisplay"
            label="表示件数"
            :sideBySideFlg="true"
            inputWidth="w-2/3"
            :emptyOptionFlg="false"
          />
        </div>
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
              v-for="(salesHistory, index) in salesHistoryListSplit[selectedPage - 1]" :key="index"
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
        <Pagination
          :data-list-split="salesHistoryListSplit"
          v-model:selected-page="selectedPage"
          v-model:left-most-page="leftMostPage"
        />
      </div>
      <LineChart
        v-if="displayType == 2 && salesTotalChartsSalesMonth.length > 0 && salesTotalChartsSalesAmount.length > 0"
        class="mt-10"
        :="lineChartProps"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Atoms/Layout/Header.vue';
import Loading from '../components/Atoms/Layout/Loading.vue';
import CustomButton from '../components/Atoms/Button/CustomButton.vue';
import SelectBoxWithLabel from '../components/Molecules/SelectBoxWithLabel.vue';
import Pagination from '../components/Atoms/Layout/Pagination.vue';
import { SalesHistory } from '../models/SalesHistory';
import { ref, computed, watch } from 'vue';
import { useSalesStore } from '../store/sales';
import { datetimeFormat } from '../utils/Format';
import moment from 'moment';
import { Chart, ChartData, registerables } from "chart.js";
import { PieChart, LineChart, usePieChart, useLineChart } from "vue-chart-3";

const salesStore = useSalesStore();

const salesTotalYears = computed(() => {
  return salesStore.getSalesTotalYears;
});
const salesTotalMonth = computed(() => {
  return salesStore.getSalesTotalMonth;
});
const salesTotalPieChartsMenu = computed(() => {
  return salesStore.getSalesTotalPieCharts.map(pieChart => pieChart.menu!);
});
const salesTotalPieChartsNumberOfOrders = computed(() => {
  return salesStore.getSalesTotalPieCharts.map(pieChart => pieChart.numberOfOrders!);
});
const salesTotalChartsSalesMonth = computed(() => {
  return salesStore.getSalesTotalCharts.map(chart => chart.salesMonth!);
});
const salesHistorys =  computed(() => {
  return salesStore.getSalesHistorys;
});
const salesTotalChartsSalesAmount = computed(() => {
  return salesStore.getSalesTotalCharts.map(chart => chart.salesAmount!);
});
const salesTotalChartsAverageAmount = computed(() => {
  let averageAmount: number[] = [];
  let sumAmount: number = 0;
  salesStore.getSalesTotalCharts.forEach(chart => {
    sumAmount += chart.salesAmount!
  });
  for (let i = 0; i < 12; i++) {
    averageAmount.push(sumAmount / currentMonth.value);
  }
  return averageAmount;
});

/** ローティングフラグ */
const isLoading = ref<boolean>(false);

/** 表示タイプ(1:データ、2:グラフ) */
const displayType = ref<number>(1);

/** 表示タイプ変更 */
const changeType = (type: number) => {
  displayType.value = type;
}

/** 現在日時を取得 */
const currentDate = ref<moment.Moment>(moment());
/** 年(YYYY: ◀︎ ▶︎によって変動) */
const year = ref<number>(Number(currentDate.value.format('YYYY')));
/** 月(M: タブによって変動) */
const month = ref<number>(Number(currentDate.value.format('M')));
/** 今年 */
const currentYear = ref<number>(Number(currentDate.value.format('YYYY')));
/** 今月 */
const currentMonth = ref<number>(Number(currentDate.value.format('M')));

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
    salesStore.fetchSalesTotalPieCharts(year.value.toString() + month.value.toString());
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
    await salesStore.fetchSalesTotalCharts(year.value.toString());
    await salesStore.fetchSalesTotalPieCharts(year.value.toString() + month.value.toString());
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

Chart.register(...registerables);
/** 円グラフ用データ */
const pieData = computed<ChartData<"pie">>(() => ({
  labels: salesTotalPieChartsMenu.value,
  datasets: [
    {
      label: "注文数",
      data: salesTotalPieChartsNumberOfOrders.value,
      backgroundColor: [
        "rgb(255, 127, 127)",
        "rgb(255, 127, 255)",
        "rgb(127, 127, 255)",
        "rgb(127, 255, 255)",
        "rgb(127, 255, 127)",
        "rgb(255, 255, 127)",
        "rgb(255, 191, 127)",
      ],
      hoverOffset: 4,
    },
  ],
}));

const { pieChartProps } = usePieChart({
  chartData: pieData
});

/** 折れ線グラフ用のデータ */
const lineData = computed<ChartData<"line">>(() => ({
  labels: salesTotalChartsSalesMonth.value,
  datasets: [
    {
      label: "売上金額",
      data: salesTotalChartsSalesAmount.value,
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
    {
      label: "今月までの1ヶ月の平均金額",
      data: salesTotalChartsAverageAmount.value,
      fill: false,
      borderColor: "rgb(192, 75, 192)",
      tension: 0.1,
    },
  ],
}));

const { lineChartProps } = useLineChart({
  chartData: lineData
});

/** 選択ページ(初期値: 1ページ) */
const selectedPage = ref<number>(1);

/** ページネーション左端ページ(初期値: 1ページ) */
const leftMostPage = ref<number>(1);

/** 表示件数(初期値: 10件) */
const numberOfDisplayContainer = ref<number>(10);
const numberOfDisplay = computed<number>({
  get: () => numberOfDisplayContainer.value,
  set: (value) => numberOfDisplayContainer.value = value
});

/** 10件ずつデータを分割 */
const salesHistoryListSplit = computed<SalesHistory[][]>(() => {
  const salesHistoryList = Object.assign([], salesHistorys.value);
  const salesHistoryListSplit: SalesHistory[][] = [];
  const loopCount = Math.ceil(salesHistoryList.length / numberOfDisplay.value);
  for (let i = 0; i < loopCount; i++) {
    salesHistoryListSplit.push(salesHistoryList.splice(0, numberOfDisplay.value));
  }
  // 1ページ目を設定
  selectedPage.value = 1;
  // 一番左に表示しているページを1ページに設定
  leftMostPage.value = 1;
  return salesHistoryListSplit;
});
</script>

<style>
</style>
