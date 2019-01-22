<template>
  <div>
    <von-header style="background: #fff;">
      <button @click="backLate" class="button button-icon ion-ios-arrow-back" slot="left"></button>
      <span style="color: #444" slot="title">{{this.$route.query.nickname}}<span v-if="!isOnline">(当前用户离线)</span></span>
    </von-header>
    <div style="overflow-y: scroll; height: calc(100vh);" ref="messageScroll" class="page-content">
      <div ref="msg" style="margin-top: 50px; padding-bottom: 60px" class="messages">
        <MessageItem v-for="(message,index) in messageList" :key="index" :item="message"></MessageItem>
      </div>
    </div>
    <div v-show="messageTabbar" class="tabbar moveBottom visible fixed" :style="`bottom:` + tabbarBottom + `px;`">
      <div style="background: #fff" class="message-bar">
        <div class="messagebar-area">
          <label>
            <textarea ref="textarea" placeholder="请输入信息" class="resizable textarea-class" v-model="message"></textarea>
          </label>
        </div>
        <div style="display: flex">
          <img @click="showIcons" style="width: 31px; height: 31px; margin-right: 10px" src="../../static/images/smile.png" alt="">
          <img v-if="!showSendBtn" @click="pushClick" style="width: 31px; height: 31px; margin-right: 10px" src="../../static/images/plus.png" alt="">
          <div v-if="showSendBtn" @click="sendClick" class="send-btn">发送</div>
        </div>
      </div>
    </div>
    <transition name="moveHeight">
      <div v-show="sheetShow" :style="!itemOrIcon ? itemIconStyle : ''" class="messagebar-sheet">
        <ul v-if="itemOrIcon">
          <li>
            <vue-core-image-upload
              :crop="false"
              :inputOfFile="'image'"
              :credentials="true"
              @imagechanged="uploadyanzheng"
              @imageuploaded="uploadImgSuccess"
              @errorhandle="uploadImgError"
              :text="''"
              :headers="{token: userToken}"
              :maxFileSize="2048000"
              :inputAccept="'image/*'"
              url="http://api.8582333.com/api/upload">
            </vue-core-image-upload>
            <div>
              <img style="width: 58px; height: 58px;" src="../../static/images/bar/xiangce.png" alt="">
            </div>
            <div class="sheet-text">相册</div>
          </li>
          <li style="position: relative" @click="goToRed">
            <div>
              <img style="width: 58px; height: 58px;" src="../../static/images/bar/hongbao.png" alt="">
            </div>
            <div class="sheet-text">红包</div>
          </li>
        </ul>
        <ul v-if="!itemOrIcon">
          <div class="blow-item-icon-can">
            <div v-if="!itemOrIcon && iconIndex === 0" class="emoji-bear-can">
              <img @click="selectEmoji(realList.nameList[index])" v-for="(item, index) in realList.first" :src="item" alt="">
            </div>
            <div v-if="!itemOrIcon && iconIndex === 1" class="emoji-bear-can">
              <img @click="selectBear(secondRealList.nameList[index])" style="width: 50px;height: 50px;margin: 1px 7px;" v-for="(item, index) in secondRealList.first" :src="item" alt="">
            </div>
            <div class="blow-can-blow">
              <div @click="iconTab(0)" :class="{'icon-can-bg': iconIndex === 0}" class="icon-can">
                <img src="../../static/images/emoji/emoji_00.png" alt="">
              </div>
              <div @click="iconTab(1)" :class="{'icon-can-bg': iconIndex === 1}" class="icon-can">
                <img src="../../static/images/biaoqingbao/lottery_1.gif" alt="">
              </div>
            </div>
          </div>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import {domain, PriviteCacheGet, PriviteLocalCache} from '../utils/privitelocalstorge.js'
  import User from '@/api/user'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import MessageItem from '@/components/privitechatwindow.vue'
  import Util from '@/utils/util'
  import Emoji from '@/utils/dealemoji'
  import emojidata from '@/assets/js/emojidata'
  import beardata from '@/assets/js/beardata'

  import '@/assets/css/home.less'

  export default {
    components: {
      MessageItem,
      VueCoreImageUpload
    },
    props: {
      myselfInfo: {}
    },
    data() {
      return {
        userInfo: {},
        tabbarBottom: 0,
        iconIndex: 0,
        contentMargin: 48,
        sheetHeight: 90,
        showSendBtn: false,
        sheetShow: false,
        itemOrIcon: true, //底部功能区切换
        messageTabbar: true,
        isShowSendBtn: false,
        isOnline: true,
        itemIconStyle: {
          height: '150px',
          border: 'none'
        },
        realList: {
          first: [],
          nameList: [],
          second: [],
          third: [],
          fouth: []
        },
        secondRealList: {
          first: [],
          nameList: [],
          second: [],
          third: [],
        },
        currentUser: {},
        privateUser: {},
        message: '',
        messageList: [],
        newList: [],
        pictureSize: {
          width: '',
          height: ''
        }
      }
    },
    watch: {
      message(data) {
        if (data) {
          if (data.trim()) {
            this.showSendBtn = true;
          } else {
            this.showSendBtn = false;
          }
        } else {
          this.showSendBtn = false;
        }
      },
    },
    created() {
      for (let i in emojidata.firstEmoji) {
        this.realList.nameList.push(i);
        this.realList.first.push(emojidata.firstEmoji[i])
      }
      for (let i in beardata.allEmoji) {
        this.secondRealList.nameList.push(i);
        this.secondRealList.first.push(beardata.allEmoji[i])
      }
    },
    mounted() {
      this.getUserList();
      const that = this;
      this.userInfo = this.$store.state.userInfo;
      let list = PriviteCacheGet(domain);
      let newList = Object.assign([], list);
      let info = this.$store.state.privateInfo;
      this.currentUser = info.currentUser;
      this.privateUser = info.privateUser;
      this.$root.eventHub.$on('PrivateChatReceiveEvent', item => { // 接收私聊信息
        if ((item.toid - 0 === this.$store.state.userInfo.userid - 0) && (this.$route.query.id - 0 === item.fromid - 0)) {
          if(item.type === 'message' && (item.content.id - 0 === 1) && (item.content.msg.indexOf('src=') === -1)){
            item.content.msg = '<img style="width: 100%" src="' + item.content.msg + '">';
          }
          item.neverseen = false;
          that.messageList.push(item);
        }
      });
      this.$root.eventHub.$on('PrivateChatSendCompletedEvent', item => { // 发送私聊信息
        if (item.type === 'message') {
          if (item.content.id - 0 === 1) {
            if(item.content.msg.indexOf('http') === -1){
              item.content.msg = '<img style="width: 100%" src="http://' + item.content.msg + '?imageView2/2/w/220">';
            }
          }
          if(item.content.msg){
            let firstDeal = Emoji(item.content.msg);
            if (typeof firstDeal !== 'string') {
              let emojiMsg = '';
              for (let i = 0; i < firstDeal.length; i++) {
                let m = emojidata.firstEmoji[firstDeal[i]] ? '<img style="width: 24px" src="' + emojidata.firstEmoji[firstDeal[i]] + '">' : firstDeal[i];
                let n = beardata.allEmoji[m] ? '<img style="width: 92px" src="' + beardata.allEmoji[m] + '">' : m;
                emojiMsg += n;
              }
              item.content.msg = emojiMsg;
            }
          }
        }
        this.messageList.push(item);
      });
      this.$root.eventHub.$on('StartPrivate', data => {
        this.$nextTick(() => {
          this.privateUser = data.privateUser;
          this.currentUser = data.currentUser;
        })
      });
      this.privateUser = this.$store.state.privateInfo.privateUser;
      this.currentUser = this.$store.state.privateInfo.currentUser;
      if (list !== null) {
        for (let i = 0; i < list.length; i++) {
          if ((((list[i].fromid - 0) === (info.currentUser.userid - 0)) && ((list[i].toid - 0) === (info.privateUser.userid - 0))) ||
            (((list[i].toid - 0) === (info.currentUser.userid - 0)) && ((list[i].fromid - 0) === (info.privateUser.userid - 0)))
          ) {
            newList[i].neverseen = false;
            if (list[i].data.length !== 0) {
              for (let j = 0; j < list[i].data.length; j++) {
                newList[i].data[j].neverseen = false;
              }
            }
          }
        }
        PriviteLocalCache(domain, newList);
      }
      if (list !== null) {
        for (let i = 0; i < list.length; i++) {
          if ((((list[i].fromid - 0) === (info.currentUser.userid - 0)) && ((list[i].toid - 0) === (info.privateUser.userid - 0))) ||
            (((list[i].toid - 0) === (info.currentUser.userid - 0)) && ((list[i].fromid - 0) === (info.privateUser.userid - 0)))
          ) {
            if (list[i].data.length !== 0) {
              if (list[i].data.type === 'message') {
                if (list[i].data.content.id - 0 === 1) {
                  let a = list[i].data.content.msg.indexOf('?width');
                  let b = list[i].data.content.msg.indexOf('?imageView2');
                  let cut = list[i].data.content.msg.slice(0, a);
                  if(list[i].data.content.msg.indexOf('http') === -1){
                    list[i].data.content.msg = '<img style="width: 100%" src="http://' + cut + '?imageView2/2/w/220">'
                  }
                }
                if(list[i].data.content.msg){
                  let firstDeal = Emoji(list[i].data.content.msg);
                  if (typeof firstDeal !== 'string') {
                    let emojiMsg = '';
                    for (let i = 0; i < firstDeal.length; i++) {
                      let m = emojidata.firstEmoji[firstDeal[i]] ? '<img style="width: 24px" src="' + emojidata.firstEmoji[firstDeal[i]] + '">' : firstDeal[i];
                      let n = beardata.allEmoji[m] ? '<img style="width: 92px" src="' + beardata.allEmoji[m] + '">' : m;
                      emojiMsg += n;
                    }
                    list[i].data.content.msg = emojiMsg;
                  }
                }
              }
              this.messageList = list[i].data;
              if (list[i].type === 'message') {
                if (list[i].content.id - 0 === 1) {
                  // let a = list[i].content.msg.indexOf('?width');
                  // let b = list[i].content.msg.indexOf('?imageView2');
                  // let cut = list[i].content.msg.slice(0, a);
                  // list[i].content.msg = '<img src="http://' + cut + '?imageView2/2/w/220">'
                  if(list[i].content.msg.indexOf('src=') === -1){
                    list[i].content.msg = '<img style="width: 100%" src="' + list[i].content.msg + '">'
                  }
                }
                if(list[i].content.msg){
                  let firstDeal = Emoji(list[i].content.msg);
                  if (typeof firstDeal !== 'string') {
                    let emojiMsg = '';
                    for (let i = 0; i < firstDeal.length; i++) {
                      let m = emojidata.firstEmoji[firstDeal[i]] ? '<img style="width: 24px" src="' + emojidata.firstEmoji[firstDeal[i]] + '">' : firstDeal[i];
                      let n = beardata.allEmoji[m] ? '<img style="width: 92px" src="' + beardata.allEmoji[m] + '">' : m;
                      emojiMsg += n;
                    }
                    list[i].content.msg = emojiMsg;
                  }
                }
              }
              this.messageList.unshift(list[i])
            } else {
              if (list[i].type === 'message') {
                if (list[i].content.id - 0 === 1) {
                  // let a = list[i].content.msg.indexOf('?width');
                  // let b = list[i].content.msg.indexOf('?imageView2');
                  // let cut = list[i].content.msg.slice(0, a);
                  // list[i].content.msg = '<img src="http://' + cut + '?imageView2/2/w/220">'
                  if(list[i].content.msg.indexOf('src=') === -1){
                    list[i].content.msg = '<img style="width: 100%" src="' + list[i].content.msg + '">'
                  }
                }
                if(list[i].content.msg){
                  let firstDeal = Emoji(list[i].content.msg);
                  if (typeof firstDeal !== 'string') {
                    let emojiMsg = '';
                    for (let i = 0; i < firstDeal.length; i++) {
                      let m = emojidata.firstEmoji[firstDeal[i]] ? '<img style="width: 24px" src="' + emojidata.firstEmoji[firstDeal[i]] + '">' : firstDeal[i];
                      let n = beardata.allEmoji[m] ? '<img style="width: 92px" src="' + beardata.allEmoji[m] + '">' : m;
                      emojiMsg += n;
                    }
                    list[i].content.msg = emojiMsg;
                  }
                }
              }
              this.messageList.push(list[i])
            }
          }
        }
      }
    },
    computed: {
      userToken() {
        return this.$store.state.token;
      },
    },
    methods: {
      getUserList() {
        User.getList().then(res => {
            let data = res.data;
            for (let i = 0; i < data.length; i++) {
              if (data[i].user_id - 0 === this.$route.query.id - 0) {
                this.isOnline = true;
                break;
              } else {
                this.isOnline = false;
              }
            }
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
        popup.show().then((buttonIndex) => {
          console.log(buttonIndex);
        })
      },
      uploadImgOverflow(err) {
        this.showPopup(`图片超过限定大小！`);
        return false;
      },
      uploadImgError(err) {
        this.showPopup(`上传图片出错! ${err}`);
      },
      uploadyanzheng(res) {
        let that = this;
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onload = function(theFile) {
            let image = new Image();
            image.src = theFile.target.result;
            image.onload = function() {
              that.pictureSize.width = this.width;
              that.pictureSize.height = this.height;
            }
          }
        })
      },
      uploadImgSuccess(callbackData) {
        if (callbackData.code !== 0 || callbackData.url === null) {
          this.showPopup('上传图片出错！');
          return false;
        } else {
          let img = callbackData.url;
          let Msgs = {
            type: 'message',
            mtype: 'user',
            fromuserid: this.userInfo.userid,
            fromnickname: this.userInfo.nickname,
            fromuserheadimage: this.userInfo.headimage,
            fromuseruserdegree: this.userInfo.userdegree,
            fromuseruserflag: this.userInfo.userflag,
            touserid: this.$route.query.id,
            tousernickname: this.$route.query.nickname,
            touserheadimage: this.privateUser.avatar,
            content: {
              id: 1,
              msg: img,
              width: this.pictureSize.width,
              height: this.pictureSize.height,
            }
          };
          this.$root.sendToUser(Msgs);
        }
      },
      backLate() {
        window.history.go(-1);
      },
      sendClick() {
        if (!this.$root.isSocketConnect) {
          return;
        }
        if (!this.isOnline) {
          this.showPopup('当前用户离线中，无法进行私聊');
          return false;
        }
        if (Util.isNull(this.message)) {
          return;
        }
        var jsonMessage = {
          type: 'message',
          mtype: 'user',
          fromuserid: this.userInfo.userid,
          fromnickname: this.userInfo.nickname,
          fromuserheadimage: this.userInfo.headimage,
          fromuseruserdegree: this.userInfo.userdegree,
          fromuseruserflag: this.userInfo.userflag,
          touserid: this.$route.query.id,
          tousernickname: this.$route.query.nickname,
          touserheadimage: this.privateUser.avatar,
          content: {
            id: 0,
            msg: this.message
          }
        };
        this.message = '';
        this.$root.sendToUser(jsonMessage);
      },
      selectEmoji(emoji) {
        if (this.message === null) {
          this.message = '';
        }
        this.message += emoji;
      },
      selectBear(bear) {
        if (this.message === null) {
          this.message = '';
        }
        this.message += bear;
        this.sendClick();
      },
      iconTab(index) {
        this.iconIndex = index;
      },
      goToRed() {
        this.$router.push({
          path: '/sendred',
          query: {
            toWho: this.$route.query.id
          }
        })
      },
      sendred() {
        this.sheetShow = !this.sheetShow;
        if (this.sheetShow) {
          this.tabbarBottom = this.sheetHeight;
          this.contentMargin += this.sheetHeight;
        } else {
          this.tabbarBottom = 0;
          this.contentMargin -= this.sheetHeight;
        }
        this.tabbarBottom = 0;
        if (!this.$store.state.isLogin) {
          this.showPopup('需要登录才能使用该功能哦');
          return false;
        }
        this.getBalance();
        this.redBagFlag = true;
      },
      showIcons() {
        if(this.sheetShow){
          if(!this.itemOrIcon){
            this.sheetShow = false;
            this.tabbarBottom = 0;
            this.contentMargin -= this.sheetHeight;
          } else {
            this.tabbarBottom = this.sheetHeight + 60;
          }
        } else {
          this.sheetShow = true;
          this.tabbarBottom = this.sheetHeight + 60;
          this.contentMargin += this.sheetHeight;
        }
        this.itemOrIcon = false;
      },
      pushClick() {
        if(this.sheetShow){
          if(this.itemOrIcon){
            this.sheetShow = false;
            this.tabbarBottom = 0;
            this.contentMargin -= this.sheetHeight;
          } else {
            this.tabbarBottom = this.sheetHeight;
          }
        } else {
          this.sheetShow = true;
          this.tabbarBottom = this.sheetHeight;
          this.contentMargin += this.sheetHeight;
        }
        this.itemOrIcon = true;
      },
      closeSheet() {
        if (this.sheetShow) {
          this.sheetShow = false;
          this.tabbarBottom = 0;
          this.contentMargin -= this.sheetHeight;
        }
      }
    },
  }

</script>

<style scoped>
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
