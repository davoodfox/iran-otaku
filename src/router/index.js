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
    path: "/anime/:id",
    name: "anime",
    component: Anime,
    props: function castProps(route) {
      return {
        id: Number(route.params.id)
      };
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
