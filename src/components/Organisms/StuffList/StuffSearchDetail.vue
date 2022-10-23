<template>
  <div class="flex justify-center mt-2 bg-white p-2">
    <table class="w-full">
      <thead>
        <tr>
          <th class="border border-gray-300 p-2 text-gray-600">スタッフID</th>
          <th class="border border-gray-300 p-2 text-gray-600">スタッフ名</th>
          <th class="border border-gray-300 p-2 text-gray-600">スタッフ仮名</th>
          <th class="border border-gray-300 p-2 text-gray-600">ランク</th>
          <th class="border border-gray-300 p-2 text-gray-600">年齢</th>
          <th class="border border-gray-300 p-2 text-gray-600">性別</th>
        </tr>
      </thead>
      <tbody class="hover:cursor-pointer">
        <tr
          v-for="(stuff, index) in stuffList" :key="index"
          @click="onRowClicked(stuff)"
          class="hover:bg-slate-100"
          >
          <td class="border border-gray-300 p-2">{{ stuff.stuffId }}</td>
          <td class="border border-gray-300 p-2">{{ stuff.lastName }}{{ stuff.firstName }}</td>
          <td class="border border-gray-300 p-2">{{ stuff.lastNameKana }}{{ stuff.firstNameKana }}</td>
          <td class="border border-gray-300 p-2">{{ stuff.rank }}</td>
          <td class="border border-gray-300 p-2">{{ stuff.age }}</td>
          <td class="border border-gray-300 p-2">{{ Gender.getNameByCode(stuff.gender) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Stuff } from '../../../models/Stuff';
import { Gender } from '../../../constants/Gender';
import { useRouter } from 'vue-router';

const props = defineProps<{
  stuffList: Stuff[]
}>();

const router = useRouter();
/** スタッフレコードクリックイベント(スタッフ詳細画面へ遷移) */
const onRowClicked = (selectedStuffScreenObj: Stuff) => {
  router.push({ path: `/stuffDetail/${selectedStuffScreenObj.stuffId}` });
};

</script>

<style>
</style>
