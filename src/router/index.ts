import * as vueRouter from "vue-router";
import Test from '../views/Test.vue';
import ReserveList from '../views/ReserveList.vue';
import CustomerCreate from '../views/CustomerCreate.vue';
import Todo from '../views/Todo.vue';

const routes = [
  {
    path: "/",
    component: Test,
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
    path: "/todo",
    component: Todo,
  },
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes,
});

export default router;
