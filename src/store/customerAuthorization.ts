import _ from 'lodash';
import { defineStore } from 'pinia';
import { Authorization } from '../models/Authorization';
import { LoginForm } from '../models/form/LoginForm';
import { RegisterPasswordForm } from '../models/form/RegisterPasswordForm';
import { PasswordSettingScreenObj } from '../models/screenObj/PasswordSettingScreenObj';
import axios from '../plugins/axios';

export const useCustomerAuthorizationStore = defineStore({
  id: "customerAuthorization",
  state: () => ({
    authorization: new Authorization() as Authorization
  }),
  getters: {
    getAuthorization(state): Authorization {
      return state.authorization;

      
    },
  },
  actions: {
    async fetchLogin(reqForm: LoginForm): Promise<void> {
      const { data } = await axios.post("/customerAuthorization/login/", reqForm);
      this.addAuthorization(data);
    },
    async fetchLogout(): Promise<void> {
      await axios.get("/customerAuthorization/logout/");
    },
    async registerPassword(screenObj: PasswordSettingScreenObj): Promise<void> {
      const reqForm: RegisterPasswordForm = new RegisterPasswordForm();
      _.assign(reqForm, _.pick(screenObj, _.keys(reqForm)));
      await axios.post("/customerAuthorization/registerPassword/", reqForm);
    },
    addAuthorization(obj: Authorization): void {
      Object.assign(this.authorization, obj);
    },
    resetAuthorization(): void {
      Object.assign(this.authorization, new Authorization);
    }
  },
  persist: {
    enabled: true
  }
})
