import { defineStore } from "pinia";
import { MenuManagementCreate } from "../models/MenuManagementCreate";
import axios from "../plugins/axios";
import _ from "lodash";
import { MenuManagementCreateObj } from "../models/screenObj/MenuManagementCreateObj";

export const useMenuManagementCreateStore = defineStore({
  id: "menuManagementCreate",
  state: () => ({
    menuManagementCreate: [] as MenuManagementCreate[],
  }),
  getters: {
    getMenuManagementCreate(state): MenuManagementCreate[] {
      return state.menuManagementCreate;
    },
  },
  actions: {
    async fetchMenuManagement(): Promise<void> {
      this.menuManagementCreate.splice(0);
      const { data } = await axios.get("/menuRegister/Create", {});
      this.addMenuManagement(data);
    },
    async update(screenObj: MenuManagementCreateObj): Promise<void> {
      const reqForm: MenuManagementCreate = new MenuManagementCreate();
      _.assign(reqForm, _.pick(screenObj, _.keys(reqForm)));
      await axios.put("/menuRegister/update", reqForm);
    },
    addMenuManagement(array: MenuManagementCreate[]): void {
      array.forEach((obj) => {
        const menuManagementCreate: MenuManagementCreate = new MenuManagementCreate();
        _.assign(menuManagementCreate, _.pick(obj, _.keys(menuManagementCreate)));
        this.menuManagementCreate.push(menuManagementCreate);
      });
    },
    addRow() {
      const menuManagementData = new MenuManagementCreate();
      this.menuManagementCreate.push(menuManagementData);
    },
    deleteRow(index: number) {
      this.menuManagementCreate.splice(index, 1);
    }
  },
});
