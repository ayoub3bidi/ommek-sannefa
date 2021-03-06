import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipePosts: [],
    postLoaded: null,
    recipeHTML: "Write your recipe title here...",
    recipeTitle: "",
    recipePhotoName: "",
    recipePhotoFileURL: null,
    recipePhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
    recipePostsFeed(state) {
      return state.recipePosts.slice(0, 2);
    },
    recipePostsCards(state) {
      return state.recipePosts.slice(2, 6);
    },
  },
  mutations: {
    newRecipePost(state, payload) {
      state.recipeHTML = payload;
    },
    updateRecipeTitle(state, payload) {
      state.recipeTitle = payload;
    },
    fileNameChange(state, payload) {
      state.recipePhotoName = payload;
    },
    createFileURL(state, payload) {
      state.recipePhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.recipePhotoPreview = !state.recipePhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setRecipeState(state, payload) {
      state.recipeTitle = payload.recipeTitle;
      state.recipeHTML = payload.recipeHTML;
      state.recipePhotoFileURL = payload.recipeCoverPhoto;
      state.recipePhotoName = payload.recipeCoverPhotoName;
    },
    filterRecipePost(state, payload) {
      state.recipePosts = state.recipePosts.filter((post) => post.recipeID !== payload);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
      console.log(state.profileId);
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    async getCurrentUser({commit}) {
      const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid)
      const dbResults = await dataBase.get()
      commit("setProfileInfo", dbResults)
      commit("setProfileInitials")
      console.log(dbResults)
    },
    async getPost({ state }) {
      const dataBase = await db.collection("recipePosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.recipePosts.some((post) => post.recipeID === doc.id)) {
          const data = {
            recipeID: doc.data().recipeID,
            recipeHTML: doc.data().recipeHTML,
            recipeCoverPhoto: doc.data().recipeCoverPhoto,
            recipeTitle: doc.data().recipeTitle,
            recipeDate: doc.data().date,
            recipeCoverPhotoName: doc.data().recipeCoverPhotoName,
            profileId: doc.data().profileId,
          };
          state.recipePosts.push(data);
        }
      });
      state.postLoaded = true;
    },
    async updatePost({ commit, dispatch }, payload) {
      commit("filterRecipePost", payload);
      await dispatch("getPost");
    },
    async deleteRecipe({ commit }, payload) {
      const getPost = await db.collection("recipePosts").doc(payload);
      await getPost.delete();
      commit("filterRecipePost", payload);
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");
    },
  },
  modules: {},
});