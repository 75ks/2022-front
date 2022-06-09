<template>
  <main class="p-20">
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <div class="flex">
      <div class="w-1/4 p-5">
        <TextInput
          v-model:inputValue="state.textInputProps.inputValue"
          :label="state.textInputProps.label"
          :sideBySideFlg="state.textInputProps.sideBySideFlg"
          :size="state.textInputProps.size"
          :inputWidth="state.textInputProps.inputWidth"
          :requiredFlg="state.textInputProps.requiredFlg"
          :disableFlg="state.textInputProps.disableFlg"
        />
      </div>
      <div class="w-1/4 p-5">
        <div class="mb-1">
          <label class="text-sm mr-1">横並びフラグ</label>
          <input
            type="checkbox"
            v-model="state.textInputProps.sideBySideFlg"
            class="px-2 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
          />
        </div>

        <div class="mb-1">
          <label class="text-sm mr-1">必須フラグ</label>
          <input
            type="checkbox"
            v-model="state.textInputProps.requiredFlg"
            class="px-2 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
          />
        </div>

        <div class="mb-1">
          <label class="text-sm mr-1">無効フラグ</label>
          <input
            type="checkbox"
            v-model="state.textInputProps.disableFlg"
            class="px-2 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
          />
        </div>

        <div class="mb-1">
          <label class="text-sm mr-1">ラベル名</label>
          <input
            v-model="state.textInputProps.label"
            class="w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
          />
        </div>

        <div class="mb-1">
          <label class="text-sm mr-1">入力欄幅</label>
          <input
            v-model="state.textInputProps.inputWidth"
            class="w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
          />
        </div>

        <div class="mb-1">
          <label class="text-sm mr-1">サイズ</label>
          <select
            v-model="state.textInputProps.size"
            class="w-full px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline outline-blue-300"
          >
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
          </select>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TextInput from "../components/Common/TextInput.vue";
import { reactive } from "vue";

class TextInputProps {
  inputValue: string = "";
  label: string = "ラベル名";
  sideBySideFlg: boolean = false;
  inputWidth: string = "";
  size: string = "md";
  requiredFlg: boolean = false;
  disableFlg: boolean = false;
}

const state = reactive({
  textInputProps: new TextInputProps(),
});
</script>

<style></style>
