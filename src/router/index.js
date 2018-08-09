import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/components/home/home'
import Index from '@/components/home/index'

import Login from '@/components/login/login'

import BookList from '@/components/book/list'
import BookCategory from '@/components/book/category'

import UserList from '@/components/user/list'
import UserChangePwd from '@/components/user/changepwd'
import UserProfile from '@/components/user/profile'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      meta: {requireLogin: false},
      leaf: true,
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {
          path: '/index',
          component: Index,
          name: '首页',
          menuShow: true
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: '用户管理',
      meta: {requireLogin: false},
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/user/list', component: UserList, name: '用户列表', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '图书管理',
      menuShow: true,
      meta: {requireLogin: false},
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/book/list', component: BookList, name: '图书列表', menuShow: true},
        {path: '/book/category', component: BookCategory, name: '图书分类', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '设置',
      menuShow: true,
      meta: {requireLogin: false},
      iconCls: 'iconfont icon-setting1',
      children: [
        {path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true},
        {path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      ]
    }
  ]
})

// 全局钩子函数,在跳转之前执行
router.beforeEach((to, from, next) =>
{
  console.log('导航守卫--执行')

  if (to.meta.requireLogin)
  {
    if (utils.data.getData('isLogin', 'ses'))
    { // 登录状态
      next();
    }
    else
    { // 未登录,跳登录页,再回调当前页
      next({
        path: '/login',
        query: getQuery(to.fullPath)
      })
    }
  }
  else
  {
    if (to.path === '/login')
    {
      if (utils.data.getData('isLogin', 'ses'))
      { // 防止手动输入login,默认跳首页
        next('/');
      }
      else
      {
        next();
      }
    }
    else
    {
      next();
    }
  }
})

export default router

/**
 * 1.去掉路由带的'/'
 * 2.如果是默认页面,则不需要'redirect'
 * @param path
 */
function getQuery(path)
{
  let queryObj = {};
  if (path != '/')
  {
    queryObj['redirect'] = path.replace('/', '');
  }
  return queryObj;
}
