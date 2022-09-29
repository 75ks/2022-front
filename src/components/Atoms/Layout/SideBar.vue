<template>
  <div
    v-if="loginType == 1"
    class="w-1/6 h-screen fixed top-0 left-0 right-0 bg-gray-700 text-white"
  >
    <router-link to="/" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'user']" class="w-4 h-4 pr-2 font-black" />
        <p>スタッフ管理</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link to="/customerCreate" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'users']" class="w-4 h-4 pr-2 font-black" />
        <p>顧客管理</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link to="/reserveList" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'calendar-check']" class="w-4 h-4 pr-2 font-black" />
        <p>予約管理</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link to="/reserveListCalendar" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'calendar-alt']" class="w-4 h-4 pr-2 font-black" />
        <p>予約カレンダー</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link to="/salesTotal" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'yen-sign']" class="w-4 h-4 pr-2 font-black" />
        <p>売上集計</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link to="/" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'scissors']" class="w-4 h-4 pr-2 font-black" />
        <p>メニューマスタ管理</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link to="/login" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" class="w-4 h-4 pr-2 font-black" />
        <p>ログアウト</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
  </div>
  <div
    v-if="loginType == 2"
    class="w-1/6 h-screen fixed top-0 left-0 right-0 bg-gray-700 text-white"
  >
    <router-link to="/customer/profile" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'id-card']" class="w-4 h-4 pr-2 font-black" />
        <p>プロフィール</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link to="/customer/reserveRegister" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'calendar-check']" class="w-4 h-4 pr-2 font-black" />
        <p>予約</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link to="/customer/login" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" class="w-4 h-4 pr-2 font-black" />
        <p>ログアウト</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
  </div>
  <div v-if="loginType == 1 || loginType == 2" class="w-1/5"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthorizationStore } from '../../../store/authorization';
import { useCustomerAuthorizationStore } from '../../../store/customerAuthorization';

const loginType = computed<number>(() => {
  return useAuthorizationStore().getAuthorization.jwt ? 1 : useCustomerAuthorizationStore().getAuthorization.jwt ? 2 : 0;
});
</script>

<style>
</style>
