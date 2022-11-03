<template>
  <div class="container">
    <Header
      header-name="メニューマスタ管理"
    />
    <div class="mt-2 bg-white py-3">
      <div class="pl-6 pb-3">
        <CustomButton
          button-name="戻る"
          @click="$router.push('/menuManagement')"
        />
      </div>
      <table class="w-1/3">
        <thead class="w-full">
          <tr>
            <th></th>
            <th class="border border-gray-300 bg-white w-full">
              <div class="align-middle">
                メニュー
                <font-awesome-icon
                  :icon="['fas', 'plus-circle']"
                  class=" text-green-600 cursor-pointer hover:text-green-400"
                  @click="addRow"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(data, index1) in menuManagementList" :key="index1">
            <tr>
              <td class="p-1">
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
      <div class="w-1/4 mt-4 ml-6">
        <CustomButton
          button-name="更新"
          @click="register"
          :buttonColorNumber="1"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Atoms/Layout/Header.vue";
import InputWithLabel from "../components/Molecules/InputWithLabel.vue";
import CustomButton from '../components/Atoms/Button/CustomButton.vue';
import { reactive } from "vue";
import { computed } from "vue";
import { useMenuManagementCreateStore } from "../store/MenuManagementCreate";
import axios from "../plugins/axios";
import { MenuManagementCreateListObj } from "../models/screenObj/MenuManagementCreateListObj";
import { MenuManagementCreateListForm } from "../models/form/MenuManagementCreateListForm";
import { MenuManagementCreateForm } from "../models/form/MenuManagementCreateForm";
const MenuManagementCreateStore = useMenuManagementCreateStore();

MenuManagementCreateStore.fetchMenuManagement();

const menuManagementList = computed(() => {
  return MenuManagementCreateStore.getMenuManagementCreate;
});

const addRow = (): void => {
  MenuManagementCreateStore.addRow();
};

const deleteRow = (index: number) => {
  MenuManagementCreateStore.deleteRow(index);
};

interface State {
  screenObj: MenuManagementCreateListObj;
}
const state = reactive<State>({
  screenObj: new MenuManagementCreateListObj(),
});

/** 登録ボタンクリックイベント */
const register = async () => {
  const reqForm: MenuManagementCreateListForm = new MenuManagementCreateListForm();
  menuManagementList.value.forEach(obj => {
    const tempForm: MenuManagementCreateForm = new MenuManagementCreateForm();
    Object.assign(tempForm, obj);
    reqForm.createMenu.push(tempForm);
  })

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
