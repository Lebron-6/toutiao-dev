import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login'
import Login from '@/views/login'
// 在 vueCli 创建的项目中 @ 表示 src 目录
// 它是 src 目录的路径别名
// 好处: 它不受当前文件路径的影响
// 注意: @ 就是 src 路径,需要写 /
import Home from '../views/home'
import Layout from '../views/layout'
import Article from '../views/article'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: '',
    // 命名路由 layout 有一个默认子路由,这个名字没有意义!
    component: Layout,
    children: [
      {
        path: '',
        // path为空 会作为默认子路由渲染
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由拦截器:拦截页面的导航
// to：要去的路由信息
// from：来自哪的路由信息
// next：放行的方法
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      next('/login')
      // 没有登录 跳转至登录页面
    }
  } else {
    next()
  }
})

export default router
