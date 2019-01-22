<template>
  <div style="width: 100%;" class="regist-content">
    <p @click="backLate" style="top: 10px; left: 20px; transform: scaleY(1.8)" class="top-font" v-text="'<'"></p>
    <p class="top-font">用户中心</p>
    <div class="regist-bg">
      <img src="../../static/images/regist/ball.png" alt="">
    </div>
    <div class="regist-logo">
      <img :src="'../../static/images/avatars/' + showUserInfo.headimage" alt="">
      <p>{{showUserInfo.nickname}}</p>
    </div>
    <tabs style="position: relative; top: -6px;" :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
    <div style="margin-top: 78px;height: calc(100vh - 160px)!important;" class="user-container">
      <div v-if="tabIndex === 0" class="hangong">
        <ul>
          <li style="position: relative;">
            <div class="li-left">
              <p>余额</p>
            </div>
            <span style="color: #EE0024">{{showUserInfo.accountBalance}}</span>
            <span>元</span>
            <div @click="transferMoney" class="money-btn">
              <p>转账到平台</p>
            </div>
          </li>
          <li>
            <div class="li-left">
              <p>登录名</p>
            </div>
            <span>{{showUserInfo.username}}</span>
          </li>
          <li>
            <div class="li-left">
              <p>注册时间</p>
            </div>
            <span>{{showUserInfo.createTime}}</span>
          </li>
          <li>
            <div class="li-left">
              <p>最近登录</p>
            </div>
            <span></span>
          </li>
          <li>
            <div class="li-left">
              <p>平台账号</p>
            </div>
            <span>{{showUserInfo.platformAccount}}</span>
          </li>
          <li style="border: none; margin-top: 20px">
            <div @click.prevent="LoginOut" class="exit-btn">
              <p>退出当前账号</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="tabIndex === 1" class="hangong">
        <ul>
          <li>
            <div class="li-left">
              <p>昵称</p>
            </div>
            <input v-model="ziliao.nickname" type="text" :placeholder="showUserInfo.nickname">
          </li>
          <li style="position: relative">
            <div class="li-left">
              <p>平台账号</p>
            </div>
            <input v-model="platInfo" type="text" :placeholder="showUserInfo.platformAccount">
            <div v-if="!showUserInfo.platformAccount" @click="bindPlatInfo" style="width: 50px;" class="money-btn">
              <p>绑定</p>
            </div>
            <p v-if="showUserInfo.platformAccount" style="position: absolute; top: 14px; right: 15px; color: #444; font-size: 12px;">修改请联系客服</p>
          </li>
          <li>
            <div class="li-left">
              <p>自我介绍</p>
            </div>
            <input v-model="ziliao.selfIntroduction" type="text" :placeholder="showUserInfo.selfIntroduction">
          </li>
        </ul>
        <div @click="saveUserInfoes" class="red-btn">保存</div>
      </div>
      <div v-if="tabIndex === 2" class="hangong">
        <ul>
          <li style="border: none; justify-content: space-between">
            <img v-for="(item, index) in 39" :class="{'select-img': imgIndex === index}" @click="selectImg(index)" :key="index"
                 :src="'../../static/images/avatars/' + (item + 1) + '.png'" alt="">
          </li>
        </ul>
      </div>
      <div v-if="tabIndex === 2 && showSaveBtn" @click="saveImg" class="save-btn-center">保存</div>
      <div v-if="tabIndex === 3" class="hangong">
        <ul>
          <li>
            <div class="li-left">
              <p>原密码</p>
            </div>
            <input v-model="password.password" type="text" placeholder="请输入原密码">
          </li>
          <li>
            <div class="li-left">
              <p>新密码</p>
            </div>
            <input v-model="password.newPassword" type="text" placeholder="请输入6-12新密码">
          </li>
          <li>
            <div class="li-left">
              <p>确认密码</p>
            </div>
            <input v-model="rePassword" type="text" placeholder="请确认6-12新密码">
          </li>
        </ul>
        <div @click="uploadPasseord" class="red-btn">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../assets/css/regist.less'
  import '../assets/css/center.less'
  import Regist from '@/api/regist'
  import Login from '@/api/login'
  import Info from '@/api/changeinfo'
  import Pwd from '@/api/changepwd'

  import Cookie from '@/utils/auth'
  import Util from '@/utils/util'
  import md5 from '@/utils/md5Utils'
  import Constants from '@/utils/constants'

  export default {
    data() {
      return {
        password: {
          password: '',
          newPassword: ''
        },
        showSaveBtn: false,
        imgIndex: 0,
        ziliao: {
          nickname: '',
          selfIntroduction: '',
          headImage: '',
          platformAccount: ''
        },
        platInfo: '',
        showUserInfo: null,
        tabs: [
          '资料信息',
          '编辑资料',
          '修改头像',
          '修改密码'
        ],
        tabIndex: 0,
        loginForm: {
          username: '',
          password: ''
        },
        registForm: {
          username: '',
          password: '',
          platformAccount: '',
          vcode: ''
        },
        userInfo: null,
        rePassword: '',
        registRepassword: '',
        base64Img: '',
        loginLoading: false,
        isLogin: false,
      }
    },
    created() {
      this.getUserInfo();
      this.showUserInfo = this.$store.state.userInfo;
    },
    computed: {},
    methods: {
      LoginOut() {
        $dialog.confirm({
          content: '亲，您确定要退出吗？',
          okText: '继续退出'
        }).then((res) => {
          if (res) {
            $loading.show('正在登出...');
            Login.logout().then(response => {
              $loading.hide();
              this.$store.commit("SET_LOGIN", false);
              Cookie.removeToken();
              this.$router.push({name: 'regist'});
              this.$root.disconnect();
            }).catch(error => {
              $loading.hide();
            });
          }
        });
      },
      uploadPasseord() {
        if (!this.password.password.trim()) {
          this.showPopup('请输入您的账户密码。');
          return;
        }
        if (!this.password.newPassword.trim()) {
          this.showPopup('请确认您的账户密码。');
          return;
        }
        if (this.password.newPassword.trim().length < 6) {
          this.showPopup('密码长度至少6位。');
          return;
        }
        if (this.password.newPassword.trim() !== this.rePassword.trim()) {
          this.showPopup('两次输入密码不一致，请检查。');
          return;
        }
        let updatePassword = {
          password: md5.makeMd5(this.password.password),
          newPassword: md5.makeMd5(this.password.newPassword)
        };
        Pwd(updatePassword).then(res => {
            $loading.show('修改成功！');
            setTimeout(() => {
              $loading.hide();
            }, 500);
          }
        )
      },
      saveImg() {
        this.ziliao.headImage = this.imgIndex + 2 + '.png';
        let info = {
          nickname: this.ziliao.nickname ? this.ziliao.nickname : this.$store.state.userInfo.nickname,
          selfIntroduction: this.ziliao.selfIntroduction ? this.ziliao.selfIntroduction : this.$store.state.userInfo.selfIntroduction,
          headImage: this.ziliao.headImage ? this.ziliao.headImage : this.$store.state.userInfo.headImage,
          platformAccount: this.ziliao.platformAccount ? this.ziliao.platformAccount : this.$store.state.userInfo.platformAccount,
        };
        Info(info).then(res => {
            this.getUserInfo();
            $loading.show('修改成功！');
            setTimeout(() => {
              $loading.hide();
            }, 500);
          }
        )
      },
      selectImg(index) {
        this.imgIndex = index;
        this.showSaveBtn = true;
      },
      getUserInfo() {
        var that = this;
        Login.getInfo().then(response => {
          const data = response.data;
          const userdata = {
            accountBalance: data.accountBalance,
            userid: data.userId,
            username: data.username,
            nickname: data.nickname,
            userflag: data.userFlag,
            headimage: Util.isNull(data.headImage) ? 'default.gif' : data.headImage,
            userdegree: data.userDegree,
            gender: data.gender,
            loginCount: data.loginCount,
            createTime: data.createTime,
            userFlag: data.userFlag,
            selfIntroduction: data.selfIntroduction,
            gold: data.gold,
            platformAccount: data.platformAccount,
          };
          if (that.$store) {
            that.$store.commit("SET_USER_INFO", userdata);
            that.$store.commit("SET_LOGIN", true);
            this.showUserInfo = this.$store.state.userInfo;
          }
        })
      },
      saveUserInfoes() {
        if (Util.isNull(this.ziliao.nickname)) {
          this.showPopup('昵称不能为空！');
          return;
        }
        if (Util.isNull(this.ziliao.selfIntroduction)) {
          this.showPopup('请填写自我介绍！');
          return;
        }
        let info = {
          nickname: this.ziliao.nickname ? this.ziliao.nickname : this.$store.state.userInfo.nickname,
          selfIntroduction: this.ziliao.selfIntroduction ? this.ziliao.selfIntroduction : this.$store.state.userInfo.selfIntroduction,
          headImage: this.ziliao.headImage ? this.ziliao.headImage : this.$store.state.userInfo.headImage,
          platformAccount: this.ziliao.platformAccount ? this.ziliao.platformAccount : this.$store.state.userInfo.platformAccount,
        };
        Info(info).then(res => {
            this.getUserInfo();
            $loading.show('修改成功！');
            setTimeout(() => {
              $loading.hide();
            }, 500);
          }
        )
      },
      bindPlatInfo() {
        if (Util.isNull(this.platInfo)) {
          this.showPopup('请填写平台账号！');
        } else {
          let info = {
            nickname: this.ziliao.nickname ? this.ziliao.nickname : this.$store.state.userInfo.nickname,
            selfIntroduction: this.ziliao.selfIntroduction ? this.ziliao.selfIntroduction : this.$store.state.userInfo.selfIntroduction,
            headImage: this.ziliao.headImage ? this.ziliao.headImage : this.$store.state.userInfo.headImage,
            platformAccount: this.platInfo ? this.platInfo : this.$store.state.userInfo.platformAccount,
          };
          Info(info).then(res => {
              this.getUserInfo();
              $loading.show('修改成功！');
              setTimeout(() => {
                $loading.hide();
              }, 500);
            }
          ).catch(err => {
              this.showPopup(err.msg);
            }
          )
        }
      },
      transferMoney() {
        if (Util.isNull(this.showUserInfo.platformAccount)) {
          this.showPopup('您还没有绑定平台账号，暂时不能转账！');
        } else {
          this.$router.push({name: 'zhuan'});
        }
      },
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
      regist() {
        let that = this;
        if (this.loginLoading) {
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
        if (this.registForm.password.trim() !== this.registRepassword.trim()) {
          this.showPopup('两次输入密码不一致，请检查。');
          return;
        }
        $loading.show('注册中...');
        this.loginLoading = true;
        Regist.registUser(Util.makeJson(this.registForm)).then(res => {
            let result = res.data;
            that.loginLoading = false;
            $loading.hide();
            Util.setStorage('chatUsername', this.registForm.username);
            Util.setStorage('chatPassword', md5.makeMd5(this.registForm.password));
            Login.loginUser({username: this.registForm.username, password: this.registForm.password}).then(response => {
                let data = response.data;
                that.isLogin = Constants.isLogin = true;
                Cookie.setToken(data.token);
                if (typeof callback === "function") {
                  callback();
                }
                const userdata = {
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
                that.$root.disconnect();
                setTimeout(() => {
                  that.$root.InitSocket();
                }, 100);
              }
            )
          }
        ).catch(err => {
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
          buttons: [
            {text: '确定'},
          ]
        };
        let popup = $popup.fromTemplate('<p style="margin-bottom: 0; text-align: center;">' + data + '</p>', options);
        popup.show().then((buttonIndex) => {console.log(buttonIndex)});
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
    left: 41%;
    z-index: 100;
    font-size: 18px;
    color: #fff;
  }
</style>
