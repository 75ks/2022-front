<!--<template>-->
<!--  <div class="w-full h-full">-->
<!--    <p class="pb-10 text-center font-bold text-2xl">スタッフ登録サンプル</p>-->
<!--    <div-->
<!--      v-if="message.messageList.length"-->
<!--      class="pb-10 w-1/3 m-auto"-->
<!--      :class="message.messageType === MessageStatus.DANGER.code ? 'text-red-500' : 'text-green-500'"-->
<!--    >-->
<!--      <ul v-for="(mes, index) in message.messageList" :key="index">-->
<!--        <li>※{{ mes }}</li>-->
<!--      </ul>-->
<!--    </div>-->
<!--    <div class="w-1/3 m-auto">-->
<!--      <StoreName-->
<!--        v-model:select-value="registerForm.storeId"-->
<!--        :requiredFlg=true-->
<!--      />-->
<!--      <TextInput-->
<!--        v-model:input-value="registerForm.lastName"-->
<!--        label="姓"-->
<!--        :requiredFlg=true-->
<!--      />-->
<!--      <TextInput-->
<!--        v-model:input-value="registerForm.firstName"-->
<!--        label="名"-->
<!--        :requiredFlg=true-->
<!--      />-->
<!--      <TextInput-->
<!--        v-model:input-value="registerForm.lastNameKana"-->
<!--        label="セイ"-->
<!--        :requiredFlg=true-->
<!--      />-->
<!--      <TextInput-->
<!--        v-model:input-value="registerForm.firstNameKana"-->
<!--        label="メイ"-->
<!--        :requiredFlg=true-->
<!--      />-->
<!--      <Rank-->
<!--        v-model:select-value="registerForm.rank"-->
<!--        :requiredFlg=true-->
<!--      />-->
<!--      <Gender-->
<!--        v-model:select-value="registerForm.gender"-->
<!--        :requiredFlg=true-->
<!--      />-->
<!--      <EmailInput-->
<!--        v-model:input-value="registerForm.email"-->
<!--        label="メールアドレス"-->
<!--        :requiredFlg=true-->
<!--      />-->
<!--      <PasswordInput-->
<!--        v-model:input-value="registerForm.password"-->
<!--        label="パスワード"-->
<!--        :requiredFlg=true-->
<!--      />-->
<!--      <PasswordInput-->
<!--        v-model:input-value="passwordConfirmation"-->
<!--        label="パスワード（確認用）"-->
<!--        :requiredFlg=true-->
<!--      />-->
<!--      <CustomButton-->
<!--        class="w-full mt-16"-->
<!--        :button-name="'登録'"-->
<!--        :button-color-number=1-->
<!--        @click="register"-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import CustomButton from '../components/Common/CustomButton.vue';-->
<!--import TextInput from '../components/Common/TextInput.vue';-->
<!--import EmailInput from '../components/Common/EmailInput.vue';-->
<!--import PasswordInput from '../components/Common/PasswordInput.vue';-->
<!--import StoreName from '../components/SelectOptions/StoreName.vue';-->
<!--import Rank from '../components/SelectOptions/Rank.vue';-->
<!--import Gender from '../components/SelectOptions/Gender.vue';-->
<!--import { RegisterSampleForm } from '../models/form/RegisterSampleForm';-->
<!--import { MessageStatus } from '../constants/MessageStatus';-->
<!--import { reactive, ref, computed } from 'vue';-->
<!--import axios from '../plugins/axios';-->
<!--import { useMessageStore } from '../store/message';-->

<!--const messageStore = useMessageStore();-->

<!--const message = computed(() => {-->
<!--  return messageStore.getMessage;-->
<!--});-->

<!--/** スタッフ登録フォーム */-->
<!--const registerForm = reactive<RegisterSampleForm>({-->
<!--  storeId: '0',-->
<!--  lastName: '',-->
<!--  firstName: '',-->
<!--  lastNameKana: '',-->
<!--  firstNameKana: '',-->
<!--  rank: '指定なし',-->
<!--  gender: '指定なし',-->
<!--  email: '',-->
<!--  password: '',-->
<!--});-->
<!--/** パスワード確認用(リクエストに含めないため、スタッフ登録フォームと分離させている) */-->
<!--const passwordConfirmation = ref<string>('');-->

<!--/** 登録ボタンクリックイベント */-->
<!--const register = async () => {-->
<!--  if (registerForm.password === passwordConfirmation.value) {-->
<!--    // サンプルのため、Storeを作成せず直接APIを実行(本来はStuff用のStoreを作成する)-->
<!--    await axios.post("/sample/", registerForm);-->
<!--  } else {-->
<!--    alert('パスワードが一致しません');-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--</style>-->
