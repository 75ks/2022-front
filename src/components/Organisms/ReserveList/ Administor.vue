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
          <template v-for="(data, index1) in reserveList" :key="index1">
            <tr v-for="(detail, index2) in data.reserveHistoryId" :key="index2">
              <td
               v-if="index2 === 0"
               class="border border-gray-300 bg-white p-2"
               >
                <SelectBoxWithLabel
                v-model:select-value="data.menu"
                targetUrl="/selectOption/menus"
                />
              </td>
              <td class="border border-gray-300 bg-white p-2">
                <SelectBoxWithLabel
                v-model:select-value="data.rank"
                targetUrl="/selectOption/ranks"
                 />
              </td>
              <td class="border border-gray-300 bg-white p-2">
                <SelectBoxWithLabel
                v-model:select-value="data.price"
                targetUrl="/selectOption/ranks"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  {{reserveList}}
</template>

<script setup lang="ts">
import { Reserve } from '../../../models/Reserve';
import SelectBoxWithLabel from '../../Molecules/SelectBoxWithLabel.vue';

const props = defineProps<{
  reserveList: Reserve[]
}>();

</script>
