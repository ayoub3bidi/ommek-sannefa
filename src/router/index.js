import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Recipes from "../views/Recipes.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: Recipes,
    meta: {
      title: 'Recipes'
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Ommek Sannefa`
  next()
})

export default router;
