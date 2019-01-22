import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步路由表
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'adminlist',
        component: () => import('@/views/system/list'),
        meta: { 
          title: '系统管理员', 
          icon: 'peoples',
          roles:['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/site',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'sitelist',
        component: () => import('@/views/site/list'),
        meta: { 
          title: '站点配置', 
          icon: 'international',
          roles:['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/domain',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'domainIndex',
        component: () => import('@/views/domain/index'),
        meta: { 
          title: '域名管理', 
          icon: 'list',
          roles:['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/proxy',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'proxyIndex',
        component: () => import('@/views/proxy/index'),
        meta: { 
          title: '代理IP管理', 
          icon: 'excel',
          roles:['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'messageIndex',
        component: () => import('@/views/message/index'),
        meta: { 
          title: '通知设置', 
          icon: 'message',
          roles:['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/detect',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'domainDetect',
        component: () => import('@/views/detect/index'),
        meta: { 
          title: '域名检测', 
          icon: 'bug',
          roles:['admin', 'editor']
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

