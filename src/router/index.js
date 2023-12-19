import { createRouter, createWebHistory } from "vue-router";
import index from "@/pages/index.vue";

const routes = [
    {
        path: '/',
        component: index,
        name: 'index',
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
