<template>
  <div class="w-full h-full">
    <p class="pb-10 text-center font-bold text-2xl">顧客登録</p>
    <div
      v-if="message.messageList && message.messageType !== MessageStatus.SUCCESS.code"
      class="pb-10 w-1/3 m-auto text-red-500"
    >
      <ul v-for="(mes, index) in message.messageList" :key="index">
        <li>※{{ mes }}</li>
      </ul>
    </div>
    <div class="grid gap-6 mb-6 grid-cols-2">
        <InputWithLabel
          v-model:input-value="state.screenObj.lastName"
          label="姓"
          placeholder="山田"
          :requiredFlg="true"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.firstName"
          label="名"
          placeholder="太郎"
          :requiredFlg="true"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.lastNameKana"
          label="セイ"
          placeholder="ヤマダ"
          :requiredFlg="true"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.firstNameKana"
          label="メイ"
          placeholder="タロウ"
          :requiredFlg="true"
        />

      <!-- DatePickerWithLabel -->
        <DatePickerWithLabel
            v-model:inputValue="state.screenObj.birthday"
            label="生年月日"
            :requiredFlg="false"
        />

      <!-- InputWithLabel -->
        <InputWithLabel
          v-model:input-value="state.screenObj.age"
          label="年齢"
          placeholder="25"
          :requiredFlg="false"
        />
        <SelectBoxWithLabel
          v-model:select-value="state.screenObj.gender"
          :options="GenderList"
          label="性別"
          :requiredFlg="true"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.postalCode"
          label="郵便番号"
          placeholder="1234567"
          :requiredFlg="false"
        />
        <SelectBoxWithLabel
          v-model:select-value="state.screenObj.prefectureId"
          :options="PrefectureIdList"
          label="都道府県"
          :requiredFlg="false"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.address1"
          label="市区町村"
          placeholder="新宿区"
          :requiredFlg="false"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.address2"
          label="市区町村以下"
          placeholder="新宿1-1-1"
          :requiredFlg="false"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.address3"
          label="建物、部屋番号"
          placeholder="新宿ビル101"
          :requiredFlg="false"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.phoneNumber"
          label="電話番号"
          placeholder="09012345678"
          :requiredFlg="false"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.email"
          label="メールアドレス"
          placeholder="taro@gmail.com"
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
import { PrefectureIdList } from "../constants/PrefectureId";
import { CustomerCreateScreenObj } from "../models/screenObj/CustomerCreateScreenObj";
import { CustomerCreateRequest } from "../models/form/CustomerCreateRequest";
import { MessageStatus } from '../constants/MessageStatus'
import { useMessageStore } from '../store/message'
import DatePickerWithLabel from '../components/Molecules/DatePickerWithLabel.vue';

const messageStore = useMessageStore();

const message = computed(() => {
  return messageStore.getMessage;
});

interface State {
  screenObj: CustomerCreateScreenObj;
}

const state = reactive<State>({
  screenObj: new CustomerCreateScreenObj(),
});

/** 登録ボタンクリックイベント */
const register = async () => {
  const reqForm: CustomerCreateRequest = new CustomerCreateRequest();
  Object.assign(reqForm, state.screenObj);
  await axios
    .post("/customerCreate", reqForm)
    .then(() => {
      // 入力項目を初期化する
      state.screenObj = new CustomerCreateScreenObj();
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
