<template>
  <p
    v-if="isVisibleMessage"
    class="p-2 bg-green-500 text-white"
    :class="messageAnimationType == 1 ? 'animate-scale-in-ver-top' : messageAnimationType == 2 ? 'animate-scale-out-ver-top' : ''"
  >
    <span
      class="pr-2 cursor-pointer"
      @click="deleteSuccessMessage"
    >
      ×
    </span>
    {{ message.messageList[0] }}
  </p>
</template>

<script setup lang="ts">
import { useMessageStore } from '../../../store/message';
import { MessageStatus } from '../../../constants/MessageStatus';
import { computed, ref, watch } from 'vue';

const messageStore = useMessageStore();

const message = computed(() => {
  return messageStore.getMessage;
});

/** メッセージ表示フラグ */
const isVisibleMessage = ref<boolean>(false);
/** メッセージアニメーションタイプ(0: 初期値、1: 表示アニメーション付与、2: 非表示アニメーション付与) */
const messageAnimationType = ref<number>(0);

watch(message.value, (after, before) => {
  // 成功メッセージが存在する場合
  if (message.value.messageList.length && message.value.messageType === MessageStatus.SUCCESS.code) {
    if (messageAnimationType.value === 0) {
      isVisibleMessage.value = true;
    }
    messageAnimationType.value = 1;
  // メッセージが存在しない かつ 表示アニメーションが付与されている場合
  } else if (!message.value.messageList.length && messageAnimationType.value === 1) {
    messageAnimationType.value = 2;
  // 上記以外の場合
  } else {
    messageAnimationType.value = 0;
    isVisibleMessage.value = false;
  }
});

/** 「×」クリックイベント(成功メッセージを削除する) */
const deleteSuccessMessage = () => {
  messageStore.resetMessageList();
  messageStore.resetMessageType();
}
</script>

<style>
</style>
