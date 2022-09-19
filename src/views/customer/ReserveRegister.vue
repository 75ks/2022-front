<template>
  <div class="w-full">
    <Loading :is-loading="isLoading"/>
    <div class="w-2/3 m-auto p-8 mt-20 bg-white">
      <p class="pb-10 text-center font-bold text-2xl">予約</p>
      <p class="pb-10 m-auto text-center text-sm">◆予約情報を入力して「登録」ボタンをクリックしてください。</p>
      <div
        v-if="message.messageList.length"
        class="pb-10 w-1/3 m-auto"
        :class="message.messageType === MessageStatus.DANGER.code ? 'text-red-500' : 'text-green-500'"
      >
        <ul v-for="(mes, index) in message.messageList" :key="index">
          <li>※{{ mes }}</li>
        </ul>
      </div>
      <div class="flex flex-col justify-center items-center">
        <div class="w-2/3 pb-5">
          <SelectBoxWithLabel
            v-model:select-value="state.screenObj.stuffId"
            targetUrl="/selectOption/stuffs"
            :required-flg="true"
            label="スタッフ"
          />
        </div>
        <div class="w-2/3 pb-5">
          <SelectBoxWithLabel
            v-model:select-value="state.screenObj.menuId"
            targetUrl="/selectOption/menus"
            :required-flg="true"
            label="メニュー"
          />
        </div>
        <div class="w-2/3 pb-10">
          <DateTimePickerWithLabel
            v-model:inputValue='state.screenObj.reserveDateTime'
            :required-flg="true"
            label="予約日時"
          />
        </div>
        <div class="w-2/3">
          <CustomButton
            class="w-full"
            button-name="登録"
            :button-color-number="1"
            @click="register"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMessageStore } from '../../store/message';
import { useCustomerStore } from '../../store/customer';
import { MessageStatus } from '../../constants/MessageStatus';
import { ReserveRegisterScreenObj } from '../../models/screenObj/ReserveRegisterScreenObj';
import CustomButton from '../../components/Atoms/Button/CustomButton.vue';
import SelectBoxWithLabel from '../../components/Molecules/SelectBoxWithLabel.vue';
import DateTimePickerWithLabel from '../../components/Molecules/DateTimePickerWithLabel.vue';
import Loading from '../../components/Atoms/Layout/Loading.vue';

const messageStore = useMessageStore();
const customerStore = useCustomerStore();
const router = useRouter();

const message = computed(() => {
  return messageStore.getMessage;
});

interface State {
  screenObj: ReserveRegisterScreenObj;
}

const state = reactive<State>({
  screenObj: new ReserveRegisterScreenObj(),
});

/** ローティングフラグ */
const isLoading = ref<boolean>(false);

/** 登録ボタンクリックイベント */
const register = async (): Promise<void> => {
  try {
    isLoading.value = !isLoading.value;
    await customerStore.reserveRegister(state.screenObj);
    router.push("/customer/profile");
  } catch (error) {
    isLoading.value = !isLoading.value;
  }
};
</script>

<style>
</style>
