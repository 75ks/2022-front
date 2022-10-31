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
        v-if="message.messageList.length && message.messageType !== MessageStatus.SUCCESS.code"
        class="pb-10 w-1/3 m-auto text-red-500"
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
          :disable-flg="isVisited"
        />
      </div>
      <div class="w-1/2">
        <SelectBoxWithLabel
          v-model:select-value="state.screenObj.stuffId"
          targetUrl="/selectOption/stuffs"
          label="スタッフ"
          :disable-flg="isVisited"
        />
      </div>
      <div class="w-1/2">
        <SelectBoxWithLabel
          v-model:select-value="state.screenObj.menuId"
          targetUrl="/selectOption/menus"
          label="メニュー"
          :disable-flg="isVisited"
        />
      </div>
      <div class="w-1/2">
        <DateTimePickerWithLabel
          v-model:inputValue='state.screenObj.reserveDateTime'
          label="予約日時"
          :disable-flg="isVisited"
        />
      </div>
      <div class="w-1/2">
        <SelectBoxWithLabel
          v-model:select-value='state.screenObj.reserveState'
          targetUrl="/selectOption/reserveStates"
          label="予約状態"
          :disable-flg="isVisited"
        />
      </div>
      <div class="w-1/2 flex justify-around items-center">
        <div class="mt-4">
          <CustomButton
            button-name="更新"
            :button-color-number="isVisited ? 0 : 1"
            :disable-flg="isVisited"
            @click="updateReserve()"
          />
        </div>
        <div class="mt-4">
          <CustomButton
            button-name="削除"
            :button-color-number="isVisited ? 0 : 2"
            :disable-flg="isVisited"
            @click="deleteReserve()"
          />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import moment from 'moment';
import _ from 'lodash';
import CustomButton from '../../Atoms/Button/CustomButton.vue';
import { reactive, computed, toRefs, watchEffect } from 'vue';
import { EditModalScreenObj } from '../../../models/screenObj/EditModalScreenObj';
import DateTimePickerWithLabel from '../../Molecules/DateTimePickerWithLabel.vue';
import SelectBoxWithLabel from '../../Molecules/SelectBoxWithLabel.vue';
import { MessageStatus } from '../../../constants/MessageStatus';
import { useMessageStore } from '../../../store/message';
import { useReserveStore } from '../../../store/reserve';
import { Reserve } from '../../../models/Reserve';

const reserveStore = useReserveStore();
const messageStore = useMessageStore();

const message = computed(() => {
  return messageStore.getMessage;
});

interface Props {
  /** モーダル表示フラグ */
  isVisibleModal: boolean;
  /** 選択予約情報 */
  selectReserve: Reserve;
}

interface Emits {
  (e: 'closeModal'): void;
}

interface State {
  screenObj: EditModalScreenObj;
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const state = reactive<State>({
  screenObj: new EditModalScreenObj()
});

const { selectReserve } = toRefs(props);

const isVisited = computed<boolean>(() => {
  return selectReserve.value.salesHistoryId !== null;
});

watchEffect(() => {
  if (selectReserve.value.reserveHistoryId) {
    state.screenObj.reserveHistoryId = selectReserve.value.reserveHistoryId;
  }
  if (selectReserve.value.customerId) {
    state.screenObj.customerId = selectReserve.value.customerId;
  }
  if (selectReserve.value.stuffId) {
    state.screenObj.stuffId = selectReserve.value.stuffId;
  }
  if (selectReserve.value.menuId) {
    state.screenObj.menuId = selectReserve.value.menuId;
  }
  if (selectReserve.value.reserveDatetime) {
    state.screenObj.reserveDateTime = moment(selectReserve.value.reserveDatetime).subtract(9, "hours").format("YYYY-MM-DD HH:mm");
  }
  if (selectReserve.value.reserveState) {
    state.screenObj.reserveState = selectReserve.value.reserveState;
  }
});

/** 更新ボタンクリックイベント */
const updateReserve = async (): Promise<void> => {
  if (!isVisited.value) {
    await reserveStore.update(state.screenObj);
    reserveStore.fetchReserves();
    if (messageStore.getMessage.messageList && messageStore.getMessage.messageType !== MessageStatus.SUCCESS.code) {
      messageStore.resetMessageList();
      messageStore.resetMessageType();
    }
    closeModal();
  }
}

/** 削除ボタンクリックイベント */
const deleteReserve = async (): Promise<void> => {
  if (!isVisited.value) {
    let checkDeleteFlg = window.confirm('予約情報を削除してもよろしいですか？');
    if (checkDeleteFlg) {
      await reserveStore.delete(state.screenObj);
      reserveStore.fetchReserves();
      if (messageStore.getMessage.messageList && messageStore.getMessage.messageType !== MessageStatus.SUCCESS.code) {
        messageStore.resetMessageList();
        messageStore.resetMessageType();
      }
    }
    closeModal();
  }
}

/** モーダル✖︎ボタンクリックイベント */
const closeModal = (): void => {
  Object.assign(state.screenObj, new EditModalScreenObj());
  emits("closeModal");
}
</script>

<style>
  #modal-content {
    transform: translate(-50%, -50%);
  }
</style>
