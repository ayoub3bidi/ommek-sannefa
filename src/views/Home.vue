<template>
  <div class="home">
    <recipePost :post="welcomeScreen"/>
    <recipePost :post="post" v-for="(post, index) in sampleRecipePost" :key="index"/>
    <div class="card-wrap">
      <div class="container">
        <h3>View More Recent Posts</h3>
        <div class="cards">
          <recipeCard :post="post" v-for="(post, index) in sampleRecipeCards" :key="index"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import recipePost from '../components/recipePost.vue'
import recipeCard from '../components/recipeCard.vue'

export default {
  name: "Home",
  components: {recipePost, recipeCard},
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
      sampleRecipeCards: [
        { recipeTitle: "Bachkoutou", cover: "https://www.tunisienumerique.com/wp-content/uploads/2020/04/Biscuit-tunisien-%C2%ABBachkoutou%C2%BB-1200x1161.png", date: "March 23, 2022"  },
        { recipeTitle: "Ma9roudh", cover: "https://sp-ao.shortpixel.ai/client/q_lqip,ret_wait/https://howto-cook.net/wp-content/uploads/2020/05/makroudh-recipe-for-beginners-780x517.png", date: "March 24, 2022"  },
        { recipeTitle: "Debla", cover: "https://upload.wikimedia.org/wikipedia/commons/2/24/Oreilles_de_juge.jpg", date: "March 25, 2022"  },
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
.card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
</style>
