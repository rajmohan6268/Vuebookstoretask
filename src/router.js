import { createWebHistory, createRouter } from "vue-router";

import Login from "@/views/Login.vue";
import HelloWorld from "@/components/HelloWorld.vue";
const NotFound = () => import('@/components/NotFound.vue')

const routes = [
  {
    path: "/",
    name: "home",
    component: HelloWorld,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to, from, "from router ");
  next();
});

export default router;
