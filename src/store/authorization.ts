import { defineStore } from 'pinia';
import { Authorization } from '../models/Authorization';
import { LoginForm } from '../models/form/LoginForm';
import axios from '../plugins/axios';

export const useAuthorizationStore = defineStore({
  id: "authorization",
  state: () => ({
    authorization: new Authorization() as Authorization
  }),
  getters: {
    getAuthorization(state): Authorization {
      return state.authorization;
    },
  },
  actions: {
    async fetchSignUp(reqForm: string): Promise<void> {
      const { data } = await axios.post("/authorization/signUp/", reqForm);
      this.addAuthorization(data);
    },
    async fetchLogin(reqForm: LoginForm): Promise<void> {
      const { data } = await axios.post("/authorization/login/", reqForm);
      this.addAuthorization(data);
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
