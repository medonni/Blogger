<template>
    <v-container fluid class="login__container">
        <v-row class="fill-height" align="center" justify="center">
            <v-col class="login__card" cols="12" md="3">
                <h1 class="login__title">FakeBlogger</h1>
                <!-- <svg class="login__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="#000000"
                        d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg> -->
                <v-form>
                    <v-text-field type="text" v-model="input.username" @change="debug" label="Username" required>
                    </v-text-field>
                    <v-text-field type="password" v-model="input.password" @change="debug" label="Password" required>
                    </v-text-field>
                    <v-alert v-if="wrongLoginInfo" text="Wrong username and/or password!" color="red" variant="plain">
                    </v-alert>
                    <v-btn variant="outlined" block @click="login()">Login</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            input: {
                username: "",
                password: "",
            },
            wrongLoginInfo: false,
        }
    },
    methods: {
        debug(event) {
            console.log(event.target.value);
        },
        login() {
            if (this.input.username === 'user' && this.input.password === 'user') {
                this.$store.commit("setAuth", true)
                this.$router.push({ name: 'Blogger' })
            }
            else if (this.input.username === 'admin' && this.input.password === 'admin') {
                this.$store.commit("setAuth", true);
                this.$store.commit("setAdmin", true);
                this.$router.push({ name: 'Admin' });
            }
            else {
                this.wrongLoginInfo = true;
                console.log('Wrong username or password');
            }
        }
    }
}
</script>

<style>
.login__card {
    text-align: center;
    padding: 20px !important;
    z-index: 1;
    opacity: 0.9;
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    background: rgba(255, 255, 255, 0.4);
    border-radius: 2px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.login__container {
    height: 100vh;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

.login__title {
    margin-bottom: 10px;
}

.login__icon {
    max-width: 110px;
    max-height: 110px;
}
</style>