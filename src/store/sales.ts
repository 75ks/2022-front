import { defineStore } from 'pinia';
import axios from '../plugins/axios';
import _ from 'lodash';
import { SalesTotalYear } from '../models/SalesTotalYear';
import { SalesTotalMonth } from '../models/SalesTotalMonth';
import { SalesTotalYearsForm } from '../models/form/SalesTotalYearsForm';
import { SalesTotalMonthForm } from '../models/form/SalesTotalMonthForm';
import { SalesHistory } from '../models/SalesHistory';
import { SalesHistoryForm } from '../models/form/SalesHistoryForm';
import { SalesTotalChart } from '../models/SalesTotalChart';
import { SalesTotalChartsForm } from '../models/form/SalesTotalChartsForm';
import { SalesTotalPieChart } from '../models/SalesTotalPieChart';
import { SalesTotalPieChartsForm } from '../models/form/SalesTotalPieChartsForm';

export const useSalesStore = defineStore({
  id: "sales",
  state: () => ({
    salesTotalYears: [] as SalesTotalYear[],
    salesTotalMonth: new SalesTotalMonth() as SalesTotalMonth,
    salesTotalCharts: [] as SalesTotalChart[],
    salesTotalPieCharts: [] as SalesTotalPieChart[],
    salesHistorys: [] as SalesHistory[]
  }),
  getters: {
    getSalesTotalYears(state): SalesTotalYear[] {
      return state.salesTotalYears;
    },
    getSalesTotalMonth(state): SalesTotalMonth {
      return state.salesTotalMonth;
    },
    getSalesTotalCharts(state): SalesTotalChart[] {
      return state.salesTotalCharts;
    },
    getSalesTotalPieCharts(state): SalesTotalPieChart[] {
      return state.salesTotalPieCharts;
    },
    getSalesHistorys(state): SalesHistory[] {
      return state.salesHistorys;
    },
  },
  actions: {
    async fetchSalesTotalYears(salesYear: string): Promise<void> {
      const reqForm: SalesTotalYearsForm = new SalesTotalYearsForm();
      reqForm.salesYear = salesYear;
      const { data } = await axios.get("/salesTotal/year", {
        params: reqForm
      });
      this.addSalesTotalYears(data);
    },
    async fetchSalesTotalMonth(salesYearMonth: string): Promise<void> {
      const reqForm: SalesTotalMonthForm = new SalesTotalMonthForm();
      reqForm.salesYearMonth = salesYearMonth;
      const { data } = await axios.get("/salesTotal/month", {
        params: reqForm
      });
      this.addSalesTotalMonth(data);
    },
    async fetchSalesTotalCharts(salesYear: string): Promise<void> {
      const reqForm: SalesTotalChartsForm = new SalesTotalChartsForm();
      reqForm.salesYear = salesYear;
      const { data } = await axios.get("/salesTotal/charts", {
        params: reqForm
      });
      this.addSalesTotalCharts(data);
    },
    async fetchSalesTotalPieCharts(salesYearMonth: string): Promise<void> {
      const reqForm: SalesTotalPieChartsForm = new SalesTotalPieChartsForm();
      reqForm.salesYearMonth = salesYearMonth;
      const { data } = await axios.get("/salesTotal/pieCharts", {
        params: reqForm
      });
      this.addSalesTotalPieCharts(data);
    },
    async fetchSalesHistorys(salesYearMonth: string): Promise<void> {
      const reqForm: SalesHistoryForm = new SalesHistoryForm();
      reqForm.salesYearMonth = salesYearMonth;
      const { data } = await axios.get("/salesTotal/", {
        params: reqForm
      });
      this.addSalesHistory(data);
    },
    addSalesTotalYears(array: Object[]): void {
      this.resetSalesTotalYears();
      array.forEach(obj => {
        const salesTotalYear: SalesTotalYear = new SalesTotalYear();
        _.assign(salesTotalYear, _.pick(obj, _.keys(salesTotalYear)));
        this.salesTotalYears.push(salesTotalYear);
      });
    },
    addSalesTotalMonth(obj: Object): void {
      this.resetSalesTotalMonth();
      _.assign(this.salesTotalMonth, _.pick(obj, _.keys(this.salesTotalMonth)));
    },
    addSalesTotalCharts(array: Object[]): void {
      this.resetSalesTotalCharts();
      array.forEach(obj => {
        const salesTotalChart: SalesTotalChart = new SalesTotalChart();
        _.assign(salesTotalChart, _.pick(obj, _.keys(salesTotalChart)));
        this.salesTotalCharts.push(salesTotalChart);
      });
    },
    addSalesTotalPieCharts(array: Object[]): void {
      this.resetSalesTotalPieCharts();
      array.forEach(obj => {
        const salesTotalPieChart: SalesTotalPieChart = new SalesTotalPieChart();
        _.assign(salesTotalPieChart, _.pick(obj, _.keys(salesTotalPieChart)));
        this.salesTotalPieCharts.push(salesTotalPieChart);
      });
    },
    addSalesHistory(array: Object[]): void {
      this.resetSalesHistory();
      array.forEach(obj => {
        const salesHistory: SalesHistory = new SalesHistory();
        _.assign(salesHistory, _.pick(obj, _.keys(salesHistory)));
        this.salesHistorys.push(salesHistory);
      });
    },
    resetSalesTotalYears(): void {
      this.salesTotalYears.splice(0);
    },
    resetSalesTotalMonth(): void {
      Object.assign(this.salesTotalMonth, new SalesTotalMonth())
    },
    resetSalesTotalCharts(): void {
      this.salesTotalCharts.splice(0);
    },
    resetSalesTotalPieCharts(): void {
      this.salesTotalPieCharts.splice(0);
    },
    resetSalesHistory(): void {
      this.salesHistorys.splice(0);
    },
  },
})
