import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import Anime from "@/views/Anime.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/anime",
    name: "anime",
    component: Anime,
    props: function castProps(route) {
      return {
        id: Number(route.query.id)
      };
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
