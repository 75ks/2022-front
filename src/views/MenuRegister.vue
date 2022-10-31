<template>
  <div class="container p-5">
    <div class="flex justify-center">
      <table class="w-full">
        <thead class="w-full">
          <tr>
            <th class="w-1/12"></th>
            <th class="border border-gray-300 bg-white w-4/5">
              <div class="align-middle">
                新規メニュー追加
                <font-awesome-icon
                  :icon="['fas', 'plus-circle']"
                  class=" text-green-600 cursor-pointer hover:text-green-400"
                  @click="addRow"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="w-full">
          <template v-for="(data, index1) in menuManagementList" :key="index1">
            <tr>
              <td>
                <font-awesome-icon
                  :icon="['fas', 'minus-circle']"
                  class=" text-red-600 cursor-pointer hover:text-red-400"
                  @click="deleteRow(index1)"
                />
              </td>
              <td class="border border-gray-300 bg-white p-2 w-4/5">
                <InputWithLabel
                  v-model:input-value="data.menu"
                  type="string"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="w-1/4 mt-4 text-right pr-40">
      <CustomButton
        button-name="更新"
        @click="register"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import InputWithLabel from "../components/Molecules/InputWithLabel.vue";
import CustomButton from '../components/Atoms/Button/CustomButton.vue';
import { reactive, ref } from "vue";
import { MenuManagementCreate } from "../models/MenuManagementCreate";
import { computed } from "vue";
import { useMenuManagementCreateStore } from "../store/MenuManagementCreate";
import axios from "../plugins/axios";
import { MenuManagementUpdateForm } from "../models/form/MenuManagementUpdateForm";
import { MenuManagementUnityForm } from "../models/form/MenuManagementUnityUpdateFrom";
import { MenuManagementCreateListObj } from "../models/screenObj/MenuManagementCreateListObj";
import { MenuManagementCreateListForm } from "../models/form/MenuManagementCreateListForm";
import { MenuManagementCreateForm } from "../models/form/MenuManagementCreateForm";
import { MenuManagementListForm } from "../models/form/MenuManagementListForm";
const MenuManagementCreateStore = useMenuManagementCreateStore();

MenuManagementCreateStore.fetchMenuManagement();

const menuManagementList = computed(() => {
  return MenuManagementCreateStore.getMenuManagementCreate;
});



const addRow = (): void => {
  const menuManagementData = ref<MenuManagementCreate>(new MenuManagementCreate());
  menuManagementList.value.push(menuManagementData.value);
  for(let i = 0; i < menuManagementList.value.length; i++){
    menuManagementList.value[i].menuId = i;
  }

};

const deleteRow = (index: number) => {
  menuManagementList.value.splice(index, 1);
};



interface State {
  screenObj: MenuManagementCreateListObj;
}
const state = reactive<State>({
  screenObj: new MenuManagementCreateListObj(),
});

const register = async () => {
  const reqForm: MenuManagementCreateListForm = new MenuManagementCreateListForm();
  menuManagementList.value.forEach(obj => {
    const tempForm: MenuManagementCreateForm = new MenuManagementCreateForm();
    Object.assign(tempForm, obj);
    reqForm.createMenu.push(tempForm);
  })

/** 登録ボタンクリックイベント */
  await axios
    .put("menuRegister/update", reqForm)
    .then(() => {
      // 入力項目を初期化する
      state.screenObj = new MenuManagementCreateListObj();
    })
    .catch((error) => {
      // エラー発生時の処理
    })
    .finally(() => {
      // 正常終了・エラー問わず必ず行う処理
    });
};
</script>

<style></style>