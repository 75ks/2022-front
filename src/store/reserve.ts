import { defineStore } from 'pinia';
import { Reserve } from '../models/Reserve';
import axios from '../plugins/axios';
import {ReserveSearchForm} from '../models/form/ReserveSearchForm';
import {ReserveSearchCondScreenObj} from '../models/screenObj/ReserveSearchCondScreenObj';
import _ from 'lodash';

export const useReserveStore = defineStore({
  id: "reserve",
  state: () => ({
    reserves: [] as Reserve[],
    searchCond: new ReserveSearchCondScreenObj()
  }),
  getters: {
    getReserves(state): Reserve[] {
      return state.reserves;
    },
    getSearchCond(state): ReserveSearchCondScreenObj {
      return state.searchCond;
    },
  },
  actions: {
    async fetchReserves(): Promise<void> {
      const reqForm: ReserveSearchForm = new ReserveSearchForm();
      const { data } = await axios.get("/reserves/", {
        params: reqForm
      });
      this.addReserves(data);
    },
    async search(searchCond: ReserveSearchCondScreenObj): Promise<void> {
      const reqForm: ReserveSearchForm = new ReserveSearchForm();
      _.assign(reqForm, _.pick(searchCond, _.keys(reqForm)));
      const { data } = await axios.get("/reserves/", {
        params: reqForm
      });
      this.addReserves(data);
    },
    addReserves(array: Reserve[]): void {
      this.resetReserves();
      array.forEach(obj => {
        this.reserves.push(obj);
      });
    },
    resetReserves(): void {
      this.reserves.splice(0);
    },
    clearSearchCond(): void {
      Object.assign(this.searchCond, new ReserveSearchCondScreenObj())
    }
  },
})
