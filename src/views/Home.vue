<template>
  <div class="home">
    <recipePost :post="welcomeScreen"/>
    <recipePost :post="post" v-for="(post, index) in sampleRecipePost" :key="index"/>
  </div>
</template>

<script>
import recipePost from '../components/recipePost.vue'

export default {
  name: "Home",
  components: {recipePost},
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        recipePost:
          "New recipe every friday. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "candy",
      },
      sampleRecipePost: [
        {
          recipeTitle: "test1",
          recipeHTML: "qsdmfkmqsdl",
          cover: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVza3RvcCUyMGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        },
        {
          recipeTitle: "test2",
          recipeHTML: "qsdmfkmqsdl",
          cover: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVza3RvcCUyMGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
        },
      ],
    };
  },
};
</script>
