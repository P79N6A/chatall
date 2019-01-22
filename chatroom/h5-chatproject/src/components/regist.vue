<template>
  <div class="regist-content">
    <!-- <div class="little-can"></div>
    <div class="little-can" style="left: 100%"></div> -->
    <p class="top-font" v-if="tabIndex === 1">注册</p>
    <p class="top-font" v-if="tabIndex === 0">登录</p>
    <div class="regist-bg">
      <img src="../../static/images/regist/ball.png" alt="">
    </div>
    <div class="regist-logo">
      <img src="../../static/images/touch-logo.png" alt="">
    </div>
    <tabs style="position: relative; top: -18px;" :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
    <div class="regist-item-container">
      <div v-if="tabIndex === 0" class="item-detail">
        <ul>
          <li>
            <img src="../../static/images/regist/persion.png" alt="">
            <input v-model="loginForm.username" placeholder="请输入账号" type="text">
          </li>
          <li>
            <img src="../../static/images/regist/pwd.png" alt="">
            <input v-model="loginForm.password" placeholder="请输入密码" type="password">
          </li>
          <li @click="loginClick" style="margin-top: 48px">
            <div class="regist-btn">登录</div>
          </li>
        </ul>
      </div>
      <div v-if="tabIndex === 1" class="item-detail">
        <ul>
          <li>
            <img src="../../static/images/regist/persion.png" alt="">
            <input v-model="registForm.username" placeholder="请输入6-12位字符">
          </li>
          <li>
            <img src="../../static/images/regist/pwd.png" alt="">
            <input v-model="registForm.password" placeholder="请输入用户密码" type="password">
          </li>
          <li>
            <img src="../../static/images/regist/pwd.png" alt="">
            <input v-model="registRepassword" placeholder="请确认用户密码" type="password">
          </li>
          <li>
            <img style="width: 21px; height: 20px" src="../../static/images/regist/group.png" alt="">
            <input v-model="registForm.platformAccount" placeholder="请输入平台账号,以便领取红包">
          </li>
          <li style="position: relative;">
            <img style="width: 21px; height: 20px" src="../../static/images/regist/yaoqingma.png" alt="">
            <input v-model="registForm.invitationcode" placeholder="请输入邀请码">
          </li>
          <li style="position: relative;">
            <img style="width: 21px; height: 20px" src="../../static/images/regist/define.png" alt="">
            <img @click="changeCode" :src="'data:img/png;base64,'+base64Img" style="width: 80px; height: 30px; position: absolute; top: -6px; right: 4px;">
            <input v-model="registForm.vcode" placeholder="请输入验证码">
          </li>
          <li @click="regist" style="margin-top: 48px">
            <div class="regist-btn">注册</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import '../assets/css/regist.less'
  import Regist from '@/api/regist'
  import Login from '@/api/login'
  import Cookie from '@/utils/auth'
  import Util from '@/utils/util'
  import md5 from '@/utils/md5Utils'
  import Constants from '@/utils/constants'
  import {domain} from '../utils/privitelocalstorge.js'

  export default {
    data() {
      return {
        tabs: [
          '用户登录',
          '用户注册'
        ],
        tabIndex: 0,
        loginForm: {
          username: '',
          password: '',
          website: Constants.website
          // website: '9937333.com'
        },
        registForm: {
          username: '',
          password: '',
          platformAccount: '',
          invitationcode: '',
          vcode: '',
          website: Constants.website
        },
        userInfo: null,
        rePassword: '',
        registRepassword: '',
        base64Img: '',
        loginLoading: false,
        isLogin: false,
      }
    },
    methods: {
      backLate() {
        window.history.go(-1);
      },
      onTabClick(index) {
        this.tabIndex = index;
        this.changeCode();
      },
      changeCode() {
        Regist.getRegistCode().then(res => {
            this.base64Img = res.data;
          }
        )
      },
      loginClick() {
        var that = this;
        if (this.loginLoading) {
          return;
        }
        if (!this.loginForm.username.trim()) {
          this.showPopup('请输入您的会员账号');
          return;
        }
        if (!this.loginForm.password.trim()) {
          this.showPopup('请输入登录密码');
          return;
        }
        $loading.show('登录中...');
        this.loginLoading = true;
        let loginParam = {
          username: this.loginForm.username,
          password: md5.makeMd5(this.loginForm.password),
          website: this.loginForm.website
        };
        Login.loginUser(loginParam).then(response => {
          const data = response.data;
          that.loginLoading = false;
          $loading.hide();
          that.isLogin = Constants.isLogin = true;
          Cookie.setToken(data.token);
          const userdata = {
            accountBalance: data.user.accountBalance,
            userid: data.user.userId,
            username: data.user.username,
            nickname: data.user.nickname,
            userflag: data.user.userFlag,
            headimage: Util.isNull(data.user.headImage) ? 'default.gif' : data.user.headImage,
            userdegree: data.user.userDegree,
            gender: data.user.gender,
            loginCount: data.user.loginCount,
            createTime: data.user.createTime,
            userFlag: data.user.userFlag,
            selfIntroduction: data.user.selfIntroduction,
            gold: data.user.gold,
            platformAccount: data.user.platformAccount,
          };
          // that.userInfo = userdata;
          if (that.$store) {
            that.$store.commit("SET_USER_INFO", userdata);
            that.$store.commit("SET_TOKEN", data.token);
            that.$store.commit("SET_LOGIN", true);
          }
          // this.$refs.loginModal.hide();
          // that.$root.disconnect();
          // setTimeout(()=>{
          //     that.$root.InitSocket();
          // },100);
          this.$router.push({name: 'Home'});
          window.localStorage.removeItem(domain);
        }).catch(err => {
          this.showPopup(err.msg);
          that.loginLoading = false;
          $loading.hide();
        });
      },
      regist() {
        let that = this;
        let han = /^[\u4e00-\u9fa5]+$/;
        if (this.loginLoading) {
          return;
        }
        if (han.test(this.registForm.username)) {
          this.showPopup('用户名不能有汉字');
          return;
        }
        if (!this.registForm.username.trim()) {
          this.showPopup('请输入您的会员账号');
          return;
        }
        if (!this.registForm.password.trim()) {
          this.showPopup('请输入您的账户密码。');
          return;
        }
        if (!this.registRepassword.trim()) {
          this.showPopup('请确认您的账户密码。');
          return;
        }
        if (!this.registForm.vcode.trim()) {
          this.showPopup('请输入验证码。');
          return;
        }
        if (this.registForm.password.trim().length < 6) {
          this.showPopup('密码长度至少6位。');
          return;
        }
        if (this.registForm.username.trim().length < 6) {
          this.showPopup('账户名长度至少6位。');
          return;
        }
        if (this.registForm.username.trim().length > 12) {
          this.showPopup('账户名长度不能大于12位。');
          return;
        }
        if (this.registForm.password.trim() !== this.registRepassword.trim()) {
          this.showPopup('两次输入密码不一致，请检查。');
          return;
        }
        $loading.show('注册中...');
        this.loginLoading = true;
        this.registForm.password = md5.makeMd5(this.registForm.password);
        Regist.registUser(Util.makeJson(this.registForm)).then(res => {
            let result = res.data;
            that.loginLoading = false;
            $loading.hide();
            Util.setStorage('chatUsername', this.registForm.username);
            Util.setStorage('chatPassword', md5.makeMd5(this.registForm.password));
            Login.loginUser({
              username: this.registForm.username,
              password: this.registForm.password,
              website: Constants.website
            }).then(response => {
                let data = response.data;
                that.isLogin = Constants.isLogin = true;
                Cookie.setToken(data.token);
                if (typeof callback === "function") {
                  callback();
                }
                const userdata = {
                  accountBalance: data.user.accountBalance,
                  userid: data.user.userId,
                  username: data.user.username,
                  nickname: data.user.nickname,
                  userflag: data.user.userFlag,
                  headimage: data.user.headImage,
                  userdegree: data.user.userDegree,
                  gender: data.user.gender,
                  loginCount: data.user.loginCount,
                  createTime: data.user.createTime,
                  userFlag: data.user.userFlag,
                  selfIntroduction: data.user.selfIntroduction,
                  gold: data.user.gold,
                  platformAccount: data.user.platformAccount,
                };
                that.userInfo = userdata;
                if (that.$store) {
                  that.$store.commit("SET_USER_INFO", userdata);
                  that.$store.commit("SET_TOKEN", data.token);
                  that.$store.commit("SET_LOGIN", true);
                }
                that.$root.eventHub.$emit("onLiveChatEvent", that.userInfo);
                this.$router.push({name: 'Home'});
                window.localStorage.removeItem(domain);
                // that.$root.disconnect();
                // setTimeout(()=>{
                //     that.$root.InitSocket();
                // },100);
              }
            )
          }
        ).catch(err => {
            this.showPopup(err.msg);
            this.loginLoading = false;
            $loading.hide();
          }
        )
      },
      showPopup(data) {
        let options = {
          effect: 'scale',
          title: '温馨提示',
          showClose: true,
          buttons: [{text: '确定'},]
        };
        let popup = $popup.fromTemplate('<p style="margin-bottom: 0; text-align: center;">' + data + '</p>', options);
        popup.show().then((buttonIndex) => {
          console.log(buttonIndex)
        });
      },
    }
  }
</script>


<style scoped>
  .bar.bar-header {
    background: #EE0024;
  }

  .bar.bar-light .title {
    color: #fff;
  }

  .button .icon {
    color: #ffffff;
  }

  .von-input-wrapper .von-input {
    margin: 0;
  }

  .modal .bar.bar-header h1.title {
    color: #fff;
  }

  .bar .title + .button:last-child {
    color: #fff;
  }

  .g-core-image-upload-btn {
    width: 50px;
    height: 70px;
    position: absolute !important;
    opacity: 0;
  }

  .tabs-striped.tabs-background-light .tabs {
    height: 38px;
  }

  .tabs {
    line-height: 34px;
  }

  .tabs-striped.tabs-color-positive .tab-item.tab-item-active, .tabs-striped.tabs-color-positive .tab-item.active, .tabs-striped.tabs-color-positive .tab-item.activated {
    font-size: 16px;
    color: #EE0024;
    border: 0px solid #EE0024;
  }

  .tabs-striped.tabs-color-positive .tab-item {
    font-size: 16px;
    color: #444;
  }

  .tab-item {
    max-width: 207px;
  }

  .top-font {
    position: fixed;
    top: 13px;
    left: 46%;
    z-index: 100;
    font-size: 18px;
    color: #fff;
  }
</style>
