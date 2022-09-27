import { defineStore } from 'pinia';

import { CustomerCreateRequest } from '../models/form/CustomerCreateRequest';
import axios from '../plugins/axios';
//import { ReserveSearchForm } from '../models/form/ReserveSearchForm';
//import { ReserveSearchCondScreenObj } from '../models/screenObj/ReserveSearchCondScreenObj';
import _ from 'lodash';
import { RegisterModalScreenObj } from '../models/screenObj/RegisterModalScreenObj';
import { EditModalScreenObj } from '../models/screenObj/EditModalScreenObj';
import { RegisterReserveForm } from '../models/form/RegisterReserveForm';
import { EditReserveForm } from '../models/form/EditReserveForm';


export const useCustomerStore = defineStore({
  id: "customer",
  state: () => ({

    customers: [] as CustomerCreateRequest[],
    //searchCond: new ReserveSearchCondScreenObj()
  }),
  getters: {
    getCustomers(state): CustomerCreateRequest[] {
      return state.customers;
    },
    //getSearchCond(state): ReserveSearchCondScreenObj {
      //return state.searchCond;
    //},
  },
  actions: {
    async fetchCustomers(): Promise<void> {
      const reqForm: CustomerCreateRequest = new CustomerCreateRequest();

      const { data } = await axios.get("/customers/", {
        params: reqForm
      });
      this.addCustomers(data);
    },

    // async search(searchCond: ReserveSearchCondScreenObj): Promise<void> {
    //   const reqForm: ReserveSearchForm = new ReserveSearchForm();
    //   _.assign(reqForm, _.pick(searchCond, _.keys(reqForm)));
    //   const { data } = await axios.get("/reserves/", {
    //     params: reqForm
    //   });
    //   this.addReserves(data);
    //},
    async register(screenObj: RegisterModalScreenObj): Promise<void> {
      const reqForm: CustomerCreateRequest = new CustomerCreateRequest();
      _.assign(reqForm, _.pick(screenObj, _.keys(reqForm)));
      await axios.post("/customers/register", reqForm);
    },
    async update(screenObj: EditModalScreenObj): Promise<void> {
      const reqForm: CustomerCreateRequest = new CustomerCreateRequest();
      _.assign(reqForm, _.pick(screenObj, _.keys(reqForm)));
      await axios.put("/customers/update", reqForm);
    },
    async delete(screenObj: EditModalScreenObj): Promise<void> {
      const reqForm: CustomerCreateRequest = new CustomerCreateRequest();
      _.assign(reqForm, _.pick(screenObj, _.keys(reqForm)));
      await axios.put("/customers/delete", reqForm);
    },
    addCustomers(array: Object[]): void {
      this.resetCustomers();
      array.forEach(obj => {
        const customer: CustomerCreateRequest = new CustomerCreateRequest();

        _.assign(customer, _.pick(obj, _.keys(customer)));
        this.customers.push(customer);
      });
    },
    resetCustomers(): void {
      this.customers.splice(0);
    },

    // clearSearchCond(): void {
    //   Object.assign(this.searchCond, new ReserveSearchCondScreenObj())
    // }
  },
})

