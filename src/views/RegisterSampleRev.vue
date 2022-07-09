<template>
  <div class="w-full h-full">
    <p class="pb-10 text-center font-bold text-2xl">スタッフ登録サンプル</p>
    <div class="w-1/3 m-auto">
      <SelectBoxWithLabel
        v-model:select-value="state.screenObj.storeId"
        targetUrl="/selectOption/storeNames"
        label="店舗名"
        :requiredFlg="true"
      />
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
      <SelectBoxWithLabel
        v-model:select-value="state.screenObj.rank"
        targetUrl="/selectOption/ranks"
        label="ランク"
        :requiredFlg="true"
      />
      <SelectBoxWithLabel
        v-model:select-value="state.screenObj.gender"
        :options="GenderList"
        label="性別"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.email"
        label="メールアドレス"
        type="email"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.screenObj.password"
        label="パスワード"
        type="password"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="state.passwordConfirmation"
        label="パスワード"
        type="password"
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
import { reactive } from "vue";
import axios from "../plugins/axios";
import InputWithLabel from "../components/Molecules/InputWithLabel.vue";
import SelectBoxWithLabel from "../components/Molecules/SelectBoxWithLabel.vue";
import { GenderList } from "../constants/Gender";
import { RegisterSampleScreenObj } from "../models/screenObj/RegisterSampleScreenObj";
import { RegisterSampleRequest } from "../models/form/RegisterSampleRequest";

interface State {
  screenObj: RegisterSampleScreenObj;
  passwordConfirmation: string;
}

const state = reactive<State>({
  screenObj: new RegisterSampleScreenObj(),
  passwordConfirmation: "",
});

/** 登録ボタンクリックイベント */
const register = async () => {
  const reqForm: RegisterSampleRequest = new RegisterSampleRequest();
  Object.assign(reqForm, state.screenObj);
  await axios
    .post("/sample/", reqForm)
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
