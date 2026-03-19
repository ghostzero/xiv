import { createApp } from 'vue'
import './style.css'
import Manifest from './views/Manifest.vue'
import {createRouter, createWebHistory} from "vue-router";
import App from "./App.vue";
import Redirecting from "./views/Redirecting.vue";

const routes = [
    {
        path: '/',
        redirect() {
            window.location.href = 'https://www.twitch.tv/team/xiv'
        }
    },
    {
        path: '/bewerbung',
        redirect() {
            window.location.href = 'https://forms.gle/qrz9gSTywmj6M82e9'
        }
    },
    {
        path: '/discord',
        redirect() {
            window.location.href = 'https://discord.gg/JEMADUv3Zz'
        }
    },
    { path: '/redirecting', component: Redirecting },
    { path: '/manifest', component: Manifest },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
