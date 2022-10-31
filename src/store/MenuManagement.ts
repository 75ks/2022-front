import { defineStore } from "pinia";
import { MenuManagement } from "../models/MenuManagement";
import axios from "../plugins/axios";
import _ from "lodash";
import { MenuManagementObj } from "../models/screenObj/MenuManagementObj";

export const useMenuManagementStore = defineStore({
  id: "menuManagement",
  state: () => ({
    menuManagement: [] as MenuManagement[],
  }),
  getters: {
    getMenuManagement(state): MenuManagement[] {
      return state.menuManagement;
    },
  },
  actions: {
    async fetchMenuManagement(): Promise<void> {
      // 一覧を初期化する
      this.menuManagement.splice(0);
      const { data } = await axios.get("/menuManagement/initialize", {});
      this.addMenuManagement(data);
    },
    async update(screenObj: MenuManagementObj): Promise<void> {
      const reqForm: MenuManagement = new MenuManagement();
      _.assign(reqForm, _.pick(screenObj, _.keys(reqForm)));
      await axios.put("/menuManagement/update", reqForm);
    },
    addMenuManagement(array: MenuManagement[]): void {
      array.forEach((obj) => {
        const menuManagement: MenuManagement = new MenuManagement();
        _.assign(menuManagement, _.pick(obj, _.keys(menuManagement)));
        this.menuManagement.push(menuManagement);
      });
    },
  },
});
