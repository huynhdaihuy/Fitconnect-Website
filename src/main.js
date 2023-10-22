import { createApp } from 'vue'
import App from './App.vue'
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/main.css'
import router from "./router";
import store from "./store/"
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

createApp(App).use(router).use(VueSweetalert2).use(store).mount('#app')