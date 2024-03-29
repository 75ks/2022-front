import { defineStore } from 'pinia';
import { Reserve } from '../models/Reserve';
import axios from '../plugins/axios';
import { ReserveSearchForm } from '../models/form/ReserveSearchForm';
import { ReserveSearchCondScreenObj } from '../models/screenObj/ReserveSearchCondScreenObj';
import _ from 'lodash';
import { RegisterModalScreenObj } from '../models/screenObj/RegisterModalScreenObj';
import { EditModalScreenObj } from '../models/screenObj/EditModalScreenObj';
import { RegisterReserveForm } from '../models/form/RegisterReserveForm';
import { EditReserveForm } from '../models/form/EditReserveForm';
import { ReserveRegisterForm } from '../models/form/ReserveRegisterForm';
import { ReserveRegisterScreenObj } from '../models/screenObj/ReserveRegisterScreenObj';

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
    async register(screenObj: RegisterModalScreenObj): Promise<void> {
      const reqForm: RegisterReserveForm = new RegisterReserveForm();
      _.assign(reqForm, _.pick(screenObj, _.keys(reqForm)));
      await axios.post("/reserves/register", reqForm);
    },
    async registerByCustomer(searchCond: ReserveRegisterScreenObj): Promise<void> {
      const reqForm: ReserveRegisterForm = new ReserveRegisterForm();
      _.assign(reqForm, _.pick(searchCond, _.keys(reqForm)));
      await axios.post("/reserveRegister/", reqForm);
    },
    async update(screenObj: EditModalScreenObj): Promise<void> {
      const reqForm: EditReserveForm = new EditReserveForm();
      _.assign(reqForm, _.pick(screenObj, _.keys(reqForm)));
      await axios.put("/reserves/update", reqForm);
    },
    async delete(screenObj: EditModalScreenObj): Promise<void> {
      const reqForm: EditReserveForm = new EditReserveForm();
      _.assign(reqForm, _.pick(screenObj, _.keys(reqForm)));
      await axios.put("/reserves/delete", reqForm);
    },
    addReserves(array: Object[]): void {
      this.resetReserves();
      array.forEach(obj => {
        const reserve: Reserve = new Reserve();
        _.assign(reserve, _.pick(obj, _.keys(reserve)));
        this.reserves.push(reserve);
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
