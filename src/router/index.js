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
import ViewRecipe from "../views/ViewRecipe.vue";
import EditRecipe from "../views/EditRecipe.vue";
import firebase from "firebase/app"
import "firebase/auth"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: false
    }
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: Recipes,
    meta: {
      title: 'Recipes',
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: 'Register',
      requiresAuth: false
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
      requiresAuth: false
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    meta: {
      title: 'Profile',
      requiresAuth: true
    }
  },
  {
    path: "/create-recipe",
    name: "CreateRecipe",
    component: CreateRecipe,
    meta: {
      title: 'Create Recipe',
      requiresAuth: true
    }
  },
  {
    path:"/recipe-preview",
    name:"RecipePreview",
    component:RecipePreview,
    meta:{
      title:"Recipe Preview",
      requiresAuth: true
    },
  },
  {
    path:"/view-recipe/:recipeid",
    name:"ViewRecipe",
    component:ViewRecipe,
    meta:{
      title:"View Recipe",
      requiresAuth: false
    },
  },
  {
    path:"/edit-recipe/:recipeid",
    name:"EditRecipe",
    component:EditRecipe,
    meta:{
      title:"Edit Recipe",
      requiresAuth: true
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

router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        return next({ name: "Home" });
      }
      return next();
    }
    return next({ name: "Home" });
  }
  return next()
})

export default router;
