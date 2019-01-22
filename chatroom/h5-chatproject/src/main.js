// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import Vonic from 'vonic'
import sess from './sess'
import Stomp from 'stompjs'
// Import Routes
import Routes from './routes.js'
import VueFilter from '@/utils/vueFilter.js'
import Store from '@/utils/vuexStore'
import Cookie from '@/utils/auth'
import VueScroller from 'vue-scroller'

import '@/icons' // icon
import '@/assets/css/app.less'

import LiveModal from '@/components/Modal.vue'
import {domain, PriviteLocalCache, PriviteCacheGet} from './utils/privitelocalstorge'
import Emoji from '@/utils/dealemoji.js'
import emojidata from '@/assets/js/emojidata.js'
import beardata from '@/assets/js/beardata.js'

Vue.component('LiveModal', LiveModal);
Vue.use(Vuex);
Vue.use(VueScroller);

for (let key in VueFilter) {
  Vue.filter(key, VueFilter[key]);
}
const store = new Vuex.Store(Store);
Vue.config.productionTip = false;
var data = {
  priviteChatTmpl: PriviteCacheGet(domain) ? PriviteCacheGet(domain) : [],
  priviteChatStorge: PriviteCacheGet(domain),
  eventHub: new Vue(),
  isSocketConnect: false,
  sidebar: undefined,
  stompClient: null,
  tx: null
};
var methods = {
  // 初始化webSocket连接
  InitSocket() {
    var headers = {
      user_id: store.state.userInfo.userid,
      token: store.state.token,
      fromnickname: store.state.userInfo.nickname,
      user_flag: store.state.userInfo.userflag,
      head_image: store.state.userInfo.headimage,
      user_degree: store.state.userInfo.userdegree,
      client: 'H5'
    };
    var that = this;
    // 连接websocket后端服务器
    this.stompClient = Stomp.client(process.env.SOCKET_ADDRESS);
    this.stompClient.connect(headers, frame => {
      this.isSocketConnect = true;
      this.stompClient.subscribe('/user/' + store.state.userInfo.userid + '/message', function (greeting) {
        console.log('个人--->' + greeting.body);
        if (JSON.parse(greeting.body).mtype === 'kickout') { // 不可以放在用户函数内
          that.showPopup('您的账号已在其他地方登录！');
          setTimeout(() => {
            that.stompClient.disconnect();
            window.location.reload();
          }, 1500);
          return;
        }
        if(JSON.parse(greeting.body).mtype === 'roommessage') { // 获取房间列表以及房间号
          that.eventHub.$emit("roomMessage", JSON.parse(greeting.body).content);
          that.$store.commit('UPDATE_CURRENTROOMID', JSON.parse(greeting.body).content.roomId);
          that.subscribeRoom(JSON.parse(greeting.body).content.roomId); // 订阅房间
          return;
        }
        let news = JSON.parse(greeting.body);
        if (news.type === 'message' && news.content.msg && news.content.msg.length < 100) {
          if (news.content.id - 0 === 1) {
            news.content.msg = 'http://' + news.content.msg + '?imageView2/2/w/220';
          }
          let firstDeal = Emoji(news.content.msg);
          if (typeof firstDeal !== 'string') {
            let emojiMsg = '';
            for (let i = 0; i < firstDeal.length; i++) {
              let m = emojidata.firstEmoji[firstDeal[i]] ? '<img style="width: 24px" src="' + emojidata.firstEmoji[firstDeal[i]] + '">' : firstDeal[i];
              let n = beardata.allEmoji[m] ? '<img style="width: 92px" src="' + beardata.allEmoji[m] + '">' : m;
              emojiMsg += n;
            }
            news.content.msg = emojiMsg;
          }
        }
        that.privateReceiveMessage(news);
      });
      // 开奖信息
      this.stompClient.subscribe('/lottery', greeting => {
        console.log('lottery--->' + greeting.body);
        this.eventHub.$emit("lotteryInfos", greeting.body);
      });
    }, error => {
      this.isSocketConnect = false;
    });
  },
  subscribeRoom(roomId) {
    let that = this;
    if(this.stompClient){
      if(this.$store.state.room){
        this.$store.state.room.unsubscribe();
      }
      const room = this.stompClient.subscribe(roomId, function (roomData) { // 订阅当前的房间
        console.log('房间--->' + roomData.body);
        let news = JSON.parse(roomData.body);
        if (news.type === 'message' && news.content.msg && news.content.msg.length < 100) {
          if (news.content.id - 0 === 1) {
            news.content.msg = '<img style="width: 100%" src="http://' + news.content.msg + '?imageView2/2/w/340">'
          }
          let firstDeal = Emoji(news.content.msg);
          if (typeof firstDeal !== 'string') {
            let emojiMsg = '';
            for (let i = 0; i < firstDeal.length; i++) {
              let m = emojidata.firstEmoji[firstDeal[i]] ? '<img style="width: 24px" src="' + emojidata.firstEmoji[firstDeal[i]] + '">' : firstDeal[i];
              let n = beardata.allEmoji[m] ? '<img style="width: 92px" src="' + beardata.allEmoji[m] + '">' : m;
              emojiMsg += n;
            }
            news.content.msg = emojiMsg;
          }
        }
        that.receiveMessage(news);
      });
      that.$store.commit('UPDATE_ROOM', room);
    }
  },
  disconnect() { // 断开连接
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  },
  sendToAll(message) {
    this.tx = this.stompClient.begin();
    this.stompClient.send("/sendToAll", {transaction: this.tx.id, token: store.state.token}, JSON.stringify(message));
    this.tx.commit();
    this.eventHub.$emit("sendMessageCompleteEvent");
  },
  sendToRoom(message) {
    this.tx = this.stompClient.begin();
    this.stompClient.send("/sendToRoom", {transaction: this.tx.id, token: store.state.token}, JSON.stringify(message));
    this.tx.commit();
    this.eventHub.$emit("sendToRoomCompleteEvent");
  },
  sendToUser(message) {
    if (PriviteCacheGet(domain) === null) {
      PriviteLocalCache(domain, [])
    }
    let tpmls = PriviteCacheGet(domain) ? PriviteCacheGet(domain) : [];
    let cache = Object.assign([], tpmls);
    let realMsgList = {};
    this.tx = this.stompClient.begin();
    this.stompClient.send("/sendToUser", {transaction: this.tx.id, token: store.state.token}, JSON.stringify(message));
    this.tx.commit();
    var date = new Date().getTime();
    var msgItem = {
      type: message.type,
      mtype: message.mtype,
      fromuserid: message.fromuserid,
      fromnickname: message.fromnickname,
      time: date,
      content: message.content,
      fromavatar: message.fromuserheadimage
    };
    realMsgList.type = message.type;
    realMsgList.mtype = message.mtype;
    realMsgList.toid = message.touserid;
    realMsgList.tonickname = message.tousernickname;
    realMsgList.toavatar = message.touserheadimage;
    realMsgList.time = date;
    realMsgList.fromid = message.fromuserid;
    realMsgList.fromavatar = message.fromuserheadimage;
    realMsgList.fromnickname = message.fromnickname;
    realMsgList.content = message.content;
    realMsgList.neverseen = false;
    realMsgList.data = [];
    console.log(message);
    console.log(realMsgList);
    this.eventHub.$emit("PrivateChatSendCompletedEvent", realMsgList);
    if (tpmls.length === 0) {
      cache.push(realMsgList);
      PriviteLocalCache(domain, cache);
    } else {
      for (let j = 0; j < tpmls.length; j++) {
        if ((((tpmls[j].fromid - 0) === (realMsgList.fromid - 0)) && ((tpmls[j].toid - 0) === (realMsgList.toid - 0))) ||
          ((tpmls[j].toid - 0) === (realMsgList.fromid - 0) && (tpmls[j].fromid - 0) === (realMsgList.toid - 0))
        ) {
          cache[j].data.push(realMsgList);
          console.log('已写入data');
          PriviteLocalCache(domain, cache);
          return;
        }
      }
      console.log('已写入外部');
      cache.push(realMsgList);
      PriviteLocalCache(domain, cache);
    }
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
    popup.show().then((buttonIndex) => {
      console.log(buttonIndex)
    })
  },
  privateReceiveMessage(msg) { // 私聊消息处理
    if (PriviteCacheGet(domain) === null) {
      PriviteLocalCache(domain, []);
    }
    let tpmls = PriviteCacheGet(domain) ? PriviteCacheGet(domain) : [];
    let cache = Object.assign([], tpmls);
    if(msg.type === 'nopermission'){

    } else if(msg.type === 'message'){
      if (msg.mtype === 'nopermission') { // 没有发言权限通知

      } else if (msg.mtype === 'tokenfailure') { // 登录失效

      } else if(msg.mtype === 'systemptips') { // 频繁发言通知
        this.eventHub.$emit("systemptips", msg);
      } else {
        var messageObj = {};
        let realMsgList = {};
        msg.data = [];
        var item = {
          // 如果发送者是自己
          userid: msg.fromuserid,
          nickname: msg.fromnickname,
          avatar: msg.fromuserheadimage,
          time: msg.msgtime,
          message: msg.content.msg,
          data: []
        };
        var privateUser = {
          userid: msg.fromuserid,
          nickname: msg.fromnickname,
          avatar: msg.fromuserheadimage
        };
        realMsgList.type = msg.type;
        realMsgList.mtype = msg.mtype;
        realMsgList.toid = msg.touserid;
        realMsgList.tonickname = msg.tousernickname;
        realMsgList.toavatar = msg.touserheadimage;
        realMsgList.time = msg.msgtime;
        realMsgList.fromid = msg.fromuserid;
        realMsgList.fromavatar = msg.fromuserheadimage;
        realMsgList.fromnickname = msg.fromnickname;
        realMsgList.content = msg.content;
        realMsgList.neverseen = true;
        realMsgList.data = [];
        messageObj.messageItem = item;
        messageObj.privateUser = privateUser;
        this.eventHub.$emit("PrivateChatReceiveEvent", realMsgList);
        if (tpmls.length === 0) {
          cache.push(realMsgList);
          PriviteLocalCache(domain, cache);
        } else {
          for (let j = 0; j < tpmls.length; j++) {
            if ((((tpmls[j].fromid - 0) === (realMsgList.fromid - 0)) && ((tpmls[j].toid - 0) === (realMsgList.toid - 0))) ||
              ((tpmls[j].toid - 0) === (realMsgList.fromid - 0) && (tpmls[j].fromid - 0) === (realMsgList.toid - 0))
            ) {
              cache[j].data.push(realMsgList);
              console.log('已写入data');
              PriviteLocalCache(domain, cache);
              return;
            }
          }
          console.log('已写入外部');
          cache.push(realMsgList);
          PriviteLocalCache(domain, cache);
        }
      }
    }
  },
  receiveMessage(msg) { // 公共消息处理
    if (msg.type === 'onconnect') { // 连接通知
      this.eventHub.$emit("onlineEvent", msg.content);
    } else if (msg.type === 'disconnect') { // 下线通知
      let sessionid = msg.content;
      this.eventHub.$emit("disconnectEvent", sessionid);
    } else if (msg.type === 'message') { // 发送消息
      if(msg.content.id == 0){
        var aiTeMeName = '@'+ this.$store.state.userInfo.nickname;
        var isAiTeMeMsg =JSON.stringify(msg.content.msg.indexOf(aiTeMeName));
      }else {
        var isAiTeMeMsg = '-1' ;
      }
      isAiTeMeMsg = isAiTeMeMsg == '0' ? true : false;
      var msgObj = {
        userid: msg.fromuserid,
        nickname: msg.fromnickname,
        type: msg.type,
        mtype: msg.mtype,
        avatar: msg.fromuserheadimage,
        time: msg.msgtime,
        grade: msg.fromuseruserdegree,
        flag: msg.fromuseruserflag,
        senttype: 'received',
        isAiTeMeMsg:isAiTeMeMsg,
        msgid: msg.msgid
      };
      if (msg.mtype === 'user') { // 普通用户发送消息
        msgObj.context = msg.content;
        this.eventHub.$emit("ReceiveMessageEvent", msgObj);
      } else if (msg.mtype === 'system') {
        msgObj.context = msg.content;
        this.eventHub.$emit("ReceiveMessageEvent", msgObj);
      } else if (msg.mtype === 'manage') {
        msgObj.context = msg.content;
        this.eventHub.$emit("ReceiveMessageEvent", msgObj);
      } else if (msg.mtype === 'customer') {
        msgObj.context = msg.content;
        this.eventHub.$emit("ReceiveMessageEvent", msgObj);
      } else if (msg.mtype === 'redpacket') {
        msgObj.context = msg.content;
        this.eventHub.$emit("ReceiveMessageEvent", msgObj);
      }
    } else if (msg.type === 'red' && (msg.content.redpackettype - 0 === 0)) { // 抢红包消息
      var redobj = {
        nickname: msg.fromnickname,
        type: msg.type,
        grabnickname: msg.tousernickname,
        context: msg.content.amount
      };
      this.eventHub.$emit("ReceiveMessageEvent", redobj);
    }
  }
};
Vonic.app.setConfig('data', data);
Vonic.app.setConfig('methods', methods);
// 需要登录才可以访问得路由地址
const loginRoutes = ['/user'];
const beforeEach = (toRoute, fromRoute, next) => {
  const to = toRoute.path;
  const from = fromRoute.path;
  const scrollTop = Vonic.app.pageContentScrollTop();
  if (to === '/privitelist') {
    next({path: '/'});
  }
  if ((to === '/regist&login') && store.state.isLogin) {
    window.history.go(1);
  }
  if ((to === '/reddetail') && !store.state.redBagStutas) {
    next({path: '/'});
  }
  if (to !== '/regist&login') {
    if (!Cookie.getToken()) {
      next({path: '/regist&login'});
    } else {
      next();
    }
  } else if (to && loginRoutes.indexOf(to) > -1) {
    if (!store.state.isLogin) { // 没有登录
      next({path: '/regist&login'});
    } else {
      next();
    }
  } else {
    next();
  }
};
const afterEach = (toRoute, fromRoute, next) => {};
Vonic.app.setConfig('beforeEach', beforeEach);
Vonic.app.setConfig('afterEach', afterEach);
Vue.use(Vonic.app, {
  routes: Routes,
  store: store,
  pushMehod: 'push',
  pageTransition: 'ios'
});
