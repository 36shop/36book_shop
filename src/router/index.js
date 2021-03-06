import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Users from '../components/Users.vue'
import Welcome from '../components/Welcome.vue'
import Admin from '../components/Admin.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome', 
      children: [
        {
        path: '/welcome',
        component: Welcome
        },
        {path: '/users',
         component: Users
        },
        {path: '/admin',
         component: Admin
        }
      ]
    }
  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表从哪个路径跳转而来
  // next是一个函数，表示放行
  // next()  放行      next('/login)  强制跳转

  if(to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router
