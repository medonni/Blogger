<template>
    <div>
        <h1 class="title">FakeBlogger</h1>
        <div>Login</div>
        <input type="text" v-model="input.username" @change="debug" placeholder="Username" />
        <input type="password" v-model="input.password" @change="debug" placeholder="Password" />
        <button type="submit" @click="login()">Login</button>
    </div>
</template>
<script>
import store from "../store";
export default {
    name: "Login",
    data() {
        return {
            input: {
                username: "",
                password: "",
            }
        }
    },
    methods: {
        debug(event) {
            console.log(event.target.value);
        },
        login() {
            if (this.input.username === 'user' && this.input.password === 'user') {
                store.commit("setAuth", true)
                this.$router.push({ name: 'Blogger' })
            }
            else if (this.input.username === 'admin' && this.input.password === 'admin') {
                store.commit("setAuth", true);
                store.commit("isAdmin", true);
                this.$router.push({ name: 'Blogger' })
            }
            else {
                console.log('Wrong username or password')
            }
        }
    }
}
</script>
<style scoped>

</style>