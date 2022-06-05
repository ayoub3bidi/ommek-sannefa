<template>
  <div class="post-view">
    <div style="padding-left: 15px">
      <button @click="$router.go(-1)">← Go Back</button>
    </div>
    <div class="container quillWrapper">
      <h2>{{ this.recipeTitle }}</h2>
      <img :src="recipeCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="recipeHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipePreview",
  computed: {
    recipeTitle() {
      return this.$store.state.recipeTitle;
    },
    recipeHTML() {
      return this.$store.state.recipeHTML;
    },
    recipeCoverPhoto() {
      return this.$store.state.recipePhotoFileURL;
    },
  },
};
</script>

<style lang="scss">
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
}
</style>