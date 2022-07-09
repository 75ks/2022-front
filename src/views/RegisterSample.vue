<template>
  <div class="w-full h-full">
    <p class="pb-10 text-center font-bold text-2xl">スタッフ登録サンプル</p>
    <div class="w-1/3 m-auto">
      <SelectBoxWithLabel
        v-model:select-value="registerForm.storeId"
        targetUrl="/selectOption/storeNames"
        label="店舗名"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="registerForm.lastName"
        label="姓"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="registerForm.firstName"
        label="名"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="registerForm.lastNameKana"
        label="セイ"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="registerForm.firstNameKana"
        label="メイ"
        :requiredFlg="true"
      />
      <SelectBoxWithLabel
        v-model:select-value="registerForm.rank"
        targetUrl="/selectOption/ranks"
        label="ランク"
        :requiredFlg="true"
      />
      <SelectBoxWithLabel
        v-model:select-value="registerForm.gender"
        :options="GenderList"
        label="性別"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="registerForm.email"
        label="メールアドレス"
        type="email"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="registerForm.password"
        label="パスワード"
        type="password"
        :requiredFlg="true"
      />
      <InputWithLabel
        v-model:input-value="passwordConfirmation"
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
import { RegisterSampleForm } from "../models/form/RegisterSampleForm";
import { reactive, ref } from "vue";
import axios from "../plugins/axios";
import InputWithLabel from "../components/Molecules/InputWithLabel.vue";
import SelectBoxWithLabel from "../components/Molecules/SelectBoxWithLabel.vue";
import {GenderList} from '../constants/Gender';

/** スタッフ登録フォーム */
const registerForm = reactive<RegisterSampleForm>({
  storeId: "0",
  lastName: "",
  firstName: "",
  lastNameKana: "",
  firstNameKana: "",
  rank: "指定なし",
  gender: "指定なし",
  email: "",
  password: "",
});
/** パスワード確認用(リクエストに含めないため、スタッフ登録フォームと分離させている) */
const passwordConfirmation = ref<string>("");

/** スタッフ登録フォームが空がない場合にtrueを返す */
const notEmptyForm = () => {
  return (
    registerForm.storeId !== "" &&
    registerForm.storeId !== "0" &&
    registerForm.lastName !== "" &&
    registerForm.firstName !== "" &&
    registerForm.lastNameKana !== "" &&
    registerForm.firstNameKana !== "" &&
    registerForm.rank !== "" &&
    registerForm.rank !== "指定なし" &&
    registerForm.gender !== "" &&
    registerForm.gender !== "指定なし" &&
    registerForm.email !== "" &&
    registerForm.password !== ""
  );
};

/** 登録ボタンクリックイベント */
const register = async () => {
  if (notEmptyForm()) {
    if (registerForm.password === passwordConfirmation.value) {
      // サンプルのため、Storeを作成せず直接APIを実行(本来はStuff用のStoreを作成する)
      await axios.post("/sample/", registerForm);
    } else {
      alert("メールアドレスまたはパスワードが違います");
    }
  } else {
    alert("必須項目を入力してください");
  }
};
</script>

<style></style>
