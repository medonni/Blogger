import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return {
      posts: [],
      isLoggedIn: false,
      isAdmin: false,
    };
  },
  mutations: {
    addMultiple(state, post) {
      state.posts = [...state.posts, ...post];
    },
    remove(state, post) {
      state.posts = state.posts.filter((item) => item !== post);
    },
    add(state, post) {
      state.posts = state.posts.push(post);
    },
    setAuth(state, newState) {
      state.isLoggedIn = newState;
    },
    setAdmin(state, newState) {
      state.isAdmin = newState;
    },
  },
});

export default store;
