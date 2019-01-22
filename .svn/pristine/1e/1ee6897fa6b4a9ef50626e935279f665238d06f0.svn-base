import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import '@/assets/css/index.less'
import '@/assets/css/notification.less'
import '@/assets/css/tabs.less'
import 'swiper/dist/css/swiper.css';
import 'animate.css'
import 'vue2-toast/lib/toast.css'
import Scrollbar from './scrollbar/index.js';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import Toast from 'vue2-toast'
import Store from '@/utils/vuexStore'
import Util from '@/utils/util'
import VueFilter from '@/utils/vueFilter.js'
import { Notification,Tabs,TabPane} from 'element-ui';
import Stomp from 'stompjs'
import Emoji from '@/utils/dealemoji.js'
import emojidata from '@/assets/js/emojidata.js'

Vue.use(Toast,{
  duration: 2000,
  wordWrap: true
});
Vue.use(Vuex)
for(let key in VueFilter){
  Vue.filter(key,VueFilter[key]);
}
library.add(solid)
library.add(regular)
library.add(brands)
Vue.component('font-awesome-icon', FontAwesomeIcon)
const store = new Vuex.Store(Store);
Vue.use(iview);
Vue.use(Scrollbar)
Vue.use(Tabs);
Vue.use(TabPane);
Vue.config.productionTip = false
//Vue.prototype.ChatClient = ChatClient
/* eslint-disable no-new */
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
  this.splice(index, 1);
  }
};
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  router,
  data:{
  	eventHub:new Vue(),
    stompClient:null,
    isSocketConnect:false,
    tx:null
  },
  render: h => h(App),
  methods:{
    InitSocket(){
      var headers = {
          user_id:store.state.userInfo.userid,
          token:store.state.token,
          fromnickname:store.state.userInfo.nickname,
          user_flag:store.state.userInfo.userflag,
          head_image:store.state.userInfo.headimage,
          user_degree:store.state.userInfo.userdegree,
          client:'PC'
      }
      var that = this;
      //连接websocket后端服务器
      this.stompClient = Stomp.client(process.env.SOCKET_ADDRESS);
      this.stompClient.connect(headers, frame=> {
          this.isSocketConnect = true;
          //广播
          this.stompClient.subscribe('/topic/public', greeting=>{  
            console.log('广播--->'+greeting.body);
            let news = JSON.parse(greeting.body);
            if(news.type === 'message'&&(news.mtype === 'user'||news.mtype === 'manage')) {
              if(news.content.id-0 === 1) {
                news.content.msg = '<img src="http://' + news.content.msg + '?imageView2/2/w/340">'
              }
              let firstDeal = Emoji(news.content.msg);
              if(typeof firstDeal !== 'string') {
                
                let emojiMsg = '';
                let speEmoji = ['[鲜花]', '[顶一个]', '[赞]', '[大鲜花]', '[赞一个]', '[掌声]'];
                for(let i=0;i<firstDeal.length;i++) {
                  if(speEmoji.includes(firstDeal[i])) {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    emojiMsg += m;
                  } else {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img style="width: 24px" src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    emojiMsg += m;
                  }
                }
                news.content.msg = emojiMsg;
              }
            }
            
            that.receiveMessage(news);
          });
          //个人
          this.stompClient.subscribe('/user/' + store.state.userInfo.userid + '/message',function(greeting){  
              console.log('个人'+greeting.body);
              if(JSON.parse(greeting.body).mtype === 'kickout') { //不可以放在用户函数内
                that.$root.disconnect();  
                that.$Modal.error({
                  title: '错误提示',
                  content: '您的账号在其他地方登录，您被迫下线！',
                  onOk() {
                    window.location.reload();
                  }
                })
                setTimeout(() => {
                  window.location.reload();
                }, 1500)    
                return
            }
            let news = JSON.parse(greeting.body);
            if(news.type === 'message'&&(news.mtype === 'user'||news.mtype === 'manage')) {
              if(news.content.id-0 === 1) {
                news.content.msg = 'http://' + news.content.msg + '?imageView2/2/w/340'
              }
              let firstDeal = Emoji(news.content.msg);
              if(typeof firstDeal !== 'string') {
                
                let emojiMsg = '';
                let speEmoji = ['[鲜花]', '[顶一个]', '[赞]', '[大鲜花]', '[赞一个]', '[掌声]'];
                for(let i=0;i<firstDeal.length;i++) {
                  if(speEmoji.includes(firstDeal[i])) {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    emojiMsg += m;
                  } else {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img style="width: 24px" src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    emojiMsg += m;
                  }
                }
                news.content.msg = emojiMsg;
              }
            }
              that.privateReceiveMessage(news);
          });
      },error=> {
        this.isSocketConnect = false;
        this.$Modal.error({
            title: '错误提示',
            content: '网络异常与服务器连接已断开。'
        });
        this.stompClient = Stomp.client(process.env.SOCKET_ADDRESS); //断开重连
      });
    },
    disconnect(){//断开连接
      if(this.stompClient !== null){
        this.stompClient.disconnect();
      }
    },
    sendToAll(message){
      this.tx = this.stompClient.begin();
      this.stompClient.send("/sendToAll", {transaction: this.tx.id,token:store.state.token}, JSON.stringify(message));
      this.tx.commit();
      this.eventHub.$emit("sendMessageCompleteEvent");
    },
    sendToUser(message){
      this.tx = this.stompClient.begin();
      this.stompClient.send("/sendToUser", {transaction: this.tx.id,token:store.state.token}, JSON.stringify(message));
      this.tx.commit();
      var date = new Date();
      var msgItem = {
        userid:message.fromuserid,
        nickname:message.fromnickname,
        time:date,
        message:message.content.msg,
        avatar:message.fromuserheadimage
      }
      this.eventHub.$emit("PrivateChatSendCompletedEvent",msgItem);
    },
    privateReceiveMessage(msg){//私聊消息处理
      
      if(msg.mtype ==='nopermission'){//没有发言权限通知
        that.$Modal.error({
            title: '发言提示',
            content: '您还没有发言权限！'
        });
      }else if(msg.mtype ==='tokenfailure'){//登录失效
        that.$Modal.warning({
            title: '登录提示',
            content: '您已登录超时，请重新登录！',
            onOk() {
              window.location.reload();
            }
        });

      }else{
        var messageObj = {};
        var item = {
            //如果发送者是自己
            userid : msg.fromuserid,
            nickname : msg.fromnickname,
            avatar : msg.fromuserheadimage,
            time : msg.msgtime,
            message : msg.content.msg
        };
        var privateUser = {
            userid:msg.fromuserid,
            nickname:msg.fromnickname,
            avatar:msg.fromuserheadimage
        }
        messageObj.messageItem = item;
        messageObj.privateUser = privateUser;
        this.eventHub.$emit("PrivateChatReceiveEvent",messageObj);
      }
      
    },
    receiveMessage(msg){
      if(msg.type === 'onconnect'){//连接通知
          Notification({
              message: msg.content.nickname+' 进入直播间',
              position: 'bottom-left',
              duration: 3000
          });
          this.eventHub.$emit("onlineEvent", msg.content);
      }else if(msg.type === 'disconnect'){//下线通知
        
          let sessionid =  msg.content;

        this.eventHub.$emit("disconnectEvent",sessionid);
      }else if(msg.type === 'message'){//发送消息
        var msgObj = {
            userid:msg.fromuserid,
            nickname:msg.fromnickname,
            type:msg.type,
            mtype:msg.mtype,
            avatar:msg.fromuserheadimage,
            time:msg.msgtime,
            grade:msg.fromuseruserdegree,
            flag:msg.fromuseruserflag
        };
        if(msg.mtype === 'user'){//普通用户发送消息
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }else if(msg.mtype === 'system'){
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }else if(msg.mtype === 'manage'){
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }else if(msg.mtype === 'redpacket'){
          msgObj.context = msg.content;
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }
      }else if(msg.type === 'red'){//抢红包消息
        var redobj = {
          nickname:msg.fromnickname,
          type:msg.type,
          grabnickname:msg.tousernickname,
          context:msg.content.amount
        };
        this.eventHub.$emit("ReceiveMessageEvent",redobj);
      }

    }
  }
  
})
