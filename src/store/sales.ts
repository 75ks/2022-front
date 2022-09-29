import { defineStore } from 'pinia';
import axios from '../plugins/axios';
import _ from 'lodash';
import { SalesTotalYear } from '../models/SalesTotalYear';
import { SalesTotalMonth } from '../models/SalesTotalMonth';
import { SalesTotalYearsForm } from '../models/form/SalesTotalYearsForm';
import { SalesTotalMonthForm } from '../models/form/SalesTotalMonthForm';
import { SalesHistory } from '../models/SalesHistory';
import { SalesHistoryForm } from '../models/form/SalesHistoryForm';

export const useSalesStore = defineStore({
  id: "sales",
  state: () => ({
    salesTotalYears: [] as SalesTotalYear[],
    salesTotalMonth: new SalesTotalMonth() as SalesTotalMonth,
    salesHistorys: [] as SalesHistory[]
  }),
  getters: {
    getSalesTotalYears(state): SalesTotalYear[] {
      return state.salesTotalYears;
    },
    getSalesTotalMonth(state): SalesTotalMonth {
      return state.salesTotalMonth;
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
    resetSalesHistory(): void {
      this.salesHistorys.splice(0);
    },
  },
})
