<template>
  <div class="home">
    <recipePost v-if="!user" :post="welcomeScreen"/>
    <recipePost :post="post" v-for="(post, index) in recipePostsFeed" :key="index"/>
    <div class="card-wrap">
      <div class="container">
        <h3>View More Recent Posts</h3>
        <div class="cards">
          <recipeCard :post="post" v-for="(post, index) in recipePostsCards" :key="index"/>
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
          "New recipe everyday. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "candy",
      },
    };
  },
  computed: {
    recipePostsFeed() {
      return this.$store.getters.recipePostsFeed;
    },
    recipePostsCards() {
      return this.$store.getters.recipePostsCards;
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
