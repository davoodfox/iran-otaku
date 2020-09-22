import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import List from "@/views/List.vue";
import Anime from "@/views/Anime.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/list",
    name: "list",
    component: List
  },
  {
    path: "/anime",
    name: "anime",
    component: Anime
  }
];

const router = new VueRouter({
  routes
});

export default router;
