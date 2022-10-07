import { defineStore } from 'pinia';
import { Customer } from '../models/Customer';
import axios from '../plugins/axios';
import {CustomerSearchForm} from '../models/form/CustomerSearchForm';
import {CustomerSearchCondScreenObj} from '../models/screenObj/CustomerSearchCondScreenObj';
import _ from 'lodash';

export const useCustomerStore = defineStore({
  id: "customer",
  state: () => ({
    customers: [] as Customer[],
    searchCond: new CustomerSearchCondScreenObj()
  }),
  getters: {
    getCustomers(state): Customer[] {
      return state.customers;
    },
    getSearchCond(state): CustomerSearchCondScreenObj {
      return state.searchCond;
    },
  },
  actions: {
    async fetchCustomers(): Promise<void> {
      const reqForm: CustomerSearchForm = new CustomerSearchForm();
      const { data } = await axios.get("/customers/", {
        params: reqForm
      });
      this.addCustomers(data);
    },
    async search(searchCond: CustomerSearchCondScreenObj): Promise<void> {
      const reqForm: CustomerSearchForm = new CustomerSearchForm();
      _.assign(reqForm, _.pick(searchCond, _.keys(reqForm)));
      const { data } = await axios.get("/customers/", {
        params: reqForm
      });
      this.addCustomers(data);
    },
    addCustomers(array: Customer[]): void {
      this.resetCustomers();
      array.forEach(obj => {
        const customer: Customer = new Customer();
        _.assign(customer, _.pick(obj, _.keys(customer)));
        this.customers.push(customer);
      });
    },
    resetCustomers(): void {
      this.customers.splice(0);
    },
    clearSearchCond(): void {
      Object.assign(this.searchCond, new CustomerSearchCondScreenObj())
    }
  },
})
