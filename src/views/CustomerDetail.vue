<template>
  <div class="w-full h-full">
    <p class="pb-10 text-center font-bold text-2xl">顧客詳細</p>
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
          :requiredFlg="false"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.address2"
          label="市区町村以下"
          :requiredFlg="false"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.address3"
          label="建物、部屋番号"
          :requiredFlg="false"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.phoneNumber"
          label="電話番号"
          :requiredFlg="false"
        />
        <InputWithLabel
          v-model:input-value="state.screenObj.email"
          label="メールアドレス"
          type="email"
          :requiredFlg="true"
        />      
    </div>

    <div class="">
      <CustomButton
        class="w-24 mt-16 mr-2"
        :button-name="'戻る'"
        :button-color-number="0"
        @click='$router.push("/customerList")'
      />
      <CustomButton
        class="w-24 mt-16 ml-2"
        :button-name="'更新'"
        :button-color-number="1"
        @click="register"
      />
    </div>
      
  </div>
</template>

<script setup lang="ts">
import CustomButton from "../components/Atoms/Button/CustomButton.vue";
import { reactive, computed, watchEffect, toRefs, ref } from "vue";
import axios from "../plugins/axios";
import InputWithLabel from "../components/Molecules/InputWithLabel.vue";
import SelectBoxWithLabel from "../components/Molecules/SelectBoxWithLabel.vue";
import { GenderList } from "../constants/Gender";
import { PrefectureIdList } from "../constants/PrefectureId";
import { CustomerDetailScreenObj } from "../models/screenObj/CustomerDetailScreenObj";
import { CustomerDetailRequest } from "../models/form/CustomerDetailRequest";
import { MessageStatus } from '../constants/MessageStatus'
import { useMessageStore } from '../store/message'
import DatePickerWithLabel from '../components/Molecules/DatePickerWithLabel.vue';
import { useRoute } from "vue-router";

const messageStore = useMessageStore();

const message = computed(() => {
  return messageStore.getMessage;
});

const route = useRoute();

interface State {
  screenObj: CustomerDetailScreenObj;
}

const state = reactive<State>({
  screenObj: new CustomerDetailScreenObj(),
});

const customerId: number = Number(route.params.customerId);

/** 初期表示 */
axios
  .get("/customerDetail/initialize", {
    params: { customerId: customerId }
  })
  .then(({ data }) => {
    Object.assign(state.screenObj, data);
  })
  .catch((error) => {
    // エラー発生時の処理
  })
  .finally(() => {
    // 正常終了・エラー問わず必ず行う処理
  });

// axios
//   .get("/customerDetail/initialize", {
//       params: { customerId: customerId }
//     })
//     .then(({ data }) => {
//     Object.assign(state.screenObj, data);
//   });

/** 更新ボタンクリックイベント */
const register = async () => {
  const reqForm: CustomerDetailRequest = new CustomerDetailRequest();
  Object.assign(reqForm, state.screenObj);
  reqForm.customerId = customerId;
  await axios
    .post("/customerDetail/", reqForm)
    .then(() => {
      // 正常終了時
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