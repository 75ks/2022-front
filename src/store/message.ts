import { defineStore } from 'pinia';
import { Message } from '../models/Message';

export const useMessageStore = defineStore({
  id: "message",
  state: () => ({
    message: new Message() as Message
  }),
  getters: {
    getMessage(state): Message {
      return state.message;
    },
  },
  actions: {
    addMessageList(array: string[]): void {
      this.resetMessageList();
      array.forEach(obj => {
        this.message.messageList.push(obj);
      });
    },
    addMessageType(obj: string): void {
      this.message.messageType = obj;
    },
    resetMessageList(): void {
      this.message.messageList.splice(0);
    }
  }
})
