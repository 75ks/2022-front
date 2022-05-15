import * as vueRouter from "vue-router";
import Test from '../views/Test.vue';
import ReserveList from '../views/ReserveList.vue';

const routes = [
  {
    path: "/",
    component: Test,
  },
  {
    path: "/reserveList",
    component: ReserveList,
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;
