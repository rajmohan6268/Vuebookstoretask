import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";

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
  // console.log(to, from, "from router ");
  next();
});

export default router;
