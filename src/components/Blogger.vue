<template>
  <v-app>
    <v-app-bar app>
      <div class="app-bar__left">
        <v-avatar image="https://api.multiavatar.com/user.svg"></v-avatar>
        <span class="text-grey">
          User
        </span>
      </div>
      <div class="app-bar__right">
        <v-btn @click="logout()">Logout</v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container v-if="loading" class="fill-height">
        <v-row class="fill-height loader__container">
          <v-progress-circular color="blue-lighten-3" :size="80" indeterminate>
          </v-progress-circular>
        </v-row>
      </v-container>
      <v-container v-if="!loading">
        <v-row>
          <v-col cols="12" md="12">
            <v-expansion-panels variant="accordion">
              <v-expansion-panel title="Search">
                <v-expansion-panel-text>
                  <v-form>
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field v-model="searchName" label="Name">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field v-model="searchTitle" label="Title">
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field v-model="searchBody" label="Body">
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="12" md="4" v-for="post in filteredPosts" v-bind:key="post.id">
            <v-card elevation="2" class="pa-2" tile>
              <v-card-title>
                <v-avatar :image="`https://api.multiavatar.com/${post.userId}.svg`">
                </v-avatar>{{
                    this.$store.getters.getUser(post.userId)
                      ?
                      this.$store.getters.getUser(post.userId)["name"] : "Name not found"
                }}
              </v-card-title>
              <v-card-subtitle>{{ post.title }}</v-card-subtitle>
              <v-card-text>{{ post.body }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

</template>


<script>
export default {
  name: 'Blogger',
  data() {
    return {
      loading: true,
      searchName: '',
      searchTitle: '',
      searchBody: '',
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'GET'
      }
      )
        .then(response => response.json())
        .then(result => {
          this.$store.commit('addMultiple', result);
        })
        .then(() => { this.loading = false })
        .catch(error => console.log('error', error));
    },
    logout() {
      this.$store.commit("setAuth", false);
      this.$store.commit("setAdmin", false);
      this.$router.push({ name: 'Login' })
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts
    },
    filteredPosts() {
      const filteredPosts = this.posts.filter(post => this.$store.getters.getUser(post.userId)["name"].toLowerCase().includes(this.searchName.toLowerCase()) && post.title.toLowerCase().includes(this.searchTitle.toLowerCase()) && post.body.toLowerCase().includes(this.searchBody.toLowerCase()));
      return filteredPosts;
    },
  }
}
</script>

<style>
.loader__container {
  display: flex;
  justify-content: center;
  align-content: center;
}

.v-toolbar__content {
  justify-content: space-between;
}

.app-bar__left {
  margin-left: 15px;
}

.app-bar__right {
  margin-right: 15px;
}
</style>
