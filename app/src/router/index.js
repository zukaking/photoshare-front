import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/organisms/LoginView.vue'
import Top from '@/components/organisms/TopView.vue'
import FileUp from '@/components/organisms/FileUp.vue'
import Signup from '@/components/organisms/SignupView.vue'
import { authorizeToken } from './guards'

const routes = [
  {
    path: '/',
    name: 'Top',
    component: Top,
    meta: {
      requiresAuth: true 
    }
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/upload',
    name: 'UpFile',
    component: FileUp,
    meta: {
      requiresAuth: true 
    }
    
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      requiresAuth: false 
    }
    
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach(authorizeToken)

export default router
