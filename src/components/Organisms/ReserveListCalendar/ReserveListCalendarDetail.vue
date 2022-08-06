<template>
  <div class="custom-height p-2 mt-2 bg-white">
    <select
      v-model="calendarSelectValue"
      class="px-2 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
    >
      <option value="1">週</option>
      <option value="2">月</option>
    </select>
    <div v-if="calendarSelectValue === '1'">
      <ReserveListCalendarWeek :reserve-list="reserveList" />
    </div>
    <div class="custom-height" v-if="calendarSelectValue === '2'">
      <ReserveListCalendarMonth :reserve-list="reserveList" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Reserve } from '../../../models/Reserve';
import ReserveListCalendarMonth from './ReserveListCalendarMonth.vue';
import ReserveListCalendarWeek from './ReserveListCalendarWeek.vue'
import { ref } from 'vue';

const props = defineProps<{
  reserveList: Reserve[]
}>();

const calendarSelectValue = ref<string>("2");
</script>

<style>
  .custom-height {
    /** カレンダー高さ微調整(ヘッダー:48px - border:1px) */
    height: calc(100% - 47px);
  }
</style>
