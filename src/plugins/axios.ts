import router from '../router/index';
import { MessageStatus } from '../constants/MessageStatus';
import axios from "axios";

const instance = axios.create();

// リクエスト送信前の共通処理
instance.interceptors.request.use(
  (config) => {
    console.log(config);
    config.baseURL = "http://localhost:3000/api";
    config.timeout = 5000;
    config.headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + "DUMMY_JWT_TOKEN"
    }
    return config;
  }
);

// レスポンス受信後の共通処理
instance.interceptors.response.use(
  (response) => {
    console.log(response);
    // if (response.status === 200 && response.data.messageList) {
    // }
    return response;
  },
  async (error) => {
    // if (error.response.status === 400 && error.response.data.messageList) {
    // } else if (error.response.status === 401) {
    //   console.log('ユーザー認証に失敗しました。再度ログインしてください', error);
    //   router.push('/signIn');
    // } else {
    //   console.log('API通信中にエラーが発生しました', error);
    // }
    return Promise.reject(error);
  }
);

export default instance;
