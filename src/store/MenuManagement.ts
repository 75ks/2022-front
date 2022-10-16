import { defineStore } from "pinia";
import { MenuManagement } from "../models/MenuManagement";
import axios from "../plugins/axios";
import _ from "lodash";


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
      const { data } = await axios.get("/menuManagement/initialize", {});
      this.addMenuManagement(data);
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
