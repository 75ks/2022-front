<template>
  <div class="w-full mt-12 md:mt-0">
    <Loading :is-loading="isLoading"/>
    <div class="w-full m-auto py-8 bg-white">
      <p class="pb-10 text-center font-bold text-2xl">プロフィール画面</p>
      <div
      v-if="message.messageList.length && message.messageType !== MessageStatus.SUCCESS.code"
        class="pb-10 w-2/3 m-auto text-red-500"
      >
        <ul v-for="(mes, index) in message.messageList" :key="index">
          <li>※{{ mes }}</li>
        </ul>
      </div>
      <div class="grid gap-6 mx-6 grid-cols-1">
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
        <DatePickerWithLabel
          v-model:inputValue="state.screenObj.birthday"
          label="生年月日"
          :requiredFlg="false"
        />
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
        <CustomButton
          class="w-full mt-4"
          button-name="更新"
          :button-color-number="1"
          @click="update"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomButton from "../../components/Atoms/Button/CustomButton.vue";
import { reactive, computed, ref } from "vue";
import axios from "../../plugins/axios";
import InputWithLabel from "../../components/Molecules/InputWithLabel.vue";
import SelectBoxWithLabel from "../../components/Molecules/SelectBoxWithLabel.vue";
import { GenderList } from "../../constants/Gender";
import { PrefectureIdList } from "../../constants/PrefectureId";
import { MessageStatus } from "../../constants/MessageStatus";
import { useMessageStore } from "../../store/message";
import DatePickerWithLabel from "../../components/Molecules/DatePickerWithLabel.vue";
import { ProfileScreenObj } from "../../models/screenObj/customer/ProfileScreenObj";
import { ProfileUpdateRequest } from '../../models/form/customer/ProfileUpdateRequest';
import _ from 'lodash';
import Loading from '../../components/Atoms/Layout/Loading.vue';

const messageStore = useMessageStore();

const message = computed(() => {
  return messageStore.getMessage;
});

interface State {
  screenObj: ProfileScreenObj;
}

const state = reactive<State>({
  screenObj: new ProfileScreenObj(),
});

/** ローティングフラグ */
const isLoading = ref<boolean>(false);

const initialize = () => {
  axios.get("/customer/profile/initialize")
    .then(({ data }) => {
      Object.assign(state.screenObj, data);
    });
};
initialize();

/** 更新ボタンクリックイベント */
const update = async () => {
  isLoading.value = !isLoading.value;
  const reqForm: ProfileUpdateRequest = new ProfileUpdateRequest();
  _.assign(reqForm, _.pick(state.screenObj, _.keys(reqForm)));
  await axios
    .put("/customer/profile/update", reqForm)
    .then(({ data }) => {
      // 初期表示イベントを呼ぶ
      initialize();
    })
    .finally(() => {
      // 正常終了・エラー問わず必ず行う処理
      isLoading.value = !isLoading.value;
    });
};
</script>

<style></style>
