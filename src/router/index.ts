import * as vueRouter from "vue-router";
import Test from '../views/Test.vue';

const routes = [
  {
    path: "/",
    component: Test,
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;
