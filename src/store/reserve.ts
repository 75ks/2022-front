import { defineStore } from 'pinia';
import { ReserveData } from '../models/types/Reserve';
import axios from '../plugins/axios';

export const useReserveStore = defineStore({
  id: "reserve",
  state: () => ({
    reserves: [] as ReserveData[]
  }),
  getters: {
    getReserves(state): ReserveData[] {
      return state.reserves;
    },
  },
  actions: {
    async fetchReserves(): Promise<void> {
      this.resetReserves();
      const { data } = await axios.get("/reserves/");
      this.addReserves(data);
    },
    addReserves(array: ReserveData[]): void {
      this.resetReserves();
      array.forEach(obj => {
        this.reserves.push(obj);
      });
    },
    resetReserves(): void {
      this.reserves.splice(0);
    }
  },
})