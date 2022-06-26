import { defineStore } from 'pinia';
import { Reserve } from '../models/Reserve';
import axios from '../plugins/axios';

export const useReserveStore = defineStore({
  id: "reserve",
  state: () => ({
    reserves: [] as Reserve[]
  }),
  getters: {
    getReserves(state): Reserve[] {
      return state.reserves;
    },
  },
  actions: {
    async fetchReserves(): Promise<void> {
      const { data } = await axios.get("/reserves/");
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
    }
  },
})
