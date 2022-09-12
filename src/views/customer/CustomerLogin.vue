<template>
  <div class="w-full">
    <div class="w-1/2 m-auto p-8 mt-20 bg-white">
      <p class="pb-10 text-center font-bold text-2xl">ログイン</p>
      <div
        v-if="message.messageList.length"
        class="pb-10 w-2/3 m-auto"
        :class="message.messageType === MessageStatus.DANGER.code || MessageStatus.WARNING.code ? 'text-red-500' : 'text-green-500'"
      >
        <ul v-for="(mes, index) in message.messageList" :key="index">
          <li>※{{ mes }}</li>
        </ul>
      </div>
      <div class="w-2/3 m-auto pb-5">
        <CustomInputWithLabel
          v-model:input-value="state.screenObj.email"
          label="メールアドレス"
          type="email"
        />
      </div>
      <div class="w-2/3 m-auto pb-10">
        <CustomInputWithLabel
          v-model:input-value="state.screenObj.password"
          label="パスワード"
          type="password"
        />
      </div>
      <div class="w-2/3 m-auto text-center">
        <CustomButton
          class="w-full"
          :button-name="'ログイン'"
          :button-color-number='1'
          @click="login"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import CustomInputWithLabel from '../../components/Molecules/InputWithLabel.vue';
import CustomButton from '../../components/Atoms/Button/CustomButton.vue';
import { LoginForm } from '../../models/form/LoginForm';
import { LoginScreenObj } from '../../models/screenObj/LoginScreenObj';
import { MessageStatus } from '../../constants/MessageStatus';
import { useAuthorizationStore } from '../../store/authorization';
import { useCustomerAuthorizationStore } from '../../store/customerAuthorization';
import { useMessageStore } from '../../store/message';
import { useRouter } from 'vue-router';

const authorizationStore = useAuthorizationStore();
const customerAuthorizationStore = useCustomerAuthorizationStore();
const messageStore = useMessageStore();
const router = useRouter();

if (messageStore.getMessage.messageType !== MessageStatus.WARNING.code) {
  messageStore.resetMessageList();
  messageStore.resetMessageType();
}

authorizationStore.fetchLogout();
authorizationStore.resetAuthorization();
customerAuthorizationStore.fetchLogout();
customerAuthorizationStore.resetAuthorization();

const message = computed(() => {
  return messageStore.getMessage;
});

interface State {
  screenObj: LoginScreenObj;
}

const state = reactive<State>({
  screenObj: new LoginScreenObj()
});

/** 「ログイン」クリックイベント(ログイン処理をする) */
const login = async () => {
  const reqForm: LoginForm = new LoginForm();
  Object.assign(reqForm, state.screenObj);
  await customerAuthorizationStore.fetchLogin(reqForm);
  if (customerAuthorizationStore.getAuthorization.jwt) {
    if (customerAuthorizationStore.getAuthorization.firstLoginFlg == 0) {
      // 初回ログインの場合、パスワード設定画面に遷移
      router.push("/customer/passwordSetting");
    } else {
      // 初回ログインではない場合、プロフィール画面に遷移
      router.push("/customer/profile");
    }
  } else {
    alert("メールアドレスまたはパスワードが違います");
  }
}
</script>

<style>
</style>
