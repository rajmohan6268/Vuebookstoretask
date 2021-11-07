import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import store from "./store";

const Login = () => import("@/views/Login.vue");
const Register = () => import("@/views/Register.vue");
const NotFound = () => import("@/components/NotFound.vue");
const Dashboard = () => import("@/views/Dashboard.vue");

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
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/register",
    name: "register",
    component: Register,
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
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const islogedin = store.getters["auth/islogedin"];

    console.log(islogedin);
    if (islogedin) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
