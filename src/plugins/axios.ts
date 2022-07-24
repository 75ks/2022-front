import router from '../router/index';
import { MessageStatus } from '../constants/MessageStatus';
import { useAuthorizationStore } from '../store/authorization';
import { useMessageStore } from '../store/message';
import axios from "axios";

const instance = axios.create();

// リクエスト送信前の共通処理
instance.interceptors.request.use(
  (config) => {
    config.baseURL = "http://localhost:3000/api";
    config.headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + useAuthorizationStore().getAuthorization.jwt
    }
    return config;
  }
);

// レスポンス受信後の共通処理
instance.interceptors.response.use(
  (response) => {
    // レスポンスにメッセージが存在する場合、メッセージを設定する
    if (response.data.messageList) {
      useMessageStore().addMessageList(response.data.messageList);
      // ステータスが200の場合、ステータスに「成功」を設定する
      if (response.status === 200) {
        useMessageStore().addMessageType(MessageStatus.SUCCESS.code!);
      }
    }
    return response;
  },
  async (error) => {
    // レスポンスにメッセージが存在する場合、メッセージと、ステータスに「失敗」を設定する
    if (error.response.data.messageList) {
      useMessageStore().addMessageList(error.response.data.messageList);
      useMessageStore().addMessageType(MessageStatus.DANGER.code!);
    } 
    // ステータスが401の場合、ログイン画面に遷移する
    if (error.response.status === 401) {
      useMessageStore().addMessageType(MessageStatus.WARNING.code!);
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default instance;
