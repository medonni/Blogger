<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="!loading" class="content">
      <ul>
        <li v-for="post in posts" v-bind:key="post.id">
          {{ post.body }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      loading: false,
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
          // console.log(result)
          // console.log(typeof (result))
        })
        .then(() => { this.loading = false })
        .catch(error => console.log('error', error));
    },
  },
  computed: {
    posts() {
      return this.$store.state.posts
    }

  }
}
</script>

<style scoped>

</style>
