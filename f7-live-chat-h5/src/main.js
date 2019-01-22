// Import Vue
import Vue from 'vue';

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from '@/assets/css/icons.less';
import AppStyles from '@/assets/css/app.less';

// Import App Component
import App from './app';
import Vuex from 'vuex'
import Store from '@/utils/vuexStore'
import VueFilter from '@/utils/vueFilter.js'

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)
Vue.use(Vuex)
for(let key in VueFilter){
  Vue.filter(key,VueFilter[key]);
}
const store = new Vuex.Store(Store);
//window.$ = Dom7;
// Init App
window.chatApp = new Vue({
  el: '#app',
  template: '<app/>',
  framework7:{
  	root: '#app',
  	pushState:true,
    pushStateSeparator:"#",
  	preroute(view,options){//登录拦截

  	}
  },
  store,
  data:{
    eventHub:new Vue(),  
  },
  // Register App Component
  components: {
    app: App
  }
});
