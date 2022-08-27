<template>
  <div class="container p-5">
    {{ state.menuList }}
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
          <template v-for="(data, index1) in state.menuList" :key="index1">
            <tr v-for="(detail, index2) in data.detail" :key="index2">
              <td
                v-if="index2 === 0"
                :rowspan="data.detail.length"
              >
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
  </div>
</template>

<script setup lang="ts">
import SelectBoxWithLabel from "../components/Molecules/SelectBoxWithLabel.vue";
import InputWithLabel from "../components/Molecules/InputWithLabel.vue";
import { reactive } from "vue";
import { MenuManagement } from "../models/MenuManagement";
import { MenuManagementDetail } from "../models/MenuManagementDetail";

interface State {
  menuList: MenuManagement[];
}

const state = reactive<State>({
  menuList: [],
});

const init = () => {
  // テストデータ生成
  const testdata1 = new MenuManagement();
  testdata1.menuId = 1;
  const testdata1_1 = new MenuManagementDetail();
  testdata1_1.rankId = 1;
  testdata1_1.price = 3000;
  const testdata1_2 = new MenuManagementDetail();
  testdata1_2.rankId = 2;
  testdata1_2.price = 4000;
  const testdata1_3 = new MenuManagementDetail();
  testdata1_3.rankId = 3;
  testdata1_3.price = 5000;
  testdata1.detail.push(testdata1_1, testdata1_2, testdata1_3);

  const testdata2 = new MenuManagement();
  testdata2.menuId = 2;
  const testdata2_1 = new MenuManagementDetail();
  testdata2_1.rankId = 1;
  testdata2_1.price = 2000;
  const testdata2_2 = new MenuManagementDetail();
  testdata2_2.rankId = 2;
  testdata2_2.price = 3000;
  const testdata2_3 = new MenuManagementDetail();
  testdata2_3.rankId = 3;
  testdata2_3.price = 4000;
  testdata2.detail.push(testdata2_1, testdata2_2, testdata2_3);

  const testdata3 = new MenuManagement();
  testdata3.menuId = 3;
  const testdata3_1 = new MenuManagementDetail();
  testdata3_1.rankId = 1;
  testdata3_1.price = 4500;
  const testdata3_2 = new MenuManagementDetail();
  testdata3_2.rankId = 2;
  testdata3_2.price = 6500;
  const testdata3_3 = new MenuManagementDetail();
  testdata3_3.rankId = 3;
  testdata3_3.price = 8500;
  testdata3.detail.push(testdata3_1, testdata3_2, testdata3_3);

  state.menuList.push(testdata1, testdata2, testdata3);
};
init();

const addRow = (): void => {
  const newMenu = new MenuManagement();
  newMenu.detail.push(new MenuManagementDetail());
  state.menuList.push(newMenu);
};

const deleteRow = (index: number) => {
  state.menuList.splice(index, 1);
};

const addDetailRow = (index: number): void => {
  state.menuList[index].detail.push(new MenuManagementDetail());
};

const deleteDetailRow = (index: number) => {
  state.menuList[index].detail.pop();
  // 削除後、detailの要素が空になった場合
  if (!state.menuList[index].detail.length) {
    // 空のオブジェクトを追加する
    state.menuList[index].detail.push(new MenuManagementDetail());
  }
};
</script>

<style></style>
