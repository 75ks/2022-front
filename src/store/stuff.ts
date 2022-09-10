import { defineStore } from 'pinia';
import { Stuff } from '../models/Stuff';
import axios from '../plugins/axios';
import {StuffSearchForm} from '../models/form/StuffSearchForm';
import {StuffSearchCondScreenObj} from '../models/screenObj/StuffSearchCondScreenObj';
import _ from 'lodash';

export const useStuffStore = defineStore({
  id: "stuff",
  state: () => ({
    stuffs: [] as Stuff[],
    searchCond: new StuffSearchCondScreenObj()
  }),
  getters: {
    getStuffs(state): Stuff[] {
      return state.stuffs;
    },
    getSearchCond(state): StuffSearchCondScreenObj {
      return state.searchCond;
    },
  },
  actions: {
    async fetchStuffs(): Promise<void> {
      const reqForm: StuffSearchForm = new StuffSearchForm();
      const { data } = await axios.get("/stuffs/", {
        params: reqForm
      });
      this.addStuffs(data);
    },
    async search(searchCond: StuffSearchCondScreenObj): Promise<void> {
      const reqForm: StuffSearchForm = new StuffSearchForm();
      _.assign(reqForm, _.pick(searchCond, _.keys(reqForm)));
      const { data } = await axios.get("/stuffs/", {
        params: reqForm
      });
      this.addStuffs(data);
    },
    addStuffs(array: Stuff[]): void {
      this.resetStuffs();
      array.forEach(obj => {
        const stuff: Stuff = new Stuff();
        _.assign(stuff, _.pick(obj, _.keys(stuff)));
        this.stuffs.push(stuff);
      });
    },
    resetStuffs(): void {
      this.stuffs.splice(0);
    },
    clearSearchCond(): void {
      Object.assign(this.searchCond, new StuffSearchCondScreenObj())
    }
  },
})
