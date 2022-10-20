<template>
  <teleport to="body">
    <div
      v-show="isVisibleModal"
      @click="closeModal()"
      class="fixed inset-0 bg-slate-700 opacity-75 flex items-center justify-center z-50"
    >
    </div>
    <div
      v-show="isVisibleModal"
      class="w-1/2 fixed top-1/2 left-1/2 bg-white flex flex-col items-center justify-center h-auto rounded px-5 pb-5 pt-2 z-50"
      id="modal-content"
    >
      <div class="w-full flex items-center justify-end">
        <p
          @click="closeModal()"
          class="cursor-pointer"
        >
          ✖︎
        </p>
      </div>
      <div 
        v-if="message.messageList.length"
        class="pb-10 w-1/3 m-auto"
        :class="message.messageType === MessageStatus.DANGER.code ? 'text-red-500' : 'text-green-500'"
      >
        <ul v-for="(mes, index) in message.messageList" :key="index">
          <li>※{{ mes }}</li>
        </ul>
      </div>
      <div class="w-1/2">
        <SelectBoxWithLabel
          v-model:select-value="state.screenObj.customerId"
          targetUrl="/selectOption/customers"
          label="顧客"
        />
      </div>
      <div class="w-1/2">
        <SelectBoxWithLabel
          v-model:select-value="state.screenObj.stuffId"
          targetUrl="/selectOption/stuffs"
          label="スタッフ"
        />
      </div>
      <div class="w-1/2">
        <SelectBoxWithLabel
          v-model:select-value="state.screenObj.menuId"
          targetUrl="/selectOption/menus"
          label="メニュー"
        />
      </div>
      <div class="w-1/2">
        <DateTimePickerWithLabel
          v-model:inputValue='state.screenObj.reserveDateTime'
          label="予約日時"
        />
      </div>
      <div class="mt-4">
        <CustomButton
          button-name="登録"
          :button-color-number="1"
          @click="registerReserve()"
        />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import _ from 'lodash';
import CustomButton from '../../Atoms/Button/CustomButton.vue';
import { reactive, computed, toRefs, watchEffect } from 'vue';
import { RegisterModalScreenObj } from '../../../models/screenObj/RegisterModalScreenObj';
import DateTimePickerWithLabel from '../../Molecules/DateTimePickerWithLabel.vue';
import SelectBoxWithLabel from '../../Molecules/SelectBoxWithLabel.vue';
import { MessageStatus } from '../../../constants/MessageStatus';
import { useMessageStore } from '../../../store/message';
import { useReserveStore } from '../../../store/reserve';

const reserveStore = useReserveStore();
const messageStore = useMessageStore();

const message = computed(() => {
  return messageStore.getMessage;
});

interface Props {
  /** モーダル表示フラグ */
  isVisibleModal: boolean;
  /** 選択予約日時 */
  selectDateTime: string;
}

interface Emits {
  (e: 'closeModal'): void;
}

interface State {
  screenObj: RegisterModalScreenObj;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const state = reactive<State>({
  screenObj: new RegisterModalScreenObj()
});

const { selectDateTime } = toRefs(props);

watchEffect(() => {
  if (selectDateTime.value) {
    // モーダル項目にコピー
    state.screenObj.reserveDateTime = selectDateTime.value;
  }
});

/** 登録ボタンクリックイベント */
const registerReserve = async (): Promise<void> => {
  await reserveStore.register(state.screenObj);
  reserveStore.fetchReserves();
  if (messageStore.getMessage.messageList && messageStore.getMessage.messageType !== MessageStatus.SUCCESS.code) {
    messageStore.resetMessageList();
    messageStore.resetMessageType();
  }
  closeModal();
}

/** モーダル✖︎ボタンクリックイベント */
const closeModal = (): void => {
  Object.assign(state.screenObj, new RegisterModalScreenObj());
  emits("closeModal");
}
</script>

<style>
  #modal-content {
    transform: translate(-50%, -50%);
  }
</style>
