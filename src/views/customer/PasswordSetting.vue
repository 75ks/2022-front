<template>
  <div class="w-full">
    <div class="w-1/2 m-auto p-8 mt-20 bg-white">
      <p class="pb-10 text-center font-bold text-2xl">パスワード変更</p>
      <div
        v-if="message.messageList.length"
        class="pb-10 w-2/3 m-auto"
        :class="message.messageType === MessageStatus.DANGER.code || MessageStatus.WARNING.code ? 'text-red-500' : 'text-green-500'"
      >
        <ul v-for="(mes, index) in message.messageList" :key="index">
          <li>※{{ mes }}</li>
        </ul>
      </div>
      <p class="m-auto text-center text-sm">◆初めてのご利用のお客様には、セキュリティ強化のため、パスワードの変更をお願いしております。</p>
      <p class="m-auto pb-10 text-center text-sm">新しいパスワードを入力後、「パスワード変更」ボタンをクリックしてください。</p>
      <div class="w-2/3 m-auto pb-5">
        <CustomInputWithLabel
          v-model:input-value="state.screenObj.password"
          label="パスワード"
        />
      </div>
      <div class="w-2/3 m-auto text-center">
        <CustomButton
          class="w-full"
          :button-name="'パスワード変更'"
          :button-color-number='1'
          @click="register"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { reactive, computed } from 'vue';
import CustomInputWithLabel from '../../components/Molecules/InputWithLabel.vue';
import CustomButton from '../../components/Atoms/Button/CustomButton.vue';
import { PasswordSettingScreenObj } from '../../models/screenObj/PasswordSettingScreenObj';
import { MessageStatus } from '../../constants/MessageStatus';
import { useCustomerAuthorizationStore } from '../../store/customerAuthorization';
import { useMessageStore } from '../../store/message';
import { useRouter } from 'vue-router';

const customerAuthorizationStore = useCustomerAuthorizationStore();
const messageStore = useMessageStore();
const router = useRouter();

if (messageStore.getMessage.messageType !== MessageStatus.WARNING.code) {
  messageStore.resetMessageList();
  messageStore.resetMessageType();
}

const message = computed(() => {
  return messageStore.getMessage;
});

interface State {
  screenObj: PasswordSettingScreenObj;
}

const state = reactive<State>({
  screenObj: new PasswordSettingScreenObj()
});

/** 「パスワード変更」クリックイベント */
const register = async () => {
  let checkRegisterFlg = window.confirm('入力したパスワードで設定してよろしいですか？\r\nパスワード: ' + state.screenObj.password);
  if (checkRegisterFlg) {
    await customerAuthorizationStore.registerPassword(state.screenObj);
    // プロフィール画面に遷移
    router.push("/customer/profile");
  }
}
</script>

<style>
</style>
