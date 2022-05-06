import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleRecipeCards: [
      { recipeTitle: "Bachkoutou", cover: "https://www.tunisienumerique.com/wp-content/uploads/2020/04/Biscuit-tunisien-%C2%ABBachkoutou%C2%BB-1200x1161.png", date: "March 23, 2022"  },
      { recipeTitle: "Ma9roudh", cover: "https://sp-ao.shortpixel.ai/client/q_lqip,ret_wait/https://howto-cook.net/wp-content/uploads/2020/05/makroudh-recipe-for-beginners-780x517.png", date: "March 24, 2022"  },
      { recipeTitle: "Debla", cover: "https://upload.wikimedia.org/wikipedia/commons/2/24/Oreilles_de_juge.jpg", date: "March 25, 2022"  },
    ],
    editPost: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload
      console.log(state.editPost)
    }
  },
  actions: {
  },
  modules: {
  }
})