import { createApp } from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/main.css";
import router from "./router";
import store from "./store/";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { LoadingPlugin } from "vue-loading-overlay";

createApp(App)
  .use(router)
  .use(VueSweetalert2)
  .use(LoadingPlugin)
  .use(store)
  .mount("#app");
