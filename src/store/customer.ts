import axios from "../plugins/axios";
import _ from "lodash";
import { defineStore } from "pinia";
import { Customer } from "../models/Customer";
import { ReserveRegisterForm } from "../models/form/ReserveRegisterForm";
import { ReserveRegisterScreenObj } from "../models/screenObj/ReserveRegisterScreenObj";

export const useCustomerStore = defineStore({
  id: "customer",
  state: () => ({
    customer: new Customer() as Customer,
  }),
  getters: {
    getCustomer(state): Customer {
      return state.customer;
    },
  },
  actions: {
    async reserveRegister(screenObj: ReserveRegisterScreenObj): Promise<void> {
      const reqForm: ReserveRegisterForm = new ReserveRegisterForm();
      _.assign(reqForm, _.pick(screenObj, _.keys(reqForm)));
      await axios.post("/reserveRegister/", reqForm);
    },
    addCustomer(obj: Customer): void {
      Object.assign(this.customer, obj);
    },
    resetCustomer(): void {
      Object.assign(this.customer, new Customer);
    },
  },
});
