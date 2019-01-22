<template>
  <!-- App -->
  <f7-app :params="f7params">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <!-- Left Panel -->
    <f7-panel left cover theme-dark>
      <f7-view url="/panel-left/"></f7-view>
    </f7-panel>

    <!-- Right Panel -->
    <f7-panel right cover theme-dark>
      <f7-view url="/panel-right/"></f7-view>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>
    <!-- Login Screen -->
    <f7-login-screen id="login-screen">
      <f7-view>
        <f7-page login-screen>
           <f7-link login-screen-close><div class="login-close"></div></f7-link>
          <f7-login-screen-title>账号登录</f7-login-screen-title>
          <div class="login-content">
              <div class="line-w login-item">
                <span class="icon-user"></span>
                <input type="text" placeholder="请输入会员账号" v-model="login.username" />
              </div>
              <div class="line-w login-item">
                <span class="icon-pass"></span>
                <input v-show="isHide" type="password" class="pass" placeholder="请输入密码" v-model="login.password" />
                <input v-show="!isHide" type="text" class="pass" placeholder="请输入密码" v-model="login.password" />
                <span class="icon-eye-open" :class="isHide?'close':''" @click="showOrHide"></span>
              </div>
              <div class="right mt10">
                  <f7-link><span class="cActive" >忘记密码</span></f7-link>
              </div>
              <div class="mt20">
                <f7-button class="btn" fill raised @click="loginSubmit">登录</f7-button>
              </div>
              <div class="mt20 right">
                  <f7-link><span>快速注册</span></f7-link>
              </div>
          </div>
          <div class="bottom-logo"></div>
        </f7-page>
      </f7-view>
    </f7-login-screen>

  </f7-app>
</template>

<script>
// Import Routes
import routes from './routes.js'

export default {
  data() {
    return {
      // Framework7 parameters here
      f7params: {
        id: 'io.framework7.testapp', // App bundle ID
        name: 'Framework7', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes: routes,
      },
      login:{
        username:'',
        password:''
      },
      isHide:true
    }
  },
  created(){

  },
  mounted(){

  },
  computed:{

  },
  methods:{
    closeLogin(){
      
    },
    showOrHide(){
      this.isHide = !this.isHide;
    },
    loginSubmit(){

    }
  }
}
</script>
