<template>
  <div class="w-full h-full">
    <p class="pb-10 text-center font-bold text-2xl">顧客登録</p>
    <div 
      v-if="message.messageList.length"
      class="pb-10 w-1/3 m-auto"
      :class="message.messageType === MessageStatus.DANGER.code ? 'text-red-500' : 'text-green-500'"
    >
      <ul v-for="(mes, index) in message.messageList" :key="index">
        <li>※{{ mes }}</li>
      </ul>
    </div>
    <div class="grid gap-6 mb-6 grid-cols-2">
      <SelectBoxWithLabel
        v-model:select-value="state.screenObj.storeId"
        targetUrl="/selectOption/storeNames"
        label="店舗名"
        :requiredFlg="true"
      /><br>
      <InputWithLabel
        v-model:input-value="state.screenObj.lastName"
        label="姓"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.firstName"
        label="名"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.lastNameKana"
        label="セイ"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.firstNameKana"
        label="メイ"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.birhday"
        label="生年月日"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.age"
        label="年齢"
        :requiredFlg="true"
      />
      <SelectBoxWithLabel
        v-model:select-value="state.screenObj.gender"
        :options="GenderList"
        label="性別"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.postal_code"
        label="郵便番号"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.prefecture"
        label="都道府県"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.address1"
        label="市区町村"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.address2"
        label="市区町村以下"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.address3"
        label="建物、部屋番号"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.phone_number"
        label="電話番号"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.email"
        label="メールアドレス"
        type="email"
        :requiredFlg="true"
      />
      <CustomButton
        class="w-full mt-16"
        :button-name="'登録'"
        :button-color-number="1"
        @click="register"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "../components/Atoms/Button/CustomButton.vue";
import { reactive, computed } from "vue";
import axios from "../plugins/axios";
import InputWithLabel from "../components/Molecules/InputWithLabel.vue";
import SelectBoxWithLabel from "../components/Molecules/SelectBoxWithLabel.vue";
import { GenderList } from "../constants/Gender";
import { CustomerCreateScreenObj } from "../models/screenObj/CustomerCreateScreenObj";
import { CustomerCreateRequest } from "../models/form/CustomerCreateRequest";
import { MessageStatus } from '../constants/MessageStatus'
import { useMessageStore } from '../store/message'

const messageStore = useMessageStore();

const message = computed(() => {
  return messageStore.getMessage;
});

interface State {
  screenObj: CustomerCreateScreenObj;
  passwordConfirmation: string;
}

const state = reactive<State>({
  screenObj: new CustomerCreateScreenObj(),
  passwordConfirmation: "",
});

/** 登録ボタンクリックイベント */
const register = async () => {
  const reqForm: CustomerCreateRequest = new CustomerCreateRequest();
  Object.assign(reqForm, state.screenObj);
  await axios
    .post("/customerCreate", reqForm)
    .then(() => {
      // 正常終了時の処理
    })
    .catch((error) => {
      // エラー発生時の処理
    })
    .finally(() => {
      // 正常終了・エラー問わず必ず行う処理
    });
};
</script>

<style></style>