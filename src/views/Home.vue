<template>
  <div class="home">
    <recipePost v-if="!user" :post="welcomeScreen"/>
    <recipePost :post="post" v-for="(post, index) in sampleRecipePost" :key="index"/>
    <div class="card-wrap">
      <div class="container">
        <h3>View More Recent Posts</h3>
        <div class="cards">
          <recipeCard :post="post" v-for="(post, index) in sampleRecipeCards" :key="index"/>
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" to="#">
          Register <Arrow class="arrow arrow-light"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import recipePost from '../components/recipePost.vue'
import recipeCard from '../components/recipeCard.vue'
import Arrow from "../assets/Icons/arrow-right-light.svg"

export default {
  name: "Home",
  components: {recipePost, recipeCard, Arrow},
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
  computed: {
    sampleRecipeCards() {
      return this.$store.state.sampleRecipeCards
    },
    user() {
      return this.$store.state.user
    },
  }
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
.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
