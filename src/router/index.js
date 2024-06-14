import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Webserver from '../components/Webserver.vue'
import Plan from '../components/Plan.vue'
import Hotels from '../components/Hotels.vue'
import Events from '../components/Events.vue'
import MarkdownPage from '../components/MarkdownPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/Webserver', component: Webserver },
  { path: '/plan', component: Plan },
  { path: '/hotels', component: Hotels },
  { path: '/events', component: Events },
  { path: '/item/:mdFile', component: MarkdownPage, props: true },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
