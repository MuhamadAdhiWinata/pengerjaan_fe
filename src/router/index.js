import { createRouter, createWebHistory } from "vue-router";
import Layout from "../components/Layout.vue";
import LoginView from "../views/LoginView.vue";
import SoalView from "../views/SoalView.vue";
import Home from "../views/home.vue";
import PageSementara from "../components/PageSementara.vue";
import DummySoalVue from "../views/DummySoal.vue";
import FinishedPage from "../components/home/FinishedPage.vue";
import ExpiredPage from "../components/home/ExpiredPage.vue";

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
      {
        path: "finish",
        name: "finish",
        component: FinishedPage,
      },
      {
        path: "expired",
        name: "expired",
        component: ExpiredPage,
      },
    ],
  },
  {
    path: "/soal",
    name: "Soal",
    component: SoalView,
  },
  {
    path: "/dummy",
    name: "dummy",
    component: DummySoalVue,
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

// --- Navigation Guard ---
router.beforeEach((to, from, next) => {
  // contoh: cek token di localStorage
  const isLoggedIn = !!localStorage.getItem("token");

  if (to.path === "/") {
    if (isLoggedIn) {
      next("/home");
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
