import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from '@/App.vue'

import '@/assets/styles/tw.scss'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: async () => await import('@/Test.vue'),
    },
  ],
})

app.use(router)

app.mount('#app')
