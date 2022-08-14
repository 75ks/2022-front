<template>
  <div class="container p-5">
    <div class="flex justify-center">
      <table class="w-2/3">
        <thead>
          <tr>
            <th class="border border-gray-300 bg-white w-2/5">メニュー</th>
            <th class="border border-gray-300 bg-white w-2/5">ランク</th>
            <th class="border border-gray-300 bg-white w-1/5">料金</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(data, index1) in testData" :key="index1">
            <tr v-for="(detail, index2) in data.detail" :key="index2">
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
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectBoxWithLabel from "../components/Molecules/SelectBoxWithLabel.vue";
import InputWithLabel from '../components/Molecules/InputWithLabel.vue';

const testData = [
  {
    menuId: 1,
    detail: [
      { rankId: 1, price: 3000 },
      { rankId: 2, price: 4000 },
      { rankId: 3, price: 5000 },
    ],
  },
  {
    menuId: 2,
    detail: [
      { rankId: 1, price: 2000 },
      { rankId: 2, price: 3000 },
      { rankId: 3, price: 4000 },
    ],
  },
  {
    menuId: 3,
    detail: [
      { rankId: 1, price: 4500 },
      { rankId: 2, price: 6500 },
      { rankId: 3, price: 8500 },
    ],
  },
];
</script>

<style></style>
