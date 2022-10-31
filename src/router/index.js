import Blogger from "../components/Blogger.vue";
import Login from "../components/Login.vue";
import VueRouter from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Blogger",
    component: Blogger,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to) => {
  if (!store.state.isLoggedIn && to.name !== "Login") {
    return { name: "Login" };
  }
});

export default router;
