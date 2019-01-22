<template>
<div>
<div :class="{'slide-left': true, 'changehei': isSLide, 'hei': isSLide}"></div>
<div 
@click="showSlide"
v-if="isSLide" class="mask-layer"></div>
  <div class="home-context">
    <div class="page has-navbar" v-nav="{hideNavbar: true}">
      <von-header theme="light" :fixed="true">
         <!-- @click="toggleSidebar" -->
        <button 
        @click="showSlide"
        slot="left" class="button button-icon">
          <span><i class="icon ion-navicon"/></span>
        </button>
        <span slot="title">克拉克聊天室</span>
        
        <button v-if="!isLogin" slot="right" class="button button-icon" @click="onMenu"> 
          <span style="font-size: 16px; color: #fff">登录</span>
        </button>
        <!-- <div v-else slot="right" class="top-avatar">
          <div class="user-top-avatar" :style="`background:url(`+imgUrl+`images/avatar/`+userInfo.headimage+`);background-size:cover;background-position:center;`" @click="onMenu"></div>
        </div> -->
        <div v-else style="display: flex; margin-top: 5px; margin-right: 5px;" slot="right">
          <img style="margin-right: 10px" width="24" height="22" src="../../static/images/xiaoxi.png" alt="">
          <img @click="onMenu" width="22" height="22" src="../../static/images/yonghu.png" alt="">
        </div>
    </von-header>
    <tabs 
    activeIndex="4"
    fixed :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
    <div ref="messageScroll" class="page-content moveMarginBottom" @click="closeSheet" :style="`margin-bottom:`+contentMargin+`px;`">
      <div class="messages" v-show="tabIndex==0">
        <MessageItem v-for="(message,index) in messageList" :key="index" :item="message"></MessageItem>
      </div>
      <component v-show="tabIndex===1" v-bind:is="targetComponent.lottery"></component>
      <component v-show="tabIndex===3" v-bind:is="targetComponent.live"></component>
      <component v-show="tabIndex===2" v-bind:is="targetComponent.bet"></component>
      <component v-show="tabIndex===4" v-bind:is="targetComponent.customer"></component>
    </div>
    <div v-if="redBagFlag" class="redbag-container">
      <div class="red-bag">
        <h1 @click="closeWindow">x</h1>
        <div class="role-1">
          <von-input
          v-model="redForm.moneyMount"
          placeholder="请输入红包金额"
          type="tel"
          ></von-input>
        </div>
        <div class="role-2">
          <von-input
          v-model="redForm.num"
          placeholder="请输入红包个数"
          type="tel"
          ></von-input>
        </div>
        <div class="role-3">
          <p>账户余额：</p>
          <p>{{balance}}</p>
        </div>
        <div class="role-3">
            <md-button @click.native.prevent="redBagSubmit()" class="button button-assertive">
              发红包
            </md-button>
        </div>
      </div>
    </div>

    <div v-if="redStd === '1'" class="redbag-container">
      <div class="new-red-bag">
        <h1 @click="closeShow1">x</h1>
        <span>恭喜发财，大吉大利</span>
        <div @click="openRedSubmit" class="btn">
          <p>马上抢</p>
        </div>
      </div>
    </div>

    <div v-if="redStd === '3'" class="redbag-container">
      <div class="new-red-bag">
        <h1 @click="closeShow1">x</h1>
        <span>来晚了，红包已经被抢完了</span>
      </div>
    </div>

    <div v-if="redStd === '2'" class="redbag-container">
      <div class="new-red-bag">
        <h1 @click="closeShow1">x</h1>
        <div class="avatar">
          <img :src="imgUrl+'images/avatar/'+redData.redpackInfo.sendeHeadImage" alt="">
        </div>
        <div class="avatar">
          <p>{{redData.redpackInfo.senderName}}</p>
        </div>
        <div class="avatar">
          <span>{{'恭喜您抢到了'+grabMoney+'元'}}</span>
        </div>
        <div @click.prevent="openAll" style="margin-top: 75px;" class="avatar">
          <p style="color: #fa9d3b;">看看大家的手气>></p>
        </div>
      </div>
    </div>

    <div v-if="redStd === '4'" class="redbag-container">
      <div class="red-bag">
        <h1 @click="closeShow1">x</h1>
        <div class="avatar">
          <img :src="imgUrl+'images/avatar/'+redData.redpackInfo.sendeHeadImage" alt="">
        </div>
        <div class="avatar">
          <h2>{{redData.redpackInfo.name}}</h2>
        </div>
        <div class="avatar">
          <h3>{{redData.redpackInfo.amount}}</h3><h2>元</h2>
        </div>
        <div class="avatar" style="background: #e5e5e5; border-bottom: 1px solid #ccc; border-top: 1px solid #ccc; justify-content: flex-start">
          <h2 style="margin-left: 15px">已领取{{redData.redpackInfo.receivedNum}}/{{redData.redpackInfo.num}}个</h2>
        </div>
        <div class="user-can">
          <ul>
            <li v-for="(item,index) in redRecord" :key="index">
              <div class="user-imgs">
               			<img :src="imgUrl+'images/avatar/'+item.avatar">
              </div>
              <div class="list-right">
                <div class="list-right-top">
									<div class="user-name">{{item.nickname}}</div>
									<div class="user-money">{{item.money}}元</div>
                </div>
                	<div class="user-time">{{item.time|dateFormat('yyyy-MM-dd hh:mm:ss')}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-show="messageTabbar" class="tabbar moveBottom visible fixed" :style="`bottom:`+tabbarBottom+`px;`">
      <div class="message-bar">
        <!-- <a class="link push" @click="pushClick"><i class='icon ion-android-add-circle'/></a>
        <a class="link smile" @click="smileClick"><i class="icon ion-happy"></i></a> -->
        <div class="messagebar-area">
          <label>
            <textarea ref="textarea" placeholder="请输入信息" @focus="closeSheet" class="resizable textarea-class" v-model="message"></textarea>
          </label>
        </div>
        <!-- <a class="link send" @click="sendClick"><svg-icon icon-class="ios-arrow-dropup-circle"></svg-icon></a> -->
        <div style="display: flex">
          <img style="width: 31px; height: 31px; margin-right: 10px" src="../../static/images/smile.png" alt="">
          <img 
          @click="pushClick"
          style="width: 31px; height: 31px; margin-right: 10px" src="../../static/images/plus.png" alt="">
          <div
          v-if="false" 
          class="send-btn">
            发送
          </div>
        </div>
      </div>
    </div>
    <transition name="moveHeight">
    <div class="smile-box" v-show="smileShow">
      <Smile @defaultFaceChange="defaultFaceChange"></Smile>
    </div>
  </transition>
    <transition name="moveHeight">
      <div class="messagebar-sheet" v-show="sheetShow">
        <ul>
          <li @click.prevent="sendred">
            <div>
              <img style="width: 58px; height: 58px;" src="../../static/images/bar/xiangce.png" alt="">
            </div>

            <div class="sheet-text">相册</div>
          </li>
          <li style="position: relative" @click="qiandao">
            <div>
              <img style="width: 58px; height: 58px;" src="../../static/images/bar/hongbao.png" alt="">
            </div>
            <div class="sheet-text">红包</div>
          </li>
          <li style="position: relative" v-if="isOnline">
              <vue-core-image-upload
                :crop="false"
                @imageuploaded="uploadImgSuccess"
                @errorhandle="uploadImgError"
                :text="''"
                :headers="{token: userToken}"
                :maxFileSize="2048000"
                :inputAccept="'image/*'"
                url="http://api.7873222.com/api/upload">
              </vue-core-image-upload>
          </li>
        </ul>
      </div>
    </transition>
  </div>
    <div ref="OnlineUserTemplate" style="display: none;">
      <div class="user-list-box">
        <div class="item item-divider pb0">
          在线人数{{'('+UserCount+')'}}
        </div>
        <div class="item item-divider">
          在线管理/客服
          
          <!-- <item v-else v-for="item in manageList" class="item-icon-left right">
            {{item.nickname}}
            <div class="user-item-avatar" :style="'background:url('+imgUrl+'images/avatar/'+item.avatar+');background-size: 32px 32px; background-size:cover;background-position:center;'"></div>
            <div class="user-item-grade">
              <img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
            </div>
            <i class="icon ion-ios-arrow-right"></i>
          </item>   -->
        </div>

        <template>
          <p v-if="manageList.length === 0" style="margin: 15px 0 -20px 5px; font-size: 12px;">暂时没有客服在线</p>
          <item class="item-icon-left right" v-for="(item, index) in manageList" :key="index">
            {{item.nickname}}
            <div class="user-item-avatar" :style="'background:url('+imgUrl+'images/avatar/'+item.avatar+');background-size: 32px 32px; background-size:cover;background-position:center;'"></div>
            <div class="user-item-grade">
              <img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
            </div>
            <i class="icon ion-ios-arrow-right"></i>
          </item>
        </template>
        
        <div class="item item-divider">
          在线会员
        </div>
        <item v-for="(item,index) in userDegree['6']" class="item-icon-left right" :key='index'>
          {{item.nickname}}
          <div class="user-item-avatar" :style="'background:url('+imgUrl+'images/avatar/'+item.avatar+');background-size: 32px 32px; background-size:cover;background-position:center;'"></div>
          <div class="user-item-grade">
            <img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
          </div>
          <i class="icon ion-ios-arrow-right"></i>
        </item>
        <item v-for="(item,index) in userDegree['5']" class="item-icon-left right" :key='index'>
          {{item.nickname}}
          <div class="user-item-avatar" :style="'background:url('+imgUrl+'images/avatar/'+item.avatar+');background-size:cover;background-position:center;'"></div>
          <div class="user-item-grade">
            <img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
          </div>
          <i class="icon ion-ios-arrow-right"></i>
        </item>
        <item v-for="(item,index)  in userDegree['4']" class="item-icon-left right" :key='index'>
          {{item.nickname}}
          <div class="user-item-avatar" :style="'background:url('+imgUrl+'images/avatar/'+item.avatar+');background-size:cover;background-position:center;'"></div>
          <div class="user-item-grade">
            <img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
          </div>
          <i class="icon ion-ios-arrow-right"></i>
        </item>
        <item v-for="(item,index)  in userDegree['3']" class="item-icon-left right" :key='index'>
          {{item.nickname}}
          <div class="user-item-avatar" :style="'background:url('+imgUrl+'images/avatar/'+item.avatar+');background-size:cover;background-position:center;'"></div>
          <div class="user-item-grade">
            <img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
          </div>
          <i class="icon ion-ios-arrow-right"></i>
        </item>
        <item v-for="(item,index)  in userDegree['2']" class="item-icon-left right" :key='index'>
          {{item.nickname}}
          <div class="user-item-avatar" :style="'background:url('+imgUrl+'images/avatar/'+item.avatar+');background-size:cover;background-position:center;'"></div>
          <div class="user-item-grade">
            <img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
          </div>
          <i class="icon ion-ios-arrow-right"></i>
        </item>
        <item v-for="(item,index)  in userDegree['1']" class="item-icon-left right" :key='index'>
          {{item.nickname}}
          <div class="user-item-avatar" :style="'background:url('+imgUrl+'images/avatar/'+item.avatar+');background-size:cover;background-position:center;'"></div>
          <div class="user-item-grade">
            <img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
          </div>
          <i class="icon ion-ios-arrow-right"></i>
        </item>
        <item v-for="(item,index)  in userDegree['0']" class="item-icon-left right" :key='index'>
          {{item.nickname}}
          <div class="user-item-avatar" :style="'background:url('+imgUrl+'images/avatar/'+item.avatar+');background-size:cover;background-position:center;'"></div>
          <div class="user-item-grade">
            <img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
          </div>
          <i class="icon ion-ios-arrow-right"></i>
        </item>

      </div>
  </div>
  <LiveModal ref="loginModal" title="欢迎登录" theme="default">
    <div class="page-content padding padding-top login-context">
      <von-input type="text" v-model="loginForm.username" placeholder="用户名/手机号" label="会员账号"></von-input>
        <von-input type="password" v-model="loginForm.password" placeholder="登录密码" label="登录密码" style="margin-bottom: 5px;"></von-input>
        <div class="item item-divider">
          <a :href="chatUrl" target="_blank" class="red">忘记密码？</a>
        </div>
        <div class="padding">
          <button class="button button-positive button-block" @click="loginClick">确认登录</button>
        </div>
        <div class="item item-divider">
          <a :href="chatUrl" target="_blank">没有账号，立即注册！</a>
        </div>
    </div>
  </LiveModal>
  </div>
</div>
</template>

<script>
import MessageItem from '@/components/messageItem.vue'
import Smile from '@/components/smile.vue'
import Customer from '@/components/customer.vue'
import Bet from '@/components/bet.vue'
import Live from '@/components/live.vue'
import Lottery from '@/components/lottery.vue'
import PrettyLive from '@/components/prettylive.vue'
import Constants from '@/utils/constants'
import Login from '@/api/login'
import Red from '@/api/redbag'
import SigninApi from '@/api/signin'
import User from '@/api/user'
import VueCoreImageUpload from 'vue-core-image-upload'

import Util from '@/utils/util'
import Cookie from '@/utils/auth'
import md5 from '@/utils/md5Utils'
import '@/assets/css/home.less'
import '@/assets/css/redbag.less'
import '../assets/css/silde.less'

export default {
  name: 'Home',
  components:{
    MessageItem,
    Smile,
    Customer,
    Bet,
    Live,
    Lottery,
    VueCoreImageUpload
  },
  data () {
    return {
      chatUrl:Constants.chatUrl,
      imgUrl:Constants.staticUrl,
      isSLide: false,
      tabs:[
          "聊天",
          '计划',
          "投注",
          "开奖",
          "直播",
      ],
      tabIndex: 4,
      targetComponent: {
          msg: MessageItem,
          lottery: Lottery,
          live: Live,
          bet: Bet,
          customer: PrettyLive
      },
      menuButtonText:'',
      message:'',
      sheetShow:false,
      smileShow:false,
      sheetHeight:90,
      tabbarBottom:0,
      contentMargin: 0,
      loginLoading: false,
      isLogin:false,
      messageTabbar: false,
      isScroll:true,
      userInfo:{},
      loginForm:{
        username:'',
        password:''
      },
      messageList:[],
      isSendMessage:false,
      redBagFlag: false,
      balance: '0.00',
      grabMoney: '0',
      redForm: {
        moneyMount: '',
        num: ''
      },
      redId: '',
      redBagStutas: '',
      redData:{
					redpackInfo:{}
      },
      redRecord:[],
      isSignin: Boolean,
      manageList: [],
      UserCount: 0,
      uploadImgToken: this.$store.state.token,
  		userDegree: {
        '6': [],
        '5': [],
        '4': [],
        '3': [],
        '2': [],
        '1': [],
        '0': [] 
      }
    }
  },
  watch: {
    redStd(data) {
      if(data === '2') {
        Red.getDetail({
          redpacketId: this.$store.state.redBagId
        }).then(
          res => {
            this.redData = res.data;
          }
        )
      }
    }
  },

  computed: {
    redStd() {
      return this.$store.state.redBagStutas
    },
    userToken() {
      return this.$store.state.token
    },
    isOnline() {
      return this.$store.state.isLogin
    }
  },
  created() {
    this.getUserList();
  },
  mounted(){
    var that = this;
    this.isQiandao();
    // if(!Constants.isLogin) {
    //   that.$root.InitSocket();
    // }
    //用户上线事件发布
    this.$root.eventHub.$on("onlineEvent",item=>{
    // that.OnLineUserList.splice(0);
      var bool = true;
      this.dealUserList(item);
      
    });
        //断开连接
    this.$root.eventHub.$on("disconnectEvent",item=>{
    console.log(item);
    if(item.user_degree !== '0') {
      this.getUserList()
    }				
    });
    //显示登陆框事件
    this.$root.eventHub.$on("showLoginEvent",item=>{
      that.$refs.loginModal.show();
    });
    //接收到公共消息事件
    this.$root.eventHub.$on("ReceiveMessageEvent",item=>{
        //接收消息回调
        that.messageList.push(item);
        if(that.isScroll){
            setTimeout(()=>{
              that.scrollToBottom();
            },200);
        }
    });
    //发送消息完成事件发布
    this.$root.eventHub.$on("sendMessageCompleteEvent",item=>{
      that.message = null;
      that.isSendMessage = false;
    });
    this.$nextTick(()=> {
      this.getUserInfo();
      this.scrollToBottom();
    });
  },
  methods: {
    showSlide() {
      this.isSLide = !this.isSLide;
    },
    checkBeen(arr, item) {
				for(let i=0; i<arr.length; i++) {
					if(item === arr[i].userid) {
						arr.splice(i, 1);
						return true						
					} else {
						return false
					}
				}
				console.log(arr)
			},
			checkRepeat(arr, item) {
				for(let i=0; i<arr.length; i++) {
					if(item === arr[i].userid) {
						return true
					} else {
						return false
					}
				}
			},
    dealUserList(item) {
				let obj = {
					userid: item.user_id,
					nickname: item.nickname,
					flag:item.user_flag,
					grade:Util.isNull(item.user_degree) ? 0 : item.user_degree,
					avatar: (item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.gif' :item.head_image,
					sessionid: item.sessionid,
				}
				if(obj.flag === '1') {
					switch (obj.grade-0) {
						case 6 :
							if(!this.checkRepeat(this.userDegree['6'], obj.userid)) {
								this.UserCount ++;
								this.userDegree['6'].push(obj);
							}
							break
						case 5 :
							if(!this.checkRepeat(this.userDegree['5'], obj.userid)) {
								this.UserCount ++;
								this.userDegree['5'].push(obj);
							}
							break
						case 4 :
							if(!this.checkRepeat(this.userDegree['4'], obj.userid)) {
								this.UserCount ++;
								this.userDegree['4'].push(obj);
							}
							break
						case 3 :
							if(!this.checkRepeat(this.userDegree['3'], obj.userid)) {
								this.UserCount ++;
								this.userDegree['3'].push(obj);
							}
							break
						case 2 :
							if(!this.checkRepeat(this.userDegree['2'], obj.userid)) {
								this.UserCount ++;
								this.userDegree['2'].push(obj);
							}
							break
						case 1 :
							if(!this.checkRepeat(this.userDegree['1'], obj.userid)) {
								this.UserCount ++;
								this.userDegree['1'].push(obj);
							}
							break	
						case 0 :
							if(!this.checkRepeat(this.userDegree['0'], obj.userid)) {
								this.userDegree['0'].push(obj);
							}
							break
					}
				} else if(obj.flag === 2){
					if(!this.checkRepeat(this.manageList, obj.userid)) {
						this.manageList.push(obj);
					}
				}
				
			},
    uploadImgOverflow(err) {
        this.showPopup(`图片超过限定大小！`);		
        return false		      
    },
		uploadImgError(err) {
        this.showPopup(`上传图片出错! ${err}`);				
		},
    uploadImgSuccess(callbackData) {
        console.log(callbackData)
				if(callbackData.code !== 0) {
          this.showPopup('上传图片出错！');
					return false
				} else {
					//todo 
					let img = callbackData.url ; //+ '?imageView2/2/w/340'
					this.imgUri = img;
					var jsonMsg = {
						type: 'message',
						mtype: 'user',
						fromuserid: this.userInfo.userid,
						fromnickname: this.userInfo.nickname,
						fromuserheadimage: this.userInfo.headimage,
						fromuseruserdegree: this.userInfo.userdegree,
						fromuseruserflag: this.userInfo.userflag,
						touserid: '',
						tousernickname: '',
						content: {
							id: 1,
							msg: img
						}
					};
					if(this.userInfo.userflag == 2) {//管理员
						jsonMsg.mtype = 'manage';
					}
					this.$root.sendToAll(jsonMsg);
				}
			},
    uploadImg(){
      var grade = this.$store.state.userInfo.userdegree;
      var flag = this.$store.state.userInfo.userflag;
      if(flag == 1){
        if( grade < 3){
          $toast.show(`您没有上传图片的权限！`, 1500);
          return false;
        }
      }
      return true; 	
    },
    randerList() {
      if(!Util.isNull(this.$root.sidebar)){
        console.log('-sidebar销毁-->');
        this.$root.sidebar = null;
        $sidebar.destroy();
      }
      var template = this.$refs.OnlineUserTemplate.innerHTML;
      if(Util.isNull(this.$root.sidebar)) {
        console.log('-sidebar创建-->');
        this.$root.sidebar = $sidebar.fromTemplate(template, {position: 'left'})
      }
    },
    getUserList(info){//获取用户列表
				var that = this;
				for(let i in this.userDegree) {
					this.userDegree[i].splice(0);
				}
				User.getList().then(response =>{
					const data = response.data;
					var temp = data;
					var manaeeTemp = [];
					if(info) {
						let tip = {
							userid: info.userid,
							user_degree: info.userdegree,
							nickname: info.nickname,
							grade: Util.isNull(info.userdegree) ? 0 : info.userdegree,
							avatar: info.headimage,
						}
						this.userDegree[info.userdegree].push(tip);
					}
					data.forEach(item =>{
						//debugger
						if(item.user_id !== that.userInfo.userid && item.user_flag == 1){
							const obj = {
								userid: item.user_id,
								user_degree: item.user_degree,
								nickname: item.nickname,
								grade: Util.isNull(item.user_degree) ? 0 : item.user_degree,
								avatar: (item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.gif' :item.head_image,
								sessionid: item.sessionid
							};
							
							var isRepeat = true;
							temp.forEach(tempItem=> {
								if(tempItem.userid == item.user_id) {
									isRepeat = false;
								}
							});
							if(isRepeat) {
								// temp.push(obj);
								switch (obj.user_degree-0) {
									case 6 :
										this.userDegree['6'].push(obj);
										break
									case 5 :
										this.userDegree['5'].push(obj);
										break
									case 4 :
										this.userDegree['4'].push(obj);
										break
									case 3 :
										this.userDegree['3'].push(obj);
										break
									case 2 :
										this.userDegree['2'].push(obj);
										break
									case 1 :
										this.userDegree['1'].push(obj);
										break	
									case 0 :
										this.userDegree['0'].push(obj);
										break
								}
							}							
						} 
						else if(item.user_flag === '2') {
							const obj = {
								userid:item.user_id,
								nickname:item.nickname,
                flag:item.user_flag,
                grade: Util.isNull(item.user_degree) ? 0 : item.user_degree,
								avatar:(item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.gif' :item.head_image
							};
							var isRepeat = true;
							manaeeTemp.forEach(tempItem=> {
								if(tempItem.userid == item.user_id){
									isRepeat = false;
								}
							});
							if(isRepeat){
								manaeeTemp.push(obj);
							}
						}
					});
					that.OnLineUserList = temp;
					that.tempOnLineUserList = temp;
					let num = Constants.isLogin?1:0;
					// for(let j=0; j<that.OnLineUserList.length; j++) {
					// 	if(that.OnLineUserList[j].user_degree > 0) {
					// 		num++
					// 	}
					// }
					that.UserCount = data.length + num;
					that.manageList = manaeeTemp;
				});
			},
    sendGift() {
      $toast.show('敬请期待', 1500);
    },
    qiandao() {
      if(!this.$store.state.isLogin) {
        this.showPopup('亲，请先登录哦！');
        return false
      }
      if(this.isSignin) {
        this.showPopup('今日已经签到过了！');
        return false
      }
      SigninApi.checkIn().then(
        res => {
          this.isSignin = true;
          $toast.show(`签到成功，获得${res.data.gold}金币`, 1500);
        }
      )
    },
    isQiandao() {
				SigninApi.checkSigin().then(response =>{
					let data = response.data;
					this.isSignin = data.isqiandao == 1 ? true : false;
				}).catch(error =>{
          //$toast.show(error.message || error.msg, 1500);
        });
    },
    openAll(){//查看大家手气
      this.redRecord = [];
      this.redData.packList.forEach(item =>{
        var record = {
          avatar:item.receiverHeadImage,
          nickname:item.receiverName,
          money:item.money,
          time:item.receiveTime
        };
        this.redRecord.push(record);
      });
      this.$store.commit('UPDATE_STD', '4')
      // this.grabRedModal = false;//关闭红包窗口
      // this.redInfoModal = true;//显示红包记录窗口
      // this.redRecordType = 1;//显示抢红包全部记录
    },
    closeShow1() {
      this.$store.commit('UPDATE_STD', '')
    },
    getRedId(data) {
      console.log(data +'methods')
    },
  	openRedSubmit() {
      var that = this;
      let id = this.$store.state.redBagId;
      Red.grab(id).then(response =>{
        let data = response.data;
        console.log(data)
        that.redData = data;
        this.$store.commit('UPDATE_STD', '2');
        // that.grabRedModal = true;
        // if(data.status === 3){ //已抢完
        // 	that.grabIn = 2;
        // }else if(data.status === 2){//已领取
        // 	//已领取显示抢红包记录页面
        // 	that.redRecordType = 1;
        // 	that.openAll();
        // }else if(data.status === 1){


        // }
        // that.grabIn = 3;
        that.grabMoney = data.receivedRedpack.money;
        // that.grabLoading = false;

      })
    },
    closeWindow() {
      for(let i in this.redForm) {
        this.redForm[i] = ''
      }
      this.redBagFlag = false
    },
    redBagSubmit() {
      if(Util.isNull(this.redForm.moneyMount)) {
        this.showPopup('红包金额不能为空！');
        return false
      }
      if(Util.isNull(this.redForm.num)) {
        this.showPopup('红包个数不能为空!');
        return false
      }
      if(!Util.isNumber(Number(this.redForm.moneyMount))) {
        this.showPopup('请输入正确的红包金额!');
        return false
      }
      if(!Util.isNumber(Number(this.redForm.num))||Number(this.redForm.num<=0)) {
        this.showPopup('请输入正确的红包个数!');
        return false
      }
      if(this.redForm.moneyMount<5) {
        this.showPopup('金额必须大于5元!');
        return false
      }
      if(this.redForm.moneyMount>this.balance) {
        this.showPopup('红包金额不能大于账户余额!')
      }
      var params = {
					num:this.redForm.num,
					amout:this.redForm.moneyMount,
					remarks: '恭喜发财,大吉大利'
				}
				Red.send(params).then(response =>{
					// this.sendRedLoading = false;
          // this.sendRedModal = false;
          this.redBagFlag = false;
				}).catch(error =>{
					// this.sendRedLoading = false;
				});
    },
    getBalance() {
      Red.getBalance().then(
        res => {
          this.balance = res.data.money;
        }
      )
    },
    sendred() {
      this.sheetShow = !this.sheetShow;
        if(this.sheetShow){
          this.tabbarBottom = this.sheetHeight;
          this.contentMargin += this.sheetHeight;
        }else{
          this.tabbarBottom = 0;
          this.contentMargin -= this.sheetHeight;
        }
      this.tabbarBottom = 0;
      if(!this.$store.state.isLogin) {
        this.showPopup('需要登录才能使用该功能哦');
        return false
      }
      this.getBalance();
      this.redBagFlag = true;
    },
    showPopup(data) {
      let options = {
        effect: 'scale',
        title: '温馨提示',
        showClose: true,
        buttons: [
          {text: '确定'},
        ]
      }
      let popup = $popup.fromTemplate('<p style="margin-bottom: 0; text-align: center;">'+data+'</p>', options)

      popup.show().then((buttonIndex) => {
        console.log(buttonIndex)
      })
    },
    toggleSidebar() {
      this.randerList();
      this.$root.sidebar.toggle()
    },
    onMenu(){
      this.$router.push({name: 'regist'})
    },
    pushClick(){
        this.smileShow = false;
        this.sheetShow = !this.sheetShow;
        if(this.sheetShow){
          this.tabbarBottom = this.sheetHeight;
          this.contentMargin += this.sheetHeight;
        }else{
          this.tabbarBottom = 0;
          this.contentMargin -= this.sheetHeight;
        }
    },
    closeSheet(){
      if(this.sheetShow){
        this.sheetShow = false;
        this.tabbarBottom = 0;
        this.contentMargin -= this.sheetHeight;
      }
      this.smileShow = false;
    },
    sendClick(){
      if(!this.$root.isSocketConnect){
          $toast.show('网络异常与服务器连接已断开。', 1500);
          return;
      }
      let text = this.message.replace(/&nbsp;/ig,'').trim();
      if(Util.isNull(text)) {
        $toast.show('不能发送空白消息。', 1500);
        return
      }
      var grade = this.$store.state.userInfo.userdegree;
      var flag = this.$store.state.userInfo.userflag;
      if(flag == 1){
        if( grade === 1 || grade === 0){
          $toast.show('没有发言权限！', 1500);
          return;
        }
      }
      if(this.isSendMessage){
        return;
      }
      this.isSendMessage = true;
      var jsonMsg = {
          type:'message',
          mtype:'user',
          fromuserid:this.userInfo.userid,
          fromnickname:this.userInfo.nickname,
          fromuserheadimage:this.userInfo.headimage,
          fromuseruserdegree:this.userInfo.userdegree,
          fromuseruserflag:this.userInfo.userflag,
          touserid:'',
          tousernickname:'',
          senttype:'received',
          content:{
            id:0,
            msg:this.message
          }
        };
        if(this.userInfo.userflag == 2) {//管理员
          jsonMsg.mtype = 'manage';
        }
        this.$root.sendToAll(jsonMsg);
    },
    smileClick(){
      if(this.sheetShow){
        this.sheetShow = false;
        this.tabbarBottom = 0;
        this.contentMargin -= this.sheetHeight;
      }
      this.smileShow = !this.smileShow;
    },
    onTabClick(index) {
      console.log(this.activeIndex)
      this.tabIndex = index;
      this.messageTabbar = false;
      this.sheetShow = false;
      this.tabbarBottom = 0;
      this.contentMargin = 0;
      if(index === 4) {
        this.$router.push({name: 'prettylive'})
      } 
    //   else if(index === 0) {
    //     this.$router.push({name: 'Home'})
    //   } else if(index === 1) {
    //     this.$router.push({name: 'plan'})
    //   } else if(index === 2) {
    //     this.$router.push({name: 'bet'})
    //   } else {
    //     this.$router.push({name: 'lotteryopen'})
    //   }
      if(index == 0) {//表示选择了聊天
        this.contentMargin = 48;
        this.messageTabbar = true;
      }
    },
    defaultFaceChange(item){
      if(Util.isNull(this.message)) {
        this.message = ''
      }
      this.message += item;
    },
    loginClick(){
      var that = this;
      if(this.loginLoading){
        return;
      }

      if(!this.loginForm.username.trim()){
        $dialog.alert({
          content: '请输入您的会员账号',
          okTheme: 'positive',
          effect: 'slide'
        }).then(() => {
          console.log('alert hide.')
        })
        return;
      }
      if(!this.loginForm.password.trim()){
        $dialog.alert({
          content: '请输入登录密码',
          okTheme: 'positive',
          effect: 'slide'
        }).then(() => {
          console.log('alert hide.')
        })
        return;
      }
      $loading.show('正在登录...');
      this.loginLoading = true;
      Login.loginUser(this.loginForm).then(response =>{
          const data = response.data;
          that.loginLoading = false;
          $loading.hide();
          that.isLogin = Constants.isLogin = true;
          Cookie.setToken(data.token);
          const userdata = {
            userid:data.user.userId,
            username: data.user.username,
            nickname: data.user.nickname,
            userflag:data.user.userFlag,
            headimage:Util.isNull(data.user.headImage)?'default.gif':data.user.headImage,
            userdegree:data.user.userDegree,
            gender: data.user.gender,
            loginCount: data.user.loginCount,
            createTime: data.user.createTime,
            userFlag: data.user.userFlag,
            selfIntroduction: data.user.selfIntroduction,
            gold: data.user.gold,
            platformAccount: data.user.platformAccount,
          };
          this.userDegree[userdata.userdegree].push(userdata);
          that.userInfo = userdata;
          if(that.$store){
            that.$store.commit("SET_USER_INFO",userdata);
            that.$store.commit("SET_TOKEN",data.token);
            that.$store.commit("SET_LOGIN",true);
          }
          this.$refs.loginModal.hide();
          that.$root.disconnect();
          setTimeout(()=>{
            that.$root.InitSocket();
          },100);
          }).catch(error =>{
          that.loginLoading = false;
          $loading.hide();
      });
    },
    getUserInfo(){
      var that = this;
        Login.getInfo().then(response =>{
          const data = response.data;
          this.isLogin = Constants.isLogin = true;
            const userdata = {
              userid:data.userId,
              username: data.username,
              nickname: data.nickname,
              userflag:data.userFlag,
              headimage:Util.isNull(data.headImage)?'default.gif':data.headImage,
              userdegree:data.userDegree,
              gender: data.gender,
              loginCount: data.loginCount,
              createTime: data.createTime,
              userFlag: data.userFlag,
              selfIntroduction: data.selfIntroduction,
              gold: data.gold,
              platformAccount: data.platformAccount,
          }
          that.userInfo = userdata;
          if(that.$store){
              that.$store.commit("SET_USER_INFO",userdata);
              that.$store.commit("SET_LOGIN",true);
          }
          // that.$root.InitSocket();
        }).catch(error =>{
          that.isLogin = Constants.isLogin = false;
          var rname = md5.getMd5();
          const userdata = {
            userid:rname,
            nickname:'游客'+rname,
              userflag:1,
              headimage:'default.gif',
              userdegree:0
          }
          that.userInfo = userdata;
          if(that.$store){
            that.$store.commit("SET_USER_INFO",userdata);
            that.$store.commit("SET_LOGIN",false);
          }
          that.$root.InitSocket();
        });
    },
    scrollToBottom(){
      var div = this.$refs.messageScroll;
      if(div && div.scrollHeight){
        div.scrollTop = div.scrollHeight;
      }

    }
  },
  beforeDestroy(){
    this.isSignin = false
  }
}
</script>
<style>
  .bar.bar-header {
    background: #EE0024;
  }
  .bar.bar-light .title{
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
.bar .title+.button:last-child {
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
  color: #EE0024;
  border: 0px solid #EE0024;
}
.tabs-striped.tabs-color-positive .tab-item {
  color: #444;
}
.textarea-class {
  width: calc(100vw - 110px) !important;
  height: 15px;
  margin-left: 10px !important;
  padding: 11px;
  overflow-y: scroll;
  border: 1px solid #DBDBDB !important;
  border-radius: 3px !important;
  resize: none;
  font-size: inherit;
  color: #000 !important;
  outline: none;
}
.send-btn {
  width: 40px;
  height: 30px;
  margin-right: 10px;
  border-radius: 3px;
  background: rgb(39, 156, 10);
  text-align: center;
  font-size: 14px;
  line-height: 30px;
  color: #fff;
}

</style>
