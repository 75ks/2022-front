<template>
  <main class="p-20">
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <div class="justify-center m-auto w-1/4 p-5">
      ●縦並び
      <TextInput
        v-model:inputValue='inputValue'
        label="ラベル名"
        size="text-sm"
        :requiredFlg="true"
      />

      <br>

      ●横並び
      <TextInput
        v-model:inputValue='inputValue'
        label="ラベル名"
        :sideBySideFlg="true"
        size="text-sm"
        inputWidth="w-3/5"
        :requiredFlg="true"
      />

    </div>
  </main>
</template>


<script setup lang="ts">
import TextInput from '../components/Common/TextInput.vue';
import {ref} from 'vue';

const inputValue = ref<string>('aaa');

</script>

<style>
</style>
