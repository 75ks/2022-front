<template>
  <div class="w-full mt-12 md:mt-0">
    <Loading :is-loading="isLoading"/>
    <div class="w-full m-auto py-8 bg-white">
      <p class="pb-10 text-center font-bold text-2xl">予約</p>
      <p class="pb-2 m-auto text-center text-sm">◆予約情報を入力して「登録」ボタンをクリックしてください。</p>
      <p class="pb-10 m-auto text-center text-sm">※スタッフを選択すると、メニューが選択可能になります。</p>
      <div
        v-if="message.messageList.length && message.messageType !== MessageStatus.SUCCESS.code"
        class="pb-10 w-1/3 m-auto text-red-500"
      >
        <ul v-for="(mes, index) in message.messageList" :key="index">
          <li>※{{ mes }}</li>
        </ul>
      </div>
      <div class="mx-6 flex flex-col justify-center items-center">
        <div class="w-full pb-5">
          <SelectBoxWithLabel
            v-model:select-value="state.screenObj.stuffId"
            targetUrl="/selectOption/stuffs"
            :required-flg="true"
            label="スタッフ"
          />
        </div>
        <div class="w-full pb-5">
          <SelectBoxWithLabel
            v-model:select-value="state.screenObj.menuId"
            :targetUrl="targetUrl"
            :required-flg="true"
            :disable-flg="selectOptionMenuDisableFlg"
            label="メニュー"
          />
        </div>
        <div class="w-full pb-10">
          <DateTimePickerWithLabel
            v-model:inputValue='state.screenObj.reserveDateTime'
            :required-flg="true"
            label="予約日時"
          />
        </div>
        <div class="w-full">
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
import axios from '../../plugins/axios';
import { computed, reactive, ref, watch, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useMessageStore } from '../../store/message';
import { useReserveStore } from '../../store/reserve';
import { MessageStatus } from '../../constants/MessageStatus';
import { ReserveRegisterScreenObj } from '../../models/screenObj/ReserveRegisterScreenObj';
import CustomButton from '../../components/Atoms/Button/CustomButton.vue';
import SelectBoxWithLabel from '../../components/Molecules/SelectBoxWithLabel.vue';
import DateTimePickerWithLabel from '../../components/Molecules/DateTimePickerWithLabel.vue';
import Loading from '../../components/Atoms/Layout/Loading.vue';

const messageStore = useMessageStore();
const reserveStore = useReserveStore();
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

const { stuffId } = toRefs(state.screenObj);
const targetUrl = ref<string>("");

// メニュープルダウン非活性フラグ(true: 非活性、false: 活性)
const selectOptionMenuDisableFlg = ref<boolean>(true);

/** ローティングフラグ */
const isLoading = ref<boolean>(false);

watch(stuffId, async (after, before) => {
  if (stuffId.value) {
    // スタッフIDをキーにランクIDを取得
    const { data } = await axios.get("/reserveRegister/?stuffId=" + stuffId.value);
    // メニュープルダウンのURLを生成
    targetUrl.value = "/selectOption/menuPrice?rankId=" + data;
    selectOptionMenuDisableFlg.value = false;
  } else {
    targetUrl.value = "";
    state.screenObj.menuId = null;
    selectOptionMenuDisableFlg.value = true;
  }
});

/** 登録ボタンクリックイベント */
const register = async (): Promise<void> => {
  try {
    isLoading.value = !isLoading.value;
    await reserveStore.registerByCustomer(state.screenObj);
    // プロフィール画面に遷移
    router.push("/customer/profile");
  } catch (error) {
  } finally {
    isLoading.value = !isLoading.value;
  }
};
</script>

<style>
</style>
