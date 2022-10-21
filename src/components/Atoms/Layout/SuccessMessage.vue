<template>
  <p
    v-if="message.messageList && message.messageType === MessageStatus.SUCCESS.code"
    class="p-2 bg-green-500 text-white"
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
import { computed } from 'vue';

const messageStore = useMessageStore();

const message = computed(() => {
  return messageStore.getMessage;
});

/** 「×」クリックイベント(成功メッセージを削除する) */
const deleteSuccessMessage = () => {
  messageStore.resetMessageList();
  messageStore.resetMessageType();
}
</script>

<style>
</style>
