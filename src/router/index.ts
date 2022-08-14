import * as vueRouter from "vue-router";
import Test from '../views/Test.vue';
import ComponentsSample from '../views/ComponentsSample.vue';
import ReserveList from '../views/ReserveList.vue';
import ReserveListCalender from '../views/ReserveListCalendar.vue';
import Login from '../views/Login.vue';
import RegisterSample from '../views/RegisterSample.vue';
import RegisterSampleRev from '../views/RegisterSampleRev.vue';
import CustomerLogin from '../views/CustomerLogin.vue';
import { useAuthorizationStore } from '../store/authorization';
import { useMessageStore } from "../store/message";
import { MessageStatus } from "../constants/MessageStatus";
import AdministratorReserve from "../views/AdministratorReserve.vue";

const routes = [
  {
    path: "/",
    component: Test,
  },
  {
    path: "/componentsSample",
    component: ComponentsSample,
    meta: { requiredAuth: true }
  },
  {
    path: "/reserveList",
    component: ReserveList,
    meta: { requiredAuth: true }
  },
  {
    path: "/reserveListCalendar",
    component: ReserveListCalender,
    meta: { requiredAuth: true }
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/customerLogin",
    component: CustomerLogin,
  },
  {
    path: "/registerSample",
    component: RegisterSample,
    meta: { requiredAuth: true }
  },
  {
    path: "/registerSampleRev",
    component: RegisterSampleRev,
    meta: { requiredAuth: true }
  },
  {
    path: "/AdministratorReserve",
    component: AdministratorReserve,
    meta: { requiredAuth: true }
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    useMessageStore().resetMessageList();
    useMessageStore().resetMessageType();
    if (useAuthorizationStore().getAuthorization.jwt) {
      next();
    } else {
      useMessageStore().addMessageList(["認証に失敗しました。再度ログインしてください。"]);
      useMessageStore().addMessageType(MessageStatus.WARNING.code!);
      next("/login");
    } 
  } else {
    next();
  }
});

export default router;
