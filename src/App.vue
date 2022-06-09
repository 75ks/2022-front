<template>
  <div id="app" class="w-full flex">
    <!-- TODO: メニューバーを作成する -->
    <div class="w-1/6 h-screen fixed top-0 left-0 right-0 bg-gray-700 text-white font-bold">menu</div>
    <div class="w-1/5"></div>
    <router-view class="w-full h-screen p-2 bg-gray-200" />
  </div>
</template>
