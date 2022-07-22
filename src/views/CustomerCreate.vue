<template>
  <div class="w-full h-full">
    <p class="pb-10 text-center font-bold text-2xl">顧客登録</p>

    <form>
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
        <InputWithLabel
          v-model:input-value="state.screenObj.password"
          label="パスワード"
          type="password"
          :requiredFlg="true"
        />
        <InputWithLabel
          v-model:input-value="state.passwordConfirmation"
          label="パスワード再入力"
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
    </form>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "../components/Atoms/Button/CustomButton.vue";
import { reactive } from "vue";
import axios from "../plugins/axios";
import InputWithLabel from "../components/Molecules/InputWithLabel.vue";
import SelectBoxWithLabel from "../components/Molecules/SelectBoxWithLabel.vue";
import { GenderList } from "../constants/Gender";
import { CustomerCreateRegisterScreenObj } from "../models/screenObj/CustomerCreateRegisterScreenObj";
import { RegisterSampleRequest } from "../models/form/RegisterSampleRequest";

interface State {
  screenObj: CustomerCreateRegisterScreenObj;
  passwordConfirmation: string;
}

const state = reactive<State>({
  screenObj: new CustomerCreateRegisterScreenObj(),
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