import { defineStore } from 'pinia';
import { CustomerCreateData } from '../models/types/CustomerCreate';
import axios from '../plugins/axios';

export const useCustomerCreateStore = defineStore({
  id: "customerCreate",
  state: () => ({
    customerCreates: [] as CustomerCreateData[]
  }),
  getters: {
    getCustomerCreates(state): CustomerCreateData[] {
      return state.customerCreates;
    },
  },
  actions: {
    async fetchCustomerCreates(): Promise<void> {
      this.resetCustomerCreates();
      const { data } = await axios.get("/customerCreates/");
      this.addCustomerCreates(data);
    },
    addCustomerCreates(array: CustomerCreateData[]): void {
      this.resetCustomerCreates();
      array.forEach(obj => {
        this.customerCreates.push(obj);
      });
    },
    resetCustomerCreates(): void {
      this.customerCreates.splice(0);
    }
  },
})