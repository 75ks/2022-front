import * as vueRouter from "vue-router";
import Test from '../views/Test.vue';
import ComponentsSample from '../views/ComponentsSample.vue';
import ReserveList from '../views/ReserveList.vue';
import CustomerCreate from '../views/CustomerCreate.vue';
import Login from '../views/Login.vue';
import RegisterSample from '../views/RegisterSample.vue';
import RegisterSampleRev from '../views/RegisterSampleRev.vue';

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
    path: "/customerCreate",
    component: CustomerCreate,
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

export default router;
