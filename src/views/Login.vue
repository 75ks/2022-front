<template>
  <div class="w-full">
    <div class="w-1/2 m-auto p-8 mt-20 bg-white">
      <p class="pb-10 text-center font-bold text-2xl">ログイン</p>
      <div class="w-2/3 m-auto pb-5">
        <EmailInput
          v-model:input-value="loginForm.email"
          label="メールアドレス"
        />
      </div>
      <div class="w-2/3 m-auto pb-10">
        <PasswordInput
          v-model:input-value="loginForm.password"
          label="パスワード"
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
import { reactive } from 'vue';
import EmailInput from '../components/Common/EmailInput.vue';
import PasswordInput from '../components/Common/PasswordInput.vue';
import CustomButton from '../components/Common/CustomButton.vue';
import { LoginForm } from '../models/form/LoginForm';
import { useAuthorizationStore } from '../store/authorization';
import { useRouter } from 'vue-router'

const authorizationStore = useAuthorizationStore();
const router = useRouter();

const loginForm = reactive<LoginForm>({
  email: '',
  password: ''
});

/** 「ログイン」クリックイベント(ログイン処理をする) */
const login = async () => {
  await authorizationStore.fetchLogin(loginForm);
  if (authorizationStore.getAuthorization.jwt) {
    router.push("/reserveList");
  } else {
    alert("メールアドレスまたはパスワードが違います");
  }
}
</script>

<style>
</style>
