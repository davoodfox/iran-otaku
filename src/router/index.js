import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue";
import List from "@/views/List.vue";
import Anime from "@/views/Anime.vue";
import NotFound from "@/views/NotFound.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/search",
    name: "search",
    component: Search
  },
  {
    path: "/list",
    name: "list",
    component: List
  },
  {
    path: "/anime/:id",
    name: "anime",
    component: Anime,
    props: function castProps(route) {
      return {
        id: Number(route.params.id)
      };
    }
  },
  {
    path: "/404",
    name: "404",
    component: NotFound
  },
  {
    path: "*",
    redirect: { name: "404" }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
