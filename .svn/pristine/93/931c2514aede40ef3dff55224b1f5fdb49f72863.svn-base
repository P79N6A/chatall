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
import emojidatas from '@/assets/js/emojisdata.js'
import emojidata from '@/assets/js/emojidata.js'
import Cookie from '@/utils/auth'
import setChat from '@/utils/setChat'
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
    tx:null,
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
      // const groupId = '/group/' +
      this.stompClient = Stomp.client(process.env.SOCKET_ADDRESS);
      // this.stompClient.debug = null
      // this.stompClient.on('connected', function(sessionId, headers){
      //   var clientId = headers.clientId;
      //   if(clientId) {
      //     clients.push(clientId);
      //   }
      // });
      this.stompClient.connect(headers, frame=> {
        this.isSocketConnect = true;
        //广播
          //个人
          this.stompClient.subscribe('/user/' +  store.state.userInfo.userid + '/message',greeting =>{
          console.log('group--->' + greeting.body);
          var news = JSON.parse(greeting.body);
          if(news.mtype === 'kickout') { //不可以放在用户函数内

            that.$Modal.error({
              title: '错误提示',
              content: '您的账号在其他地方登录，您被迫下线！',
              onOk() {
                window.location.reload();
              }
            })
            Cookie.removeToken();
              that.stompClient.disconnect();
            return
          }
          if(news.type == 'tokenfailure') {
            Cookie.removeToken();
            that.$Modal.error({
              title: '错误提示',
              content: newMessage.content.msg ,
              onOk() {
                window.location.reload();
              }
            })
            setTimeout(()=>{
              window.location.reload();
              Cookie.removeToken();
            },2000)
            return
          }
          if(news.mtype == 'systemptips' || news.type == 'nopermission') {
            this.$Message.config({
              top: 400,
            });
            this.$Message.error(
              {
                content : news.content.msg ,
                duration : 5 ,
                onClose() {

                },

              }

              );
          }


          var groupList = JSON.parse(greeting.body);
          var roomId = groupList.content.roomId
          if(roomId !== null) {
            this.$store.commit('ROOM_ID', roomId);
          }
          if(groupList.mtype == 'roommessage') {
            var myRoomList = groupList.content
            this.eventHub.$emit("groupToRoomList", myRoomList);
            if(this.$store.state.initroom == undefined) {
              this.$store.commit('SET_INIT_ROOM', false);
            }
            this.InitRoom(store.state.newroomid)
          }
          var news = JSON.parse(greeting.body);
          if(news.type === 'message'&& (news.mtype === 'user') ) {
            console.log('私聊消息')
            if(news.content.id-0 === 1) { //id为1其实是图片消息

              let cut = news.content.msg;
              news.content.msg = '<img src="http://' + cut + '?imageView2/2/w/340/">'
              console.log('[咋新乐]');
            }else  {
              let firstDeal = Emoji(news.content.msg); //['[咋新乐]']
              console.log(typeof firstDeal)

              if(typeof firstDeal !== 'string') {
                console.log('string')
                let emojiMsg = '';
                let speEmoji = ['[鲜花]', '[顶一个]', '[赞]', '[大鲜花]', '[赞一个]', '[掌声]'];
                for(let i=0;i<firstDeal.length;i++) {
                  if(speEmoji.includes(firstDeal[i])) {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    let n = emojidatas.allEmoji[m]?'<img src="' + emojidatas.allEmoji[m] + '">':m;
                    emojiMsg += n;
                  } else {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img style="width: 24px" src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    let n = emojidatas.allEmoji[m]?'<img style="width: 80px" src="' + emojidatas.allEmoji[m] + '">':m;
                    emojiMsg += n;
                  }
                }
                news.content.msg = emojiMsg;
              }
            }
            this.privateReceiveMessage(news);
          }
          if(news.type === 'message'&& (news.mtype === 'redpacket') ) {
            console.log('私聊红包')
            this.privateReceiveMessage(news);
          }


        });
        this.stompClient.subscribe('/lottery', greeting => {
          // console.log('lottery--->' + greeting.body);
          this.eventHub.$emit("lotteryInfos", greeting.body);

        });

        },error=> {
        this.isSocketConnect = false;
        this.$Modal.error({
            title: '错误提示',
            content: '网络异常与服务器连接已断开。' ,
            onOk() {
            window.location.reload();
            this.stompClient = Stomp.client(process.env.SOCKET_ADDRESS);
            }
        });
          setTimeout(()=>{
            //断开重连
              this.disconnect();
              window.location.reload();
    				},0);


      });
    },
    InitRoom(roomid){
      console.log('加载中')
      var headers = {
        user_id:store.state.userInfo.userid,
        token:store.state.token,
        fromnickname:store.state.userInfo.nickname,
        user_flag:store.state.userInfo.userflag,
        head_image:store.state.userInfo.headimage,
        user_degree:store.state.userInfo.userdegree,
        client:'PC'
    }

      this.$store.state.initroom = true
      if(this.$store.state.getroominfo) {
        var subscription =  this.$store.state.getroominfo
        subscription.unsubscribe();
        console.log(subscription)
        console.log('取消订阅'+subscription.id +'频道')
      }
      const getRoomInfo = this.stompClient.subscribe(roomid,greeting =>{

        let news = JSON.parse(greeting.body);
        if( this.$store.state.getroominfo == undefined) {
          this.$store.commit('GET_ROOM_INFO', getRoomInfo);
        }else{
          this.$store.state.getroominfo = getRoomInfo
          console.log('成功订阅' + getRoomInfo.id + '频道')
          this.eventHub.$emit("GetRoomIdToList");
        }

          //公共方法 token 过期，上下线
          console.log(news.type+'是'+news.mtype)
          if(news.mtype == 'canclemsg') {
            this.eventHub.$emit("CancleMessageEvent",news);
            return
          }
          if(news.type == 'disconnect') {
            console.log(news.type);
            let obj = {
              userid: news.content.user_id,
              grade: news.content.user_degree,
            }
            console.log(obj)
            this.eventHub.$emit("DelLeftListEvent",obj);
            // that.delLeftList(obj);
            return
          }else if(news.type =='onconnect'){
            console.log(news.type);
            let obj = {
              userid: news.content.user_id,
              nickname: news.content.nickname,
              flag: news.content.user_flag,
              grade: news.content.user_degree,
              avatar: news.content.head_image,
              sessionid: news.content.sessionid,
              roomId: news.content.roomId,
            }
            console.log(obj);
            console.log(news.content.nickname)
            Notification({
              message: news.content.nickname+' 进入直播间+1',
              position: 'bottom-left',
              duration: 3000
            });
            this.eventHub.$emit("UpdateLeftListEvent",obj);
            return
          }
          //系统消息处理
           if(news.type === 'message'&&(news.mtype === 'customer'||news.mtype === 'manage') ){
            console.log('公聊消息')
            if(news.content.id  == '1') { //id为1其实是图片消息

              let cut = news.content.msg;
              news.content.msg = '<img src="http://' + cut + '?imageView2/2/w/340/">'
              console.log(' console.log(firstDeal)')
            }else if(news.content.id !== 1) {

              let firstDeal = Emoji(news.content.msg); //['[咋新乐]']
              console.log(firstDeal)

              if(typeof firstDeal !== 'string') {

                let emojiMsg = '';
                let speEmoji = ['[鲜花]', '[顶一个]', '[赞]', '[大鲜花]', '[赞一个]', '[掌声]'];
                for(let i=0;i<firstDeal.length;i++) {
                  if(speEmoji.includes(firstDeal[i])) {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    let n = emojidatas.allEmoji[m]?'<img src="' + emojidatas.allEmoji[m] + '">':m;
                    emojiMsg += n;
                  } else {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img style="width: 24px" src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    let n = emojidatas.allEmoji[m]?'<img style="width: 80px" src="' + emojidatas.allEmoji[m] + '">':m;
                    emojiMsg += n;
                  }
                }
                news.content.msg = emojiMsg;
              }
            }
            this.receiveMessage(news);
          }
          if(news.type === 'message'&&(news.mtype === 'user') ){
            console.log('普通用户公聊消息')
            if(news.content.id  == '1') { //id为1其实是图片消息

              let cut = news.content.msg;
              news.content.msg = '<img src="http://' + cut + '?imageView2/2/w/340/">'
              console.log(' console.log(firstDeal)')
            }else if(news.content.id !== 1) {

              let firstDeal = Emoji(news.content.msg); //['[咋新乐]']
              console.log(firstDeal)

              if(typeof firstDeal !== 'string') {

                let emojiMsg = '';
                let speEmoji = ['[鲜花]', '[顶一个]', '[赞]', '[大鲜花]', '[赞一个]', '[掌声]'];
                for(let i=0;i<firstDeal.length;i++) {
                  if(speEmoji.includes(firstDeal[i])) {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    let n = emojidatas.allEmoji[m]?'<img src="' + emojidatas.allEmoji[m] + '">':m;
                    emojiMsg += n;
                  } else {
                    let m = emojidata.allEmoji[firstDeal[i]]?'<img style="width: 24px" src="' + emojidata.allEmoji[firstDeal[i]] + '">':firstDeal[i];
                    let n = emojidatas.allEmoji[m]?'<img style="width: 80px" src="' + emojidatas.allEmoji[m] + '">':m;
                    emojiMsg += n;
                  }
                }
                news.content.msg = emojiMsg;
              }
            }
            this.receiveMessage(news);
          }
          if(news.type === 'message'&& (news.mtype === 'redpacket') ) {
            console.log('公聊红包')
            this.receiveMessage(news);
          }
          if(news.type === 'red'&& (news.content.redpackettype === '0') ) {
            console.log('领取公聊红包')
            this.receiveMessage(news);
          }
          // if(news.type === 'red'&& (news.content.redpackettype === '1') ) {
          //   console.log('领取私聊红包')
          //   this.privateReceiveMessage(news);
          // }

      },headers)


    },
    disconnect(){//断开连接
      if(this.stompClient !== null){
        this.stompClient.disconnect();
        this.isSocketConnect = false;
      }
    },
    disconnectRoom() {

    },
    sendToAll(message){
      this.tx = this.stompClient.begin();
      this.stompClient.send("/sendToAll", {transaction: this.tx.id,token:store.state.token}, JSON.stringify(message));
      this.tx.commit();
      this.eventHub.$emit("sendMessageCompleteEvent");
    },
    sendToRoom(message){
      this.tx = this.stompClient.begin();
      this.stompClient.send("/sendToRoom", {transaction: this.tx.id,token:store.state.token}, JSON.stringify(message));
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
        message:message.content,
        avatar:message.fromuserheadimage,
        flag:message.fromuseruserflag,
        degree:message.fromuseruserdegree,
        fromid : message.fromuserid,
        toid : message.touserid,
        toname: message.tousernickname,
        tohead: message.touserheadimage,
        neversee:1,
      }
      this.savemessage(msgItem.toid,msgItem);
      this.eventHub.$emit("PrivateChatSendCompletedEvent",msgItem);




    },
    savemessage(id,item) {
      setChat.setData(id,item);
            let data = {
              neversee:item.neversee
            }
          let seeChatList= this.$store.state.seechat;
          if(seeChatList== undefined ||seeChatList.length == 0 ) {
            seeChatList = {} ;
            if(seeChatList[id]==undefined) {
              seeChatList[id] =[];
              seeChatList[id].push(data);
            }
            else
            {
              seeChatList[id].neversee = seeChatList[id].neversee +1
            }

          }else {

          }
        this.$store.state.seechat = seeChatList ;


    },
    privateReceiveMessage(msg){//私聊消息处理
      if(msg.mtype ==='nopermission'){//没有发言权限通知
        that.$Modal.error({
            title: '发言提示',
            content: '您还没有发言权限！'
        });
      this.$Message.error('您还没有发言权限！');

      }else if(msg.mtype ==='tokenfailure'){//登录失效
        that.$Modal.warning({
            title: '登录提示',
            content: '您已登录超时，请重新登录！',
            onOk() {
              window.location.reload();
          }
        });


      }else if(msg.mtype ==='systemptips') {
        that.$Modal.warning({
          content: msg.content.msg,
      });
      }



      else{
        console.log(msg)
          var isMe = this.$store.state.userInfo.userid ;
          var privateUser = {
            fromid:msg.fromuserid,
            nickname:msg.fromnickname,
            avatar:msg.fromuserheadimage,
            roomid: msg.fromuserroomid,
            roomname: msg.fromuserroomname,
            time : msg.msgtime,
            message : msg.content,
            flag:msg.fromuseruserflag,
            degree:msg.fromuseruserdegree,
            time : msg.msgtime,
            toid : msg.touserid,
            toname: msg.tousernickname,
            tohead: msg.touserheadimage,
            userid: msg.fromuserid,
            toroomid: msg.touserroomid,
            toroonname: msg.touserroomname,
            neversee:1,
        }
        //判断是否是红包消息
        if(msg.content.redpacketid == undefined || !msg.content.redpacketid) {
          //如果发送到自己

          if( msg.touserid ==isMe ) {
            this.savemessage(msg.fromuserid,privateUser);
            this.$root.eventHub.$emit("messageComEvent",1);
            this.eventHub.$emit("PrivateChatReceiveEvent",privateUser);
            //如果自己是发送人
          }
        }else if(msg.content.redpacketid){
          //如果发送到自己
            if( msg.touserid ==isMe ) {
              this.$root.eventHub.$emit("messageComEvent",1);
              this.savemessage(msg.fromuserid,privateUser);

              this.eventHub.$emit("PrivateChatRedReceiveEvent",privateUser);
              //如果自己是发送人
            }else if(  msg.fromuserid ==isMe) {
              this.savemessage(msg.touserid,privateUser);
              this.eventHub.$emit("PrivateChatMyRedReceiveEvent",privateUser);

            }
        }

        // setChat.setData(msg.fromuserid, messageObj.privateUser)


      }

    },
    receiveMessage(msg){
      if(msg.type === 'onconnect'){//连接通知
          Notification({
              message: msg.content.nickname+' 进入直播间+1',
              position: 'bottom-left',
              duration: 3000
          });
          this.eventHub.$emit("onlineEvent", msg.content);
      }else if(msg.type === 'disconnect'){//下线通知

          let sessionid =  msg.content;

        this.eventHub.$emit("disconnectEvent",sessionid);
      }else if(msg.type === 'message'){//发送消息
        if(msg.content.id == 0){
          var aiTeMeName = '@'+ this.$store.state.userInfo.nickname
          var isAiTeMeMsg =JSON.stringify(msg.content.msg.indexOf(aiTeMeName) )
        }else {
          var isAiTeMeMsg = '-1' ;
        }
        if(isAiTeMeMsg == '0') {
          isAiTeMeMsg = true
        }else {
          isAiTeMeMsg = false
        }
        var msgObj = {
            msgid: msg.msgid,
            userid:msg.fromuserid,
            nickname:msg.fromnickname,
            type:msg.type,
            mtype:msg.mtype,
            avatar:msg.fromuserheadimage,
            time:msg.msgtime,
            grade:msg.fromuseruserdegree,
            flag:msg.fromuseruserflag,
            isAiTeMeMsg: isAiTeMeMsg,
        };
        if(msg.mtype === 'user'){//普通用户发送消息
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }else if(msg.mtype === 'system'){
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }else if(msg.mtype === 'customer'){
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }else if(msg.mtype === 'redpacket'){
          msgObj.context = msg.content;
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        } else if(msg.mtype === 'canclemsg') {
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("CancleMessageEvent",msgObj);
        }else if(msg.mtype === 'manage') {
          msgObj.context = Util.messageFilter(msg.content);
          this.eventHub.$emit("ReceiveMessageEvent",msgObj);
        }
      }else if(msg.type === 'red'){//抢红包消息
        var redobj = {
          nickname:msg.fromnickname,
          type:msg.type,
          grabnickname:msg.tousernickname,
          context:msg.content.amount,
          redpackettype:msg.content.redpackettype
        };
        this.eventHub.$emit("ReceiveMessageEvent",redobj);

      }

    },
    delLeftList() {
      this.eventHub.$emit("DelLeftListEvent");
    },
  }

})
