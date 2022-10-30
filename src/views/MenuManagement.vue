<template>
  <div class="container p-5">
    <div class="flex justify-center">
      <table class="w-2/3">
        <thead>
          <tr>
            <th></th>
            <th class="border border-gray-300 bg-white w-2/5">
              <div class="align-middle">
                メニュー
                <font-awesome-icon
                  :icon="['fas', 'plus-circle']"
                  class="ml-1 text-green-600 cursor-pointer hover:text-green-400"
                  @click="addRow"
                />
              </div>
            </th>
            <th class="border border-gray-300 bg-white w-2/5">ランク</th>
            <th class="border border-gray-300 bg-white w-1/5">料金</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(data, index1) in menuManagementList" :key="index1">
            <tr v-for="(detail, index2) in data.detail" :key="index2">
              <td v-if="index2 === 0" :rowspan="data.detail.length">
                <font-awesome-icon
                  :icon="['fas', 'minus-circle']"
                  class="ml-1 text-red-600 cursor-pointer hover:text-red-400"
                  @click="deleteRow(index1)"
                />
              </td>
              <td
                v-if="index2 === 0"
                class="border border-gray-300 bg-white p-2"
                :rowspan="data.detail.length"
              >
                <SelectBoxWithLabel
                  v-model:select-value="data.menuId"
                  targetUrl="/selectOption/menus"
                />
              </td>
              <td class="border border-gray-300 bg-white p-2">
                <SelectBoxWithLabel
                  v-model:select-value="detail.rankId"
                  targetUrl="/selectOption/ranks"
                />
              </td>
              <td class="border border-gray-300 bg-white p-2">
                <InputWithLabel
                  v-model:input-value="detail.price"
                  type="number"
                />
              </td>
              <td>
                <div class="flex align-middle">
                  <font-awesome-icon
                    :icon="['fas', 'minus-circle']"
                    class="ml-1 text-red-600 cursor-pointer hover:text-red-400"
                    @click="deleteDetailRow(index1)"
                    v-if="index2 === data.detail.length - 1"
                  />
                  <font-awesome-icon
                    :icon="['fas', 'plus-circle']"
                    class="ml-1 text-green-600 cursor-pointer hover:text-green-400"
                    @click="addDetailRow(index1)"
                    v-if="index2 === data.detail.length - 1"
                  />
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="w-1/4 mt-4 ml-14 text-right pr-9">
      <CustomButton
        button-name="更新"
        @click="register"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import SelectBoxWithLabel from "../components/Molecules/SelectBoxWithLabel.vue";
import InputWithLabel from "../components/Molecules/InputWithLabel.vue";
import { reactive, ref } from "vue";
import { MenuManagement } from "../models/MenuManagement";
import { MenuManagementDetail } from "../models/MenuManagementDetail";
import { computed } from "vue";
import { useMenuManagementStore } from "../store/MenuManagement";
import axios from "../plugins/axios";
import CustomButton from '../components/Atoms/Button/CustomButton.vue';
import { MenuManagementUpdateForm } from "../models/form/MenuManagementUpdateForm";
import { MenuManagementUnityForm } from "../models/form/MenuManagementUnityUpdateFrom";
import { MenuManagementUnityObj } from "../models/screenObj/MenuManagementUnityObj";
import  MenuManagementModal from "../components/MenuManagementModal/MenuManagementModal.vue";




const MenuManagementStore = useMenuManagementStore();

MenuManagementStore.fetchMenuManagement();

const menuManagementList = computed(() => {
  return MenuManagementStore.getMenuManagement;
});

const addRow = (): void => {
  const menuManagementData = ref<MenuManagement>(new MenuManagement());
  menuManagementData.value.detail.push(new MenuManagementDetail());
  menuManagementList.value.push(menuManagementData.value);
};

const deleteRow = (index: number) => {
  menuManagementList.value.splice(index, 1);
};

const addDetailRow = (index: number): void => {
  menuManagementList.value[index].detail.push(new MenuManagementDetail());
};

const deleteDetailRow = (index: number) => {
  menuManagementList.value[index].detail.pop();
  if (!menuManagementList.value[index].detail.length) {
    menuManagementList.value[index].detail.push(new MenuManagementDetail());
  }
};

interface State {
  screenObj: MenuManagementUnityObj;
}
const state = reactive<State>({
  screenObj: new MenuManagementUnityObj(),
});



/** 登録ボタンクリックイベント */
const register = async () => {
  const reqForm: MenuManagementUnityForm = new MenuManagementUnityForm();
  menuManagementList.value.forEach(obj => {
    const tempForm: MenuManagementUpdateForm = new MenuManagementUpdateForm();
    Object.assign(tempForm, obj);
    reqForm.unity.push(tempForm);
  })

  await axios
    .put("/menuManagement/update", reqForm)
    .then(() => {
      // 入力項目を初期化する
      state.screenObj = new MenuManagementUnityObj();
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
