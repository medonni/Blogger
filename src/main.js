import "vuetify/styles"; // Global CSS has to be imported
import router from "./router";
import store from "./store";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "./App.vue";
import { createApp } from "vue";
import { createVuetify } from "vuetify";

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.use(store);
app.use(router)
app.mount("#app");
