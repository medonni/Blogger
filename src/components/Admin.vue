<template>
    <v-app>
        <v-app-bar app>
            <div class="app-bar__left">
                <v-avatar image="https://api.multiavatar.com/admin.svg"></v-avatar>
                <span class="text-grey">
                    Admin
                </span>
            </div>
            <div class="app-bar__right">
                <v-btn @click="logout()">Logout</v-btn>
            </div>
        </v-app-bar>
        <v-main>
            <v-container>
                <v-row v-if="loading">
                    <div class="loading"> Loading...</div>
                </v-row>
                <v-row v-if="!loading">
                    <v-col cols="12" md="12">
                        <v-expansion-panels variant="accordion">
                            <v-expansion-panel title="Search">
                                <v-expansion-panel-text>
                                    <v-form>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="searchPostData.name" label="Name">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="searchPostData.title" label="Title">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="searchPostData.body" label="Body">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-expansion-panels variant="accordion">
                            <v-expansion-panel title="Add post">
                                <v-expansion-panel-text>
                                    <v-form>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" md="3">
                                                    <v-select v-model="addPostData.name" clearable label="Name"
                                                        :items="this.$store.state.users" item-title="name"
                                                        item-value="userId">
                                                    </v-select>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="addPostData.title" label="Title">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field v-model="addPostData.body" label="Body">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="1">
                                                    <v-btn block @click="addPost()">
                                                        Add
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-table>
                            <thead>
                                <tr>
                                    <th class="text-left">Post id
                                    </th>
                                    <th class="text-left">User
                                    </th>
                                    <th class="text-left">Title
                                    </th>
                                    <th class="text-left">Content
                                    </th>
                                    <th class="text-left">Controls
                                    </th>
                                </tr>
                            </thead>
                            <tbody tbody>
                                <tr v-for="post in filteredPosts" v-bind:key="post.id">
                                    <td>{{ post.id }}
                                    </td>

                                    <td>{{ this.$store.getters.getUser(post.userId) ?
                                            this.$store.getters.getUser(post.userId)["name"]
                                            :
                                            "Name not found"
                                    }}
                                    </td>
                                    <td>{{ post.title }}
                                    </td>
                                    <td>{{ post.body }}
                                    </td>
                                    <td>
                                        <template>
                                            <v-btn color="primary">
                                                Edit
                                            </v-btn>
                                        </template>
                                        <v-btn color="secondary" @click="editPost(post)">
                                            Edit
                                        </v-btn>
                                        <v-btn color="error" @click="deletePost(post.id)">
                                            Delete
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-dialog v-model="dialog" persistent>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">Edit post #{{ editPostData.id }}
                                </span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-select v-model="editPostData.name" clearable label="Name"
                                                :items="this.$store.state.users" item-title="name" item-value="userId"
                                                required>
                                            </v-select>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editPostData.title" label="Title"
                                                hint="example of helper text only on focus">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editPostData.body" label="Body"
                                                hint="example of persistent helper text" persistent-hint required>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                                    Close
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="saveEditedPost()">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'Admin',
    data() {
        return {
            loading: false,
            searchPostData: {
                name: '',
                title: '',
                body: '',
            },
            addPostData: {
                name: '',
                title: '',
                body: '',
            },
            editPostData: {
                userId: '',
                id: null,
                title: '',
                body: '',
            },
            dialog: false,
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
        deletePost(id) {
            this.$store.commit("remove", id)
        },
        editPost(post) {
            this.editPostData = post;
            console.log(this.editPostData);
            this.dialog = true;
        },
        saveEditedPost() {
            const newPost = {
                userId: parseInt(this.editPostData.name),
                id: this.editPostData.id,
                title: this.editPostData.title,
                body: this.editPostData.body
            }
            this.$store.commit("editPost", newPost);
            this.dialog = false;
        },
        addPost() {
            const newPost = {
                userId: parseInt(this.addPostData.name),
                id: this.$store.getters.getLargestId,
                title: this.addPostData.title,
                body: this.addPostData.body
            }
            this.$store.commit("add", newPost)
            this.$forceUpdate();
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
            const filteredPosts = this.posts.filter(post => this.$store.getters.getUser(post.userId)["name"].toLowerCase().includes(this.searchPostData.name.toLowerCase()) && post.title.toLowerCase().includes(this.searchPostData.title.toLowerCase()) && post.body.toLowerCase().includes(this.searchPostData.body.toLowerCase()));
            return filteredPosts;
        },
    }
}
</script>

<style>
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
