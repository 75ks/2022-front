import * as vueRouter from "vue-router";
// スタッフ用
import Test from "../views/Test.vue";
import ComponentsSample from "../views/ComponentsSample.vue";
import ReserveList from "../views/ReserveList.vue";
import CustomerCreate from "../views/CustomerCreate.vue";
import ReserveListCalender from "../views/ReserveListCalendar.vue";
import Login from "../views/Login.vue";
import RegisterSample from "../views/RegisterSample.vue";
import RegisterSampleRev from "../views/RegisterSampleRev.vue";
import StuffList from '../views/StuffList.vue';
import CustomerList from '../views/CustomerList.vue';
import  MenuManagement  from "../views/MenuManagement.vue";
import  MenuRegister  from "../views/MenuRegister.vue";
import CustomerDetail from "../views/CustomerDetail.vue";
import SalesTotal from '../views/SalesTotal.vue';
import StuffCreate from '../views/StuffCreate.vue';
import StuffDetail from '../views/StuffDetail.vue';
// 顧客用
import CustomerLogin from "../views/customer/CustomerLogin.vue";
import Profile from "../views/customer/Profile.vue";
import PasswordSetting from "../views/customer/PasswordSetting.vue";
import ReserveRegister from "../views/customer/ReserveRegister.vue";
import CustomerHome from "../views/customer/CustomerHome.vue";
// 上記以外
import NotFound from '../views/NotFound.vue';

import { useAuthorizationStore } from "../store/authorization";
import { useCustomerAuthorizationStore } from "../store/customerAuthorization";
import { useMessageStore } from "../store/message";
import { MessageStatus } from "../constants/MessageStatus";

const routes = [
  // スタッフ用画面
  { path: "/", component: Test },
  { path: "/componentsSample", component: ComponentsSample, meta: { requiredAuth: true } },
  { path: "/reserveList", component: ReserveList, meta: { requiredAuth: true } },
  { path: "/customerCreate", component: CustomerCreate, meta: { requiredAuth: true } },
  { path: "/reserveListCalendar", component: ReserveListCalender, meta: { requiredAuth: true } },
  { path: "/login", component: Login },
  { path: "/registerSample", component: RegisterSample, meta: { requiredAuth: true } },
  { path: "/registerSampleRev", component: RegisterSampleRev, meta: { requiredAuth: true } },
  { path: "/stuffList", component: StuffList, meta: { requiredAuth: true } },
  { path: "/customerList", component: CustomerList },
  { path: "/menuManagement", component: MenuManagement, meta: { requiredAuth: true }},
  { path: "/menuRegister", component: MenuRegister, meta: { requiredAuth: true }},

  { path: "/customerList", component: CustomerList, meta: { requiredAuth: true } },
  { path: "/customerDetail/:customerId", component: CustomerDetail, meta: { requiredAuth: true } },
  { path: "/salesTotal", component: SalesTotal, meta: { requiredAuth: true } },
  { path: "/stuffCreate", component: StuffCreate, meta: { requiredAuth: true } },
  { path: "/stuffDetail/:stuffId", component: StuffDetail, meta: { requiredAuth: true } },
  // 顧客用画面
  { path: "/customer/login", component: CustomerLogin },
  { path: "/customer/profile", component: Profile, meta: { requiredAuthCustomer: true } },
  { path: "/customer/passwordSetting", component: PasswordSetting, meta: { requiredAuthCustomer: true } },
  { path: "/customer/reserveRegister", component: ReserveRegister, meta: { requiredAuthCustomer: true } },
  { path: "/customer/home", component: CustomerHome, meta: { requiredAuthCustomer: true } },
  // 上記以外
  { path: "/:catchAll(.*)", name: "NotFound", component: NotFound },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (useMessageStore().getMessage.messageList && useMessageStore().getMessage.messageType !== MessageStatus.SUCCESS.code) {
      useMessageStore().resetMessageList();
      useMessageStore().resetMessageType();
    }
    if (useAuthorizationStore().getAuthorization.jwt) {
      next();
    } else {
      useMessageStore().addMessageList(["認証に失敗しました。再度ログインしてください。"]);
      useMessageStore().addMessageType(MessageStatus.WARNING.code!);
      next("/login");
    }
  } else if (to.matched.some(record => record.meta.requiredAuthCustomer)) {
    if (useMessageStore().getMessage.messageList && useMessageStore().getMessage.messageType !== MessageStatus.SUCCESS.code) {
      useMessageStore().resetMessageList();
      useMessageStore().resetMessageType();
    }
    if (useCustomerAuthorizationStore().getAuthorization.jwt) {
      next();
    } else {
      useMessageStore().addMessageList(["認証に失敗しました。再度ログインしてください。"]);
      useMessageStore().addMessageType(MessageStatus.WARNING.code!);
      next("/customer/login");
    }
  } else {
    next();
  }
});

export default router;
