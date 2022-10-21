<template>
  <div
    v-if="loginType == 1"
    class="w-1/6 h-screen fixed top-0 left-0 right-0 bg-gray-700 text-white z-50"
  >
    <router-link to="/stuffCreate" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'user']" class="w-4 h-4 pr-2 font-black" />
        <p>スタッフ管理</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link to="/customerList" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
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
    class="md:hidden w-full fixed top-0 left-0 right-0 bg-gray-700 text-white z-50"
  >
    <font-awesome-icon
      :icon="['fas', 'bars']"
      class="px-2 py-4 cursor-pointer"
      @click="switchingMenu()"
    />
  </div>
  <div
    v-if="loginType == 2 && isVisibleMenu"
    class="w-full md:w-1/6 md:h-screen fixed top-12 md:top-0 left-0 right-0 bg-gray-700 text-white z-50"
    :class="menuAnimationType == 1 ? 'animate-scale-in-ver-top' : menuAnimationType == 2 ? 'animate-scale-out-ver-top' : ''"
  >
    <router-link
      to="/customer/profile"
      class="flex justify-between items-center px-2 py-4 hover:bg-blue-500"
      @click="switchingMenu()"
    >
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'id-card']" class="w-4 h-4 pr-2 font-black" />
        <p>プロフィール</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link
      to="/customer/reserveRegister"
      class="flex justify-between items-center px-2 py-4 hover:bg-blue-500"
      @click="switchingMenu()"
    >
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'calendar-check']" class="w-4 h-4 pr-2 font-black" />
        <p>予約</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link
      to="/customer/login"
      class="flex justify-between items-center px-2 py-4 hover:bg-blue-500"
      @click="switchingMenu()"
    >
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
import { computed, ref, onMounted } from 'vue';
import { useAuthorizationStore } from '../../../store/authorization';
import { useCustomerAuthorizationStore } from '../../../store/customerAuthorization';

const loginType = computed<number>(() => {
  return useAuthorizationStore().getAuthorization.jwt ? 1 : useCustomerAuthorizationStore().getAuthorization.jwt ? 2 : 0;
});

/** メニュー表示フラグ(PC初期値: true、スマホ初期値: false) */
const isVisibleMenu = ref<boolean>(window.innerWidth >= 768);
/** メニューアニメーションタイプ(0: 初期値、1: 表示アニメーション付与、2: 非表示アニメーション付与) */
const menuAnimationType = ref<number>(0);

/** PC/スマホ切替 */
const calculateWindowWidth = () => {
  // PC画面の場合
  if (window.innerWidth >= 768) {
    menuAnimationType.value = 0;
    isVisibleMenu.value = true;
  } else {
    menuAnimationType.value = 0;
    isVisibleMenu.value = false;
  }
}

/** ハンバーガーメニュー or メニュークリックイベント */
const switchingMenu = () => {
  // スマホ画面の場合
  if (window.innerWidth < 768) {
    switch (menuAnimationType.value) {
      // 初回時(メニュー表示、表示アニメーション付与)
      case 0:
        isVisibleMenu.value = true;
        menuAnimationType.value = 1;
        break;
      // 表示アニメーション付与時(非表示アニメーション付与)
      case 1:
        menuAnimationType.value = 2;
        break;
      // 非表示アニメーション付与時(表示アニメーション付与)
      case 2:
        menuAnimationType.value = 1;
        break;
    }
  }
}

onMounted(() => {
  window.addEventListener('resize', calculateWindowWidth);
});
</script>

<style>
</style>
