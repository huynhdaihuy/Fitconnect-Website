import { createWebHistory, createRouter } from "vue-router";
import LoginForm from "@/components/LoginForm.vue";
import RegisterView from "@/views/RegisterView.vue";
import HomeView from "@/views/HomeView.vue";


const routes = [
  {
    path: "/home",
    name: "HomeView",
    component: HomeView,
  },
  {
    path: "/",
    name: "LoginView",
    component: LoginForm,
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
