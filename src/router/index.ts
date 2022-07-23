import * as vueRouter from "vue-router";
import Test from '../views/Test.vue';
import ComponentsSample from '../views/ComponentsSample.vue';
import ReserveList from '../views/ReserveList.vue';
import Login from '../views/Login.vue';
import RegisterSample from '../views/RegisterSample.vue';
import RegisterSampleRev from '../views/RegisterSampleRev.vue';
import { useAuthorizationStore } from '../store/authorization';
import { useMessageStore } from "../store/message";

const routes = [
  {
    path: "/",
    component: Test,
    meta: { requiredAuth: true }
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
    path: "/login",
    component: Login,
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
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  useMessageStore().resetMessageList();
  useMessageStore().resetMessageType();
  if (to.matched.some(record => record.meta.requiredAuth)) {
    useAuthorizationStore().getAuthorization.jwt ? next() : next("/login");
  }
  next();
});

export default router;
