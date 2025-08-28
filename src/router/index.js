import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/Layout.vue";
import LoginView from "../views/LoginView.vue";
import SoalView from "../views/soalView.vue";
import Home from "../views/home.vue";
import PageSementara from "../components/PageSementara.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
      },
      {
        path: "page",
        name: "page",
        component: PageSementara,
      },
    ],
  },
  {
    path: "/soal",
    name: "Soal",
    component: SoalView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
