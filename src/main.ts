import { createApp } from 'vue'
import './style.css'
import Manifest from './views/Manifest.vue'
import {createRouter, createWebHistory} from "vue-router";
import App from "./App.vue";

const routes = [
    {
        path: '/',
        redirect() {
            window.location.href = 'https://www.twitch.tv/team/xiv'
            return '/manifest' // fallback (won’t really be used)
        }
    },
    { path: '/manifest', component: Manifest },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
