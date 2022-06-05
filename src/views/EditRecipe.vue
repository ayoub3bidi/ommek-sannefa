<template>
  <div class="create-post">
    <RecipeCoverPreview v-show="this.$store.state.recipePhotoPreview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>
      <div class="info">
        <input type="text" placeholder="Enter Recipe Title" v-model="recipeTitle" />
        <div class="upload-file">
          <label for="recipe-photo">Upload Cover Photo</label>
          <input type="file" ref="recipePhoto" id="recipe-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.recipePhotoFileURL }">
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.recipePhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="recipeHTML" useCustomImageHandler @image-added="imageHandler" />
      </div>
      <div class="actions">
        <button @click="updateRecipe">Update recipe</button>
        <router-link class="router-button" :to="{ name: 'RecipePreview' }">Preview Changes</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCoverPreview from "../components/RecipeCoverPreview";
import Loading from "../components/Loading";
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firebaseInit";
import Quill from "quill";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "CreateRecipe",
  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      routeID: null,
      currentRecipe: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },
  components: {
    RecipeCoverPreview,
    Loading,
  },
  async mounted() {
    this.routeID = this.$route.params.recipeid
    this.currentRecipe = await this.$store.state.recipePosts.filter(post => {
      return post.recipeID === this.routeID
    })
    this.$store.commit('setRecipeState', this.currentRecipe[0])
  },
  methods: {
    fileChange() {
      this.file = this.$refs.recipePhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
    },

    openPreview() {
      this.$store.commit("openPhotoPreview");
    },

    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/Photos/${file.name}`);
      docRef.put(file).on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },

    async updateRecipe() {
      const dataBase = await db.collection("recipePosts").doc(this.routeID)
      if (this.recipeTitle.length !== 0 && this.recipeHTML.length !== 0) {
        if (this.file) {
          this.loading = true;
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(`documents/Covers/${this.$store.state.recipePhotoName}`);
          docRef.put(this.file).on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            (err) => {
              console.log(err);
              this.loading = false;
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();

              await dataBase.update({
                recipeHTML: this.recipeHTML,
                recipeCoverPhoto: downloadURL,
                recipeCoverPhotoName: this.recipeCoverPhotoName,
                recipeTitle: this.recipeTitle,
              });
              await this.$store.dispatch("updatePost", this.routeID);
              this.loading = false;
              this.$router.push({ name: "ViewRecipe", params: { recipeid: dataBase.id } });
            }
          );
          return;
        }
        this.loading = true;
        await dataBase.update({
          recipeHTML: this.recipeHTML,
          recipeTitle: this.recipeTitle,
        });
        await this.$store.dispatch("updatePost", this.routeID)
        this.loading = false;
        this.$router.push({ name: "ViewRecipe", params: { recipeid: dataBase.id } })
        return;
      }
      this.error = true;
      this.errorMsg = "Please ensure Recipe Title & Recipe Post has been filled!"
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    },
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    recipeCoverPhotoName() {
      return this.$store.state.recipePhotoName;
    },
    recipeTitle: {
      get() {
        return this.$store.state.recipeTitle;
      },
      set(payload) {
        this.$store.commit("updateRecipeTitle", payload);
      },
    },
    recipeHTML: {
      get() {
        return this.$store.state.recipeHTML;
      },
      set(payload) {
        this.$store.commit("newRecipePost", payload);
      },
    },
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  // error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .info {
    display: flex;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 300px;
    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }
}
</style>