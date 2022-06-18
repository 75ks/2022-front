<template>
  <div class="w-1/6 h-screen fixed top-0 left-0 right-0 bg-gray-700 text-white">
    <router-link to="/" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'user']" class="w-4 h-4 pr-2 font-black" />
        <p>スタッフ管理</p>
      </div>
      <font-awesome-icon :icon="['fas', 'angle-right']" class="w-4 h-4 pr-2 font-black" />
    </router-link>
    <router-link to="/" class="flex justify-between items-center px-2 py-4 hover:bg-blue-500">
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
  <div class="w-1/5"></div>
</template>

<script setup lang="ts">
</script>

<style>
</style>
