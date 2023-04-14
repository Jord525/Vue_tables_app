import { createRouter, createWebHistory } from "vue-router";
import MainPage from '../views/MainPage.vue';
import Login from '../views/LoginPage.vue'
import Register from "../views/Register.vue"
import UserPage from '../views/UserPage.vue'
import { useUserStore } from "../stores/user";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/', component: MainPage, name: 'Main', meta: { requiresAuth: true } },
    { path: '/login', component: Login, name: 'Login', },
    { path:  '/user' , component: UserPage, name: 'User' },
    { path: '/register', component: Register, name: 'Register' },
  ],
});

router.beforeEach((to, from) => {
  const store = useUserStore()
  if (to.meta.requiresAuth && !store.token) {
    return { name: 'Register' }
  }
  else if (store.token && to.name === 'Login') {
    return { name: "Main" }
  }
})
export default router;
