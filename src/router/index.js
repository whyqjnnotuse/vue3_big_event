import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
// createRouter 创建路由实例
// 配置 history 模式
// 1. history模式 createWebHistory 地址栏不带#
// 2. Hash模式 createWebHashHistory 地址栏带#

// vite 中的环境变量import.meta.env.BASE_URL 就是 vite.config.js 中的配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 导航守卫
router.beforeEach((to) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return '/login'
  // 放行 默认就是undefine或true不用return也行
  // return true
})

export default router
