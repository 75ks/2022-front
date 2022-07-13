import * as vueRouter from "vue-router";
import Test from '../views/Test.vue';
import ComponentsSample from '../views/ComponentsSample.vue';
import ReserveList from '../views/ReserveList.vue';
import Login from '../views/Login.vue';
import RegisterSample from '../views/RegisterSample.vue';
import RegisterSampleRev from '../views/RegisterSampleRev.vue';
import { MessageStatus } from "../constants/MessageStatus";
import { useAuthorizationStore } from '../store/authorization';
import { useMessageStore } from "../store/message";

const routes = [
  {
    path: "/",
    component: Test,
  },
  {
    path: "/componentsSample",
    component: ComponentsSample,
  },
  {
    path: "/reserveList",
    component: ReserveList,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/registerSample",
    component: RegisterSample,
  },
  {
    path: "/registerSampleRev",
    component: RegisterSampleRev,
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    useMessageStore().resetMessageList();
    useMessageStore().resetMessageType();
    next();
  } else {
    if (useAuthorizationStore().getAuthorization.jwt) {
      useMessageStore().resetMessageList();
      useMessageStore().resetMessageType();
      next();
    } else {
      next("/login");
    }
  }
});

export default router;
