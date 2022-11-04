import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      posts: [],
      isLoggedIn: false,
      isAdmin: false,
      users: [
        {
          name: "Jackie Lopez",
          userId: 1,
          username: "@jackie43",
          avatar: "",
        },
        {
          name: "Allison Martin",
          userId: 2,
          username: "@allie",
          avatar: "",
        },
        {
          name: "Geneva Romero",
          userId: 3,
          username: "@romero246",
          avatar: "",
        },
        {
          name: "Eunice Lane",
          userId: 4,
          username: "@elane",
          avatar: "",
        },
        {
          name: "Ed Mann",
          userId: 5,
          username: "@edthemann",
          avatar: "",
        },
        {
          name: "Dean Rhodes",
          userId: 6,
          username: "@dear",
          avatar: "",
        },
        {
          name: "Tammy Houston",
          userId: 7,
          username: "@tammyh",
          avatar: "",
        },
        {
          name: "Andre Figueroa",
          userId: 8,
          username: "@andre",
          avatar: "",
        },
        {
          name: "Eugene Stewart",
          userId: 9,
          username: "@eugene122",
          avatar: "",
        },
        {
          name: "Ivan Byrd",
          userId: 10,
          username: "@ivanthebird",
          avatar: "",
        },
        {
          name: "Toby Romero",
          userId: 11,
          username: "@toby",
          avatar: "",
        },
      ],
    };
  },
  mutations: {
    addMultiple(state, post) {
      state.posts = [...state.posts, ...post];
    },
    remove(state, post) {
      state.posts = state.posts.filter((item) => item.id !== post);
    },
    add(state, post) {
      state.posts = [...state.posts, post];
    },
    editPost(state, editPostData) {
      state.posts = state.posts.map((post) =>
        post.id === editPostData.id ? editPostData : post
      );
    },
    setAuth(state, newState) {
      state.isLoggedIn = newState;
    },
    setAdmin(state, newState) {
      state.isAdmin = newState;
    },
  },
  getters: {
    getUser: (state) => (id) => {
      return state.users.find((user) => user.userId === id);
    },
    getPost: (state) => (id) => {
      return state.posts.find((post) => post.id === id);
    },
    getLargestId(state) {
      if (state.posts.length == 0) {
        return 1;
      } else {
        const ids = state.posts.map((post) => {
          return post.id;
        });
        return Math.max(...ids) + 1;
      }
    },
  },
});

export default store;
