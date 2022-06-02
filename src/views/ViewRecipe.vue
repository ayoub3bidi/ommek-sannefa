<template>
  <div class="post-view" v-if="currentRecipe">
    <div class="container quillWrapper">
      <h2>{{ this.currentRecipe[0].recipeTitle }}</h2>
      <h4>Posted on: {{ new Date(this.currentRecipe[0].recipeDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
      <img :src="this.currentRecipe[0].recipeCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="this.currentRecipe[0].recipeHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewRecipe",
  data() {
    return {
      currentRecipe: null,
    };
  },
  async mounted() {
    this.currentRecipe = await this.$store.state.recipePosts.filter((post) => {
      return post.recipeID === this.$route.params.recipeid;
    });
  },
};
</script>

<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>