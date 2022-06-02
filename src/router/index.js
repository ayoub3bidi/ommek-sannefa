import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Recipes from "../views/Recipes.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue"; 
import ForgotPassword from "../views/ForgotPassword.vue";
import ProfileView from "../views/ProfileView.vue";
// import AdminView from "../views/AdminView.vue";
import CreateRecipe from "../views/CreateRecipe.vue";
import RecipePreview from "../views/RecipePreview.vue";

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
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: 'Register'
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password'
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: "/create-recipe",
    name: "CreateRecipe",
    component: CreateRecipe,
    meta: {
      title: 'Create Recipe'
    }
  },
  {
    path:"/recipe-preview",
    name:"RecipePreview",
    component:RecipePreview,
    meta:{
      title:"Create Recipie",
  },
  }
  // {
  //   path: "/admin",
  //   name: "Admin",
  //   component: AdminView,
  //   meta: {
  //     title: 'Admin'
  //   }
  // },
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
