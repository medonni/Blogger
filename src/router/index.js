import { createRouter, createWebHashHistory } from "vue-router";

import Admin from "../components/Admin.vue";
import Blogger from "../components/Blogger.vue";
import Login from "../components/Login.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Blogger",
    component: Blogger,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to) => {
  if (!store.state.isLoggedIn && to.name !== "Login") {
    return { name: "Login" };
  }
  if (!store.state.isLoggedIn && !store.state.isAdmin && to.name !== "Login") {
    return { name: "Login" };
  }
});

export default router;
