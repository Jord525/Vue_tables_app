import { createRouter, createWebHistory } from "vue-router";
import MainPage from '../views/MainPage.vue';
import AddTable from '../components/AddTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: MainPage },
    { path: '/add', component: AddTable },
  ],
});

export default router;
