// import { defineStore } from 'pinia';
// import { MenuHeader} from '../models/MenuHeader'
// import { MenuDetail } from '../models/MenuDetail';
// import axios from '../plugins/axios';
// import _ from 'lodash';

// export const useAdministratorStore = defineStore({
//   id: "reserve",
//   state: () => ({
//     reserves: [] as Reserve[]
//   }),
//   getters: {
//     getReserves(state): Reserve[] {
//       return state.reserves;
//     },
//   },
//   actions: {
//     async fetchReserves(): Promise<void> {
//       const { data } = await axios.get("/reserves/", {
//       });
//       this.addReserves(data);
//     },
//     addReserves(array: Object[]): void {
//       this.resetReserves();
//       array.forEach(obj => {
//         const reserve: MenuHeader = new MenuHeader();
//         _.assign(reserve, _.pick(obj, _.keys(reserve)));
//         this.reserves.push(reserve);
//       });
//     },
//     resetReserves(): void {
//       this.reserves.splice(0);
//     },
//   },
// })


import { defineStore } from 'pinia';
import { Reserve } from '../models/Reserve';
import axios from '../plugins/axios';
import {ReserveSearchForm} from '../models/form/ReserveSearchForm';
import _ from 'lodash';

export const useReserveStore = defineStore({
  id: "reserve",
  state: () => ({
    reserves: [] as Reserve[],
  }),
  getters: {
    getReserves(state): Reserve[] {
      return state.reserves;
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
  },
})
