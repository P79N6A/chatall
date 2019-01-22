<template>
  <div>
    <Modal
      v-model="showloginlogout"
      :mask-closable='false'
      width='400px'
      id='loginlogout'
      >
      <div slot='header'>
        <div class='header1'>
          <img src="/static/images/avatar/15.png" alt="">
        </div>
      </div>
      <div slot="footer">
        <Button @click="toregister" v-if='register'>立即注册</Button>
        <Button @click="tologin" v-if='login'>立即登录</Button>
      </div>
      <div>
        <Form  :model="loginUser" :rules="ruleCustom" ref='loginUser'>
          <FormItem  prop="userName">
            <Input v-model="loginUser.userName" placeholder="请输入会员昵称" type="text">
               <Icon type="md-person"  slot = "prefix"/>
            </Input>
          </FormItem >
          <FormItem  prop="userPassword" ref="repassword">
            <Input v-model="loginUser.userPassword" placeholder="请输入密码" type='password'>
               <Icon type="md-lock" slot = "prefix"/>
            </Input>
          </FormItem>
          <FormItem prop='userRePassword' >
            <Input v-model="loginUser.userRePassword" placeholder="请确认登录密码" type='password'>
               <Icon type="md-lock" slot = "prefix"/>
            </Input>
          </FormItem>
          <FormItem prop="userIvatationCode" >
            <Input v-model="loginUser.userIvatationCode" placeholder="输入邀请码(必填)" type='text'>
              <Icon type="md-mail" slot="prefix" />
            </Input>
          </FormItem>
          <FormItem prop="userPlatAccout">
            <Input v-model="loginUser.userPlatAccout" placeholder="输入平台账号，以便领取红包(非必填)" type="text">
              <Icon type="md-mail" slot="prefix" />
            </Input>
          </FormItem>
          <FormItem  prop='userCheckcode' >
            <Input v-model="loginUser.userCheckcode" placeholder="请输入验证码"  type="text">
               <Icon type="md-phone-portrait" slot="prefix"/>
            </Input>
            <div class='checkcode' @click='checkcode'>
              <img :src="'data:image/png;base64,' + base64Img" alt="">
            </div>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('loginUser')">Submit</Button>
        </FormItem>
        </Form>
      </div>

    </Modal>
    <Button type="info" @click="openlogin"  >登录</Button>
    <Button type="success" @click="openregister">注册</Button>

  </div>
</template>
<script>
import Login from '@/api/login'
import Regist from '@/api/regist'
import md5 from '@/utils/md5Utils'
import Util from '@/utils/util'
export default {
  name:"loginlogout",
  data(){
    const validateuserName= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入会员昵称'));
                } else if (value.length < 6 || value.length > 10) {
                    callback(new Error('会员账号6-10位'));
                } else if (!Util.loginvalidate(value)) {
                    callback(new Error('会员账号名称由字母数字组成'));
                } else {
                  callback();
                }
                    };
    const validateuserPassword = (rule, value, callback) => {
              if (value === '') {
                  callback(new Error('请输入密码'));
              } else if (value.length < 6 || value.length > 20) {
                  callback(new Error('密码长度6-20位'));
              } else  {
                  callback();
              }
          };
    const validateuserIvatationCode = (rule, value, callback) => {
                if (!value) {
                     callback(new Error('请输入邀请码'));
                }else  {
                  callback();
              }
            };
    const validateuserPlatAccout = (rule, value, callback) => {
                if (!value) {
                     callback(new Error('请输入平台名称'));
                }else  {
                  callback();
              }
            };
      const validateuserCheckcode = (rule, value, callback) => {
                if (!value) {
                     callback(new Error('验证码错误'));
                }else  {
                  callback();
              }
            };
      const validateuserRePassword = (rule, value, callback) => {
                if (value!==this.loginUser.userPassword) {
                     callback(new Error('密码不一致'));
                }else  {
                  callback();
              }
            };
    return {
       ruleCustom: {
                    userName: [
                        { validator: validateuserName, trigger: 'blur' }
                    ],
                    userPassword: [
                        { validator: validateuserPassword, trigger: 'blur' }
                    ],
                    userIvatationCode: [
                        { validator: validateuserIvatationCode, trigger: 'blur' }
                    ],
                    userRePassword :[
                        {validator: validateuserRePassword, trigger: 'blur'}
                    ],

                    userPlatAccout: [
                        { validator: validateuserPlatAccout, trigger: 'blur' }
                    ],
                    userCheckcode: [
                        { validator: validateuserCheckcode, trigger: 'blur' }
                    ],
                },
      base64Img:'',
      loginForm: {
					username: '',
          password: '',
          website: ''
				},
      loginUser:{
        userName:'',
        userPassword:'',
        userIvatationCode:'',
        userPlatAccout:'',
        userCheckcode:'',
        website: "9935333.com"
      },
      showloginlogout:false,
      register:false,
      userName:'',
      userPassword:'',
      userCheckcode:'',
      register:false,
      login:false
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
     handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        this.toregister();
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
    checkcode() {
      Regist.getRegistCode().then( res => {
        this.base64Img= res.data;
      })
    },
    openlogin(){
      this.showloginlogout=true;
      if (this.register ===true){
        this.register=false
      }
      this.login=true;
    },
    openregister(){

      this.showloginlogout=true;
      if (this.login === true) {
        this.login =false;
      }
      this.register=true;
    },
    toregister() {
      let md5_registPassword=md5.makeMd5(this.loginUser.userPassword)
      let data=Util.makeJson(
            {
              username: this.loginUser.userName,
							password: md5_registPassword,
              website:  this.loginUser.website,
              platformAccount: this.loginUser.userPlatAccout,
              invitationcode: this.loginUser.userIvatationCode,
					    vcode:this.loginUser.userCheckcode
            }
          );
      Regist.registUser(data).then(res => {
        console.log(res.data);
      })

    },
    tologin (){
      this.loginForm.website = "9935333.com";
      this.loginForm.username= this.userName;
      this.loginForm.password= md5.makeMd5(this.userPassword);
      Login.loginUser(this.loginForm).then(res => {
        this.$root.eventHub.$emit("onLiveChatEvent");

             //登录后跳转到主页
            //  that.$root.disconnect();
             this.$router.push('/index')
      });


    }
  }
}



</script>
