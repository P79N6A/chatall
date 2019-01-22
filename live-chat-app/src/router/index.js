import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Test from '@/pages/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
    	path: '/test',
      	name: 'test',
      	component: Test
    }
  ]
})
