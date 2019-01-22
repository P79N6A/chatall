<template>
  <div>
    <template v-if="tabIndex === 0">
      <div v-if="allred" class="linghongbao-bg">
        <div class="all-red-bag">
          <p @click="closeAllBag" style="position: absolute; right: 15px; top: 10px; font-size: 18px; color: #fff; transform: scaleY(.8)">X</p>
          <img src="../../static/images/hongbao/red-bg-head.png" alt="">
          <div v-if="allRedList.length === 0" align="center" class="no-red-bag">
            <img src="../../static/images/hongbao/no-bag.png" alt="">
          </div>
          <ul v-if="allRedList.length !==0">
            <li v-for="(item, index) in allRedList">
              <p>{{item.senderName}}</p>
              <p style="color: #444">发送的红包</p>
              <div @click.prevent="lingqu(item.id, index)" v-if="lingquList[index]" class="click-btn">
                <p>点击领取</p>
              </div>
              <div @click="lingquXiangqing" v-if="!lingquList[index]" style="background: #d5d5d5" class="click-btn">
                <p style="color: #444">查看详情</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div @click="cancleALl" class="qingping"></div>
      <div v-if="littleBag" @click="closeLittleBag" class="close-slide-red"></div>
      <div v-if="littleBag" @click="getAllBag" class="slide-red-bag"></div>
      <div v-if="weiduNum" @click="seeLatestInfo"  class="weidu">
        <p>{{weiduNum}}</p>
      </div>
      <!--@提示-->
      <div v-if="isAiTeMe && aiTeMe > 0" class="aite" @click="goAnchor()" ><div class="aitewo">{{aiTeMe}} 人@我 </div></div>
      <!--上线通知-->
      <div v-if="isOnLineNotice" class="onlineNotice" :class="{'changehei': isOnLineNotice, 'hei': isOnLineNotice}">{{onlineName}}进入聊天室</div>
      <!--消息转发-->
      <div v-if="forwardMsg.isShowForwardMsg" class="forwardMsg">
        <von-header theme="light" :fixed="true" style="background-color: #fff">
          <button @click="backToHome" slot="left" class="button button-icon">取消</button>
          <span slot="title" style="color: black;font-size: 20px">消息转发</span>
        </von-header>
        <div class="user-container">
          <div v-for="(item, index) in sidebarInfo.roomList" class="userlist-can">
            <div class="userlist-can-child">
              <div class="userlist-child-left">
                <img src="../../static/images/icon-fangjian.png" alt="">
                <span>{{item.roomName}}</span>
              </div>
              <div class="userlist-child-right">
                <input type="checkbox" @click="checkState" v-model="forwardMsg.roomIds" :value="item.roomName.split('-')[1] - 0" class="checkbox"
                       :id="item.roomName.split('-')[1] - 0">
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <span v-if="forwardMsg.isSelectedAllRoom" @click="selectedAllRoom">全选</span>
          <span v-if="!forwardMsg.isSelectedAllRoom" @click="cancelAllRoom">取消全选</span>
          <span @click="sendToRoom">发送</span>
        </div>
      </div>
    </template>
    <!--红包-->
    <div v-if="redStd" class="red-bag-can">
      <div class="real-red-bag">
        <div @click="closeBag" class="close-tag"></div>
        <div class="red-avatar">
          <img :src="'../../static/images/avatars/' + redInfo.redBagAvatar" alt="">
        </div>
        <p>{{redInfo.redBagNickname}}</p>
        <h1 v-if="redStd === '1'">{{redInfo.redBagRemarks}}</h1>
        <h1 v-if="redStd === '2'">红包已经领取过了</h1>
        <h1 v-if="redStd === '3'">红包已经领完</h1>
        <div v-if="redStd === '1'" @click.prevent="openRedBag" class="open-bag-can"></div>
      </div>
    </div>
    <!--聊天室侧边栏 start-->
    <div :class="{'slide-left': true, 'changehei': isSLide, 'hei': isSLide}">
      <div class="switch-can">
        <p>只看管理员消息</p>
        <von-toggle :text="''" :value="onlyManager" v-model="onlyManager"></von-toggle>
      </div>
      <p style="width: 100%;height: 8px;background: #f5f5f5;margin: 0"></p>
      <div v-if="userflag - 0 !== 1" style="position: relative;top: -44px;">
        <tabs :tab-items="sidebarInfo.tabs" :tab-index="sidebarInfo.tabIndex" :on-tab-click="sidebarTab"></tabs>
      </div>
      <div class="user-container" style="height: 93vh!important;">
        <!--房间列表-->
        <div v-if="sidebarInfo.tabIndex === 0 && (userflag - 0 !== 1)" style="margin-top: 36px;background: #fff;height: 93%">
          <div v-for="(item, index) in sidebarInfo.roomList" class="userlist-can" @click="changeRoom(item)"
               :class="{'selected': item.roomId === sidebarInfo.roomId}">
            <div class="userlist-can-child">
              <div class="userlist-child-left">
                <img src="../../static/images/icon-fangjian.png" alt="">
                <p>{{item.roomName}}</p>
              </div>
            </div>
          </div>
        </div>
        <!--会员管理-->
        <div v-if="sidebarInfo.tabIndex === 1 || (userflag - 0 === 1)" :style="{'margin-top': (userflag - 0 !== 1) ? '36px':'0px'}"
             style="background: #fff;height: 93%">
          <template>
            <div class="grey-line">
              <p>在线管理</p>
            </div>
            <p v-if="manageList.length === 0" style="margin: 10px 0px -10px 10px;font-size: 12px;
    height: 40px;">暂时没有客服在线</p>
            <div @click="readyToPrivateChat(item)" v-for="(item, index) in manageList" class="userlist-can">
              <div class="userlist-can-child">
                <div class="userlist-child-left">
                  <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <div class="userlist-child-right">
                  <img src="../../static/images/newlevels/kefu.png" alt="">
                </div>
              </div>
            </div>
          </template>
          <template>
            <div class="grey-line">
              <p>在线用户</p>
            </div>
            <div @click="readyToPrivateChat(item)" v-for="(item, index) in userDegree['10']" class="userlist-can">
              <div class="userlist-can-child">
                <div class="userlist-child-left">
                  <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <div class="userlist-child-right">
                  <img src="../../static/images/newlevels/10.png" alt="">
                </div>
              </div>
            </div>
            <div @click="readyToPrivateChat(item)" v-for="(item, index) in userDegree['9']" class="userlist-can">
              <div class="userlist-can-child">
                <div class="userlist-child-left">
                  <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <div class="userlist-child-right">
                  <img src="../../static/images/newlevels/9.png" alt="">
                </div>
              </div>
            </div>
            <div @click="readyToPrivateChat(item)" v-for="(item, index) in userDegree['8']" class="userlist-can">
              <div class="userlist-can-child">
                <div class="userlist-child-left">
                  <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <div class="userlist-child-right">
                  <img src="../../static/images/newlevels/8.png" alt="">
                </div>
              </div>
            </div>
            <div @click="readyToPrivateChat(item)" v-for="(item, index) in userDegree['7']" class="userlist-can">
              <div class="userlist-can-child">
                <div class="userlist-child-left">
                  <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <div class="userlist-child-right">
                  <img src="../../static/images/newlevels/7.png" alt="">
                </div>
              </div>
            </div>
            <div @click="readyToPrivateChat(item)" v-for="(item, index) in userDegree['6']" class="userlist-can">
              <div class="userlist-can-child">
                <div class="userlist-child-left">
                  <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <div class="userlist-child-right">
                  <img src="../../static/images/newlevels/6.png" alt="">
                </div>
              </div>
            </div>
            <div @click="readyToPrivateChat(item)" v-for="(item, index) in userDegree['5']" class="userlist-can">
              <div class="userlist-can-child">
                <div class="userlist-child-left">
                  <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <div class="userlist-child-right">
                  <img src="../../static/images/newlevels/5.png" alt="">
                </div>
              </div>
            </div>
            <div @click="readyToPrivateChat(item)" v-for="(item, index) in userDegree['4']" class="userlist-can">
              <div class="userlist-can-child">
                <div class="userlist-child-left">
                  <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <div class="userlist-child-right">
                  <img src="../../static/images/newlevels/4.png" alt="">
                </div>
              </div>
            </div>
            <div @click="readyToPrivateChat(item)" v-for="(item, index) in userDegree['3']" class="userlist-can">
              <div class="userlist-can-child">
                <div class="userlist-child-left">
                  <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <div class="userlist-child-right">
                  <img src="../../static/images/newlevels/3.png" alt="">
                </div>
              </div>
            </div>
            <div @click="readyToPrivateChat(item)" v-for="(item, index) in userDegree['2']" class="userlist-can">
              <div class="userlist-can-child">
                <div class="userlist-child-left">
                  <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <div class="userlist-child-right">
                  <img src="../../static/images/newlevels/2.png" alt="">
                </div>
              </div>
            </div>
            <div @click="readyToPrivateChat(item)" v-for="(item, index) in userDegree['1']" class="userlist-can">
              <div class="userlist-can-child">
                <div class="userlist-child-left">
                  <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                  <p>{{item.nickname}}</p>
                </div>
                <div class="userlist-child-right">
                  <img src="../../static/images/slidelevel/1.png" alt="">
                </div>
              </div>
            </div>
            <!-- <div @click="readyToPrivateChat(item)" v-for="(item, index) in userDegree['0']" class="userlist-can">
             <div class="userlist-can-child">
               <div class="userlist-child-left">
                 <img :src="'../../static/images/avatars/'+item.avatar" alt="">
                 <p>{{item.nickname}}</p>
               </div>
               <div class="userlist-child-right">
                 <img :src="'../../static/images/slidelevel/'+item.grade+'.png'" alt="">
               </div>
             </div>
           </div> -->
          </template>
        </div>
      </div>
      <!--只能与客服私聊的提示-->
      <div v-if="chatTip" class="chatTips">您只能与您的客服进行私聊</div>
    </div>
    <!--聊天室侧边栏 end-->
    <div @click="showSlide" v-if="isSLide" class="mask-layer"></div>
    <div class="home-context">
      <div class="page has-navbar" v-nav="{hideNavbar: true}">
        <!--头部-->
        <von-header theme="light" :fixed="true">
          <button @click="showSlide" slot="left" class="button button-icon">
            <span><i class="icon ion-navicon"></i></span>
          </button>
          <span slot="title">{{sidebarInfo.roomName}}</span>
          <button v-if="!isLogin" slot="right" class="button button-icon" @click="onMenu">
            <span style="font-size: 16px; color: #fff">登录</span>
          </button>
          <div v-else class="news-tip" slot="right">
            <div v-if="tipNum" class="tips">
              <p>{{tipNum}}</p>
            </div>
            <img @click="goToList" style="margin-right: 10px" width="24" height="22" src="../../static/images/xiaoxi.png" alt="">
            <img @click="goToCenter" width="22" height="22" src="../../static/images/yonghu.png" alt="">
          </div>
        </von-header>
        <!--tab切换-->
        <tabs :activeIndex="activeIndex" fixed :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
        <div ref="messageScroll" class="page-content moveMarginBottom" @click="closeSheet" :style="{'margin-bottom':contentMargin+'px', 'margin-top': (tabIndex === 0)?'82px':'82px'}">
          <scroll v-if="tabIndex===0" ref="scroller" :on-refresh="onRefresh">
            <div ref="msg" id="msg" class="messages" @click="hideForwardPop">
              <MessageItem v-for="(message,index) in messageList" :item="(message)" :index="index" :key="index"></MessageItem>
              <!--转发弹框-->
              <div v-show="forwardMsg.isShowForwardPop" class="forward" ref="forward" @click="goToForward" style="top: 20px;left: 118px">转发</div>
            </div>
          </scroll>
          <component v-if="tabIndex===2" v-bind:is="targetComponent.live"></component>
          <component v-if="tabIndex===1" v-bind:is="targetComponent.bet"></component>
          <component v-if="tabIndex===3" v-bind:is="targetComponent.customer"></component>
        </div>
        <!-- <Swiper v-show="tabIndex === 0"></Swiper> -->
        <!-- <div v-if="redBagFlag" class="redbag-container">
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
        </div> -->
        <!-- <div v-if="redStd === '1'" class="redbag-container">
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
                <li v-for="(item,index) in redRecord" >
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
        </div> -->
        <!--底部发送消息-->
        <div v-show="messageTabbar" style="background: #fff" class="tabbar moveBottom visible fixed" :style="`bottom:` + tabbarBottom + `px;`">
          <div class="message-bar">
            <div class="messagebar-area">
              <label>
                <textarea ref="textarea" placeholder="请输入信息" @focus="closeSheet" class="resizable textarea-class" v-model="message"></textarea>
              </label>
            </div>
            <div style="display: flex">
              <img @click="showIcons" style="width: 31px; height: 31px; margin-right: 10px" src="../../static/images/smile.png" alt="">
              <img v-if="!showSendBtn" @click="pushClick" style="width: 31px; height: 31px; margin-right: 10px" src="../../static/images/plus.png" alt="">
              <div v-if="showSendBtn" @click="sendClick" class="send-btn">发送</div>
            </div>
          </div>
        </div>
        <!--表情，以及上传图片，发红包-->
        <transition name="moveHeight">
          <div v-show="sheetShow" :style="!itemOrIcon ? itemIconStyle : ''" class="messagebar-sheet">
            <ul v-if="itemOrIcon">
              <li @click="uploadImg">
                <vue-core-image-upload
                  :crop="false"
                  :inputOfFile="'image'"
                  :credentials="true"
                  @imageuploaded="uploadImgSuccess"
                  @errorhandle="uploadImgError"
                  :text="''"
                  :headers="{token: userToken}"
                  :maxFileSize="2048000"
                  :inputAccept="'image/*'"
                  @imagechanged="uploadyanzheng"
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
                <div v-if="iconIndex === 0" class="emoji-bear-can">
                  <img @click="selectEmoji(realList.nameList[index])" v-for="(item, index) in realList.first" :src="item" alt="" :key='index'>
                </div>
                <div v-if="iconIndex === 1" style="justify-content: space-between" class="emoji-bear-can">
                  <img @click="selectBear(secondRealList.nameList[index])" style="width: 50px;height: 50px;margin: 1px 7px;" v-for="(item, index) in secondRealList.first" :src="item" alt="" :key='index'>
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
      <!-- <LiveModal ref="loginModal" title="欢迎登录" theme="default">
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
      </LiveModal> -->
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
  import GetChatHistory from '@/api/chathistory'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import {domain, PriviteCacheGet, PriviteLocalCache} from '../utils/privitelocalstorge.js'

  import Util from '@/utils/util'
  import Cookie from '@/utils/auth'
  import Emoji from '@/utils/dealemoji'
  import emojiData from '@/assets/js/emojidata'
  import bearData from '@/assets/js/beardata'
  import '@/assets/css/home.less'
  import '@/assets/css/redbag.less'
  import '@/assets/css/openredbag.less'
  import '../assets/css/silde.less'
  import '../assets/css/forwardMsg.less'

  export default {
    name: 'Home',
    components: {
      MessageItem,
      Smile,
      Customer,
      Bet,
      Live,
      Lottery,
      'vue-core-image-upload': VueCoreImageUpload,
    },
    data() {
      return {
        aiTeMeList:[],
        aiTeMe:0,
        isAiTeMe:false,
        ling: true,
        onlyManager: false,
        isLingqu: null,
        littleBag: true,
        allred: false,
        isRed: true,
        isNewBag: true,
        showSendBtn: false,
        tipNum: 0,
        commonUserNum: 0,
        managerNum: 0,
        weiduNum: 0,
        weiduHeight: 0,
        sign: 0,
        lingquList: [],
        result: [],
        allRedList: [],
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
        iconIndex: 0,
        itemIconStyle: {
          height: '150px',
          border: 'none'
        },
        itemOrIcon: true, //底部功能区切换
        chatUrl: Constants.chatUrl,
        imgUrl: Constants.staticUrl,
        isSLide: false,
        tabs: [
          "聊天",
          // '计划',
          "投注",
          "开奖",
          "直播",
        ],
        tabIndex: 0,
        targetComponent: {
          msg: MessageItem,
          lottery: Lottery,
          live: Live,
          bet: Bet,
          customer: PrettyLive
        },
        menuButtonText: '',
        message: '',
        sheetShow: false,
        sheetHeight: 90,
        tabbarBottom: 0,
        contentMargin: 48,
        loginLoading: false,
        isLogin: false,
        messageTabbar: true,
        isScroll: true,
        userInfo: {},
        loginForm: {
          username: '',
          password: ''
        },
        messageList: [],
        isSendMessage: false,
        redBagFlag: false,
        balance: '0.00',
        grabMoney: '0',
        redForm: {
          moneyMount: '',
          num: ''
        },
        redId: '',
        redBagStutas: '',
        redData: {
          redpackInfo: {}
        },
        redRecord: [],
        isSignin: Boolean,
        manageList: [],
        UserCount: 0,
        uploadImgToken: this.$store.state.token,
        userDegree: {
          '10': [],
          '9': [],
          '8': [],
          '7': [],
          '6': [],
          '5': [],
          '4': [],
          '3': [],
          '2': [],
          '1': [],
          '0': []
        },
        pictureSize: {
          width: '',
          height: ''
        },
        chatTip: false,
        sidebarInfo: {
          tabs: [
            "房间",
            "会员管理",
          ],
          tabIndex: 0,
          roomList: [],
          roomId: '',
          roomName: ''
        },
        isOnLineNotice: false,
        onlineName: '',
        forwardMsg: {
          isShowForwardMsg: false,
          roomIds: [],
          isSelectedAllRoom: true,
          isShowForwardPop: false
        },
      }
    },
    watch: {
      tipNum(data) {
        if (data > 99) {
          this.tipNum = '99+';
        }
      },
      onlyManager(data) {
        this.$store.commit('UPDATE_MANAGE', data);
      },
      message(data) {
        if (data) {
          if (this.$store.state.userInfo.userflag === 1) {
            if (data.length > 40) {
              this.showPopup('发言字数不能超过40字！');
              this.message = this.message.slice(0, 40);
            }
          }
          if (data.trim()) {
            this.showSendBtn = true;
          } else {
            this.showSendBtn = false;
          }
          if (!this.atWord && (data.includes('@') || data.includes('@'))) {
            this.$router.push({name: 'sortpage'});
          }
          if (!data.includes(this.$store.state.atWord)) {
            if ((data === '@' || data === '@')) {
              this.$store.commit('SET_ATWORD', '');
            } else {
              this.$store.commit('SET_ATWORD', data);
            }
          }
        } else {
          this.showSendBtn = false;
        }
      },
      redStd(data) {
        if (data === '2') {
          Red.getDetail({redpacketId: this.$store.state.redBagId}).then(res => {
              this.redData = res.data;
            }
          )
        }
      }
    },
    computed: {
      atWord() {
        return this.$store.state.atWord;
      },
      activeIndex() {
        return this.$store.state.activeIndex;
      },
      redStd() {
        return this.$store.state.redBagStutas;
      },
      redInfo() {
        return this.$store.state.redInfo;
      },
      userToken() {
        return this.$store.state.token;
      },
      isOnline() {
        return this.$store.state.isLogin;
      },
      userflag() {
        return this.$store.state.userInfo.userflag;
      }
    },
    created() {
      if (!!this.$store.state.atWord) {
        if (!this.message) {
          this.message = '';
        }
        this.message += this.$store.state.atWord;
      }
      this.getUserInfo();
      this.getMessageHistory();
      for (let i in emojiData.firstEmoji) {
        this.realList.nameList.push(i);
        this.realList.first.push(emojiData.firstEmoji[i]);
      }
      for (let i in bearData.allEmoji) {
        this.secondRealList.nameList.push(i);
        this.secondRealList.first.push(bearData.allEmoji[i]);
      }
    },
    mounted() {
      var that = this;
      let tmp = document.getElementsByClassName('scroll')[0];
      let tmpl = document.getElementById('msg');
      let winHei = window.innerHeight - 103;
      this.ling = true;
      let list = PriviteCacheGet(domain);
      if (list !== null) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].neverseen === true) {
            this.tipNum ++;
          }
          if (list[i].data.length !== 0) {
            for (let j = 0; j < list[i].data.length; j++) {
              if (list[i].data[j].neverseen === true) {
                this.tipNum ++;
              }
            }
          }
        }
      }
      this.isQiandao();
      this.$nextTick(() => {
        tmp.addEventListener('scroll', () => {
          let h = tmp.scrollTop;
          let hei = tmpl.offsetHeight;
          if ((hei - h) < winHei) {
            this.weiduNum = 0;
          }
        }, true);
        setTimeout(() => {
          this.scrollToBottom();
        }, 200);
      });
      // 用户上线事件发布
      this.$root.eventHub.$on("onlineEvent", item => {
        this.onlineName = item.nickname;
        this.isOnLineNotice = true;
        setTimeout(() => {
          this.isOnLineNotice = false;
        }, 1500);
        this.dealUserList(item);
      });
      // 断开连接
      this.$root.eventHub.$on("disconnectEvent", item => {
        if (item.user_degree - 0 !== 0) {
          this.deleteOfflineUser(item);
        }
      });
      // 显示登陆框事件
      this.$root.eventHub.$on("showLoginEvent", item => {
        that.$refs.loginModal.show();
      });
      // 接收到公共消息事件
      this.$root.eventHub.$on('PrivateChatReceiveEvent', item => {
        this.tipNum += 1;
      });
      // 接收消息回调
      this.$root.eventHub.$on("ReceiveMessageEvent", item => {
        this.messageList.push(item);
        if(item.isAiTeMeMsg === true) {
          this.pushAiTeMe(item.context.msg,item.time);
        }
        this.$nextTick(() => {
          let tmp = document.getElementsByClassName('scroll')[0];
          let tmpl = document.getElementById('msg');
          let scrollTop = tmp.scrollTop;
          let tmplHeight = tmpl.offsetHeight;
          let winHei = window.innerHeight - 153;
          if ((tmplHeight - scrollTop) > winHei) {
            this.weiduNum ++;
          }
        });
      });
      // 发送消息完成事件发布
      this.$root.eventHub.$on("sendMessageCompleteEvent", item => {
        that.message = null;
        that.isSendMessage = false;
      });
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      // 发言频繁通知
      this.$root.eventHub.$on("systemptips", item => {
        this.showPopup(item.content.msg);
      });
      // 获取房间列表以及房间号
      this.$root.eventHub.$on("roomMessage", item => {
        this.sidebarInfo.roomList = item.roomList;
        this.sidebarInfo.roomId = item.roomId;
        this.sidebarInfo.roomName = item.roomName;
      });
      // 转发弹框
      this.$root.eventHub.$on("forwardPop", item => {
        this.forwardMsg.isShowForwardPop = true;
        this.$refs.forward.style.top = (item - 35) + 'px';
      });
      // 消息转发完成
      this.$root.eventHub.$on("sendToRoomCompleteEvent", item => {
        this.forwardMsg.isShowForwardMsg = false;
        this.forwardMsg.isShowForwardPop = false;
        this.forwardMsg.isSelectedAllRoom = true;
        this.forwardMsg.roomIds = [];
      });
      // @用户
      this.$root.eventHub.$on("atPeople", item => {
        this.message = item;
      });
    },
    destroyed() {
      this.closeBag();
    },
    methods: {
      // 消息转发页面
      goToForward() {
        this.forwardMsg.isShowForwardMsg = true;
      },
      // 取消消息转发
      backToHome() {
        this.forwardMsg.isShowForwardMsg = false;
        this.forwardMsg.isShowForwardPop = false;
        this.forwardMsg.isSelectedAllRoom = true;
        this.forwardMsg.roomIds = [];
      },
      checkState(e) {
        let that = this;
        setTimeout(function(){
          console.log('this.roomIds:' + that.forwardMsg.roomIds);
        }, 1);
      },
      // 房间全选
      selectedAllRoom() {
        this.forwardMsg.isSelectedAllRoom = false;
        this.sidebarInfo.roomList.forEach((el,i) => {
          let roomId = el.roomName.split("-")[1] - 0;
          if(this.forwardMsg.roomIds.indexOf(roomId) === -1){
            this.forwardMsg.roomIds.push(roomId);
          }
        });
      },
      // 取消房间全选
      cancelAllRoom() {
        this.forwardMsg.isSelectedAllRoom = true;
        this.forwardMsg.roomIds = [];
      },
      sendToRoom() {
        if(!this.forwardMsg.roomIds.length){
          this.showPopup('请选择房间！');
          return;
        }
        let roomIds = this.forwardMsg.roomIds.join(",");
        let params = {
          msgid: this.$store.state.forwardMsgId,
          roomIds: roomIds
        };
        this.$root.sendToRoom(params);
      },
      hideForwardPop() {
        this.forwardMsg.isShowForwardPop = false;
      },
      // 切换房间
      changeRoom(roomInfo) {
        this.isSLide = false;
        if(roomInfo.roomId === this.$store.state.currentRoomId){
          return;
        }
        this.sidebarInfo.roomId = roomInfo.roomId;
        this.sidebarInfo.roomName = roomInfo.roomName;
        this.$store.commit('UPDATE_CURRENTROOMID', roomInfo.roomId);
        this.$root.subscribeRoom(this.sidebarInfo.roomId);
        this.weiduNum = 0;
        this.allRedList = [];
        this.messageList = [];
        this.getMessageHistory();
      },
      pushAiTeMe(item,msgId) {
        this.aiTeMeList.push(msgId);
        this.aiTeMe += 1;
        this.isAiTeMe = true;
      },
      goAnchor() {
        if(this.aiTeMeList.length > 0) {
          var aimeList = this.aiTeMeList;
          var selector = aimeList[aimeList.length - 1];
          var selectors = '#anchor-' + selector;
          if(selectors) {
            var anchor = this.$el.querySelector(selectors);
            if(anchor) {
              let tmp = document.getElementsByClassName('scroll')[0];
              if (anchor.offsetTop) {
                tmp.scrollTo(0, anchor.offsetTop);
              }
            }
            this.aiTeMeList.pop();
            this.aiTeMe -= 1;
            this.isScroll = false;
            setTimeout(() => {
              this.isScroll = true;
            },10000);
          }
        }
      },
      showItem() {
        alert(onlyManager);
      },
      onRefresh(done) {
        setTimeout(() => {
          this.getMessageHistory();
          done();
        }, 1000);
      },
      onInfinite(done) {
        alert(1);
        done();
      },
      lingqu(id, index) {
        this.lingquList[index] = false;
        Red.grab(id).then(response => {
          let data = response.data;
          this.$store.commit('SET_RECIVERED', data.receivedRedpack.money);
          Red.getDetail({redpacketId: id}).then(res => {
              console.log(res.data);
              this.$store.commit('UPDATE_REDETAIL', res.data.packList);
              this.$store.commit('UPDATE_REDBAG', res.data.redpackInfo);
            }
          )
        })
      },
      lingquXiangqing() {
        this.$router.push({name: 'reddetail'});
      },
      closeLittleBag() {
        this.littleBag = false;
      },
      closeAllBag() {
        this.allred = false;
      },
      getAllBag() {
        this.allred = true;
        Red.getAllRedBag().then(res => {
            for (let i = 0; i < res.data.length; i++) {
              this.lingquList.push(true);
            }
            this.allRedList = res.data;
          }
        )
      },
      goToList() {
        this.$router.push({name: 'plist'});
      },
      getUserInfo() {
        var that = this;
        Login.getInfo().then(response => {
          const data = response.data;
          this.isLogin = Constants.isLogin = true;
          const userdata = {
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
          that.userInfo = userdata;
          that.$store.commit("SET_USER_INFO", userdata);
          that.$store.commit('SET_LOGIN', true);
          that.$root.eventHub.$emit("onLiveChatEvent", this.$store.state.userInfo);
          PriviteLocalCache(domain + 'userid', data.userId);
          this.$root.disconnect();
          setTimeout(() => {
            that.$root.InitSocket();
          }, 100);
        }).catch(error => {
          this.$router.push({name: 'regist'});
          this.$root.disconnect();
          // that.isLogin = Constants.isLogin = false;
          // var rname = md5.getMd5();
          // const userdata = {
          // 	userid:rname,
          // 	nickname:'游客'+rname,
          //  		userflag:1,
          //  		headimage:'default.gif',
          //  		userdegree:0
          // }
          // that.userInfo = userdata;
          // if(that.$store){
          // 		that.$store.commit("SET_USER_INFO",userdata);
          // 	}
          // 	that.$root.eventHub.$emit("onLiveChatEvent",this.$store.state.userInfo);
          // that.$root.InitSocket();
        });
      },
      readyToPrivateChat(data) {
        if((data.flag - 0 !== 2) && (this.$store.state.userInfo.userFlag - 0 !== 2)){
          this.chatTip = true;
          setTimeout(() => {
            this.chatTip = false;
          }, 2000);
        } else {
          let info = {
            privateUser: data,
            currentUser: this.userInfo
          };
          // this.$root.eventHub.$emit('StartPrivate', info);
          this.$store.commit('SET_PINFO', info);
          this.$router.push({
            path: '/private',
            query: {id: data.userid, nickname: data.nickname}
          })
        }
      },
      seeLatestInfo() {
        this.$nextTick(() => {
            let tmp = document.getElementsByClassName('scroll')[0];
            let tmpl = this.$refs.msg;
            tmp.scrollTo(0, tmpl.offsetHeight);
            this.weiduNum = 0;
        });
      },
      cancleALl() {
        if (this.messageList.length === 0) {
          $toast.show('当前没有消息记录！');
          return false;
        }
        $dialog.confirm({
          title: '提示',
          content: '确定清空屏幕消息吗？',
          cancleText: '取消',
          okText: '清除'
        }).then((res) => {
            if (res === true) {
              $toast.show('清除成功');
              this.weiduNum = 0;
              this.messageList.splice(0);
            }
          }
        )
      },
      closeBag() {
        this.$store.commit('UPDATE_STD', '');
      },
      goToRed() {
        this.$router.push({name: 'redsend'});
      },
      goToCenter() {
        this.$router.push({name: 'center'});
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
      getMessageHistory() {
        let time = '';
        if (this.messageList.length !== 0) {
          time = this.messageList[0].msgtime ? this.messageList[0].msgtime : this.messageList[0].time;
        }
        GetChatHistory(time).then(res => {
            let data = res.data.reverse();
            for (let i = 0; i < data.length; i++) {
              let buf = {};
              buf.grabnickname = data[i].grabnickname;
              buf.avatar = data[i].fromuserheadimage;
              buf.context = data[i].content;
              buf.flag = data[i].fromuseruserflag;
              buf.type = data[i].type;
              buf.mtype = data[i].mtype;
              buf.nickname = data[i].fromnickname;
              buf.time = data[i].msgtime;
              buf.userid = data[i].fromuserid;
              buf.grade = data[i].fromuseruserdegree;
              buf.msgid = data[i].msgid;
              if (data[i].mtype !== 'redpacket' && data[i].content.msg.length < 100) {
                let firstDeal = Emoji(data[i].content.msg);
                if (data[i].content.id - 0 === 1) {
                  data[i].content.msg = '<img style="width: 100%" src="http://' + data[i].content.msg + '?imageView2/2/w/220">';
                  buf.context = data[i].content;
                }
                if (typeof firstDeal !== 'string') {
                  let emojiMsg = '';
                  let speEmoji = ['[鲜花]', '[顶一个]', '[赞]', '[大鲜花]', '[赞一个]', '[掌声]'];
                  for (let i = 0; i < firstDeal.length; i++) {
                    if (speEmoji.includes(firstDeal[i])) {
                      let m = emojiData.firstEmoji[firstDeal[i]] ? '<img src="' + emojiData.firstEmoji[firstDeal[i]] + '">' : firstDeal[i];
                      let n = bearData.allEmoji[m] ? '<img style="width: 92px" src="' + bearData.allEmoji[m] + '">' : m;
                      emojiMsg += n;
                    } else {
                      let m = emojiData.firstEmoji[firstDeal[i]] ? '<img style="width: 24px" src="' + emojiData.firstEmoji[firstDeal[i]] + '">' : firstDeal[i];
                      let n = bearData.allEmoji[m] ? '<img style="width: 92px" src="' + bearData.allEmoji[m] + '">' : m;
                      emojiMsg += n;
                    }
                  }
                  buf.context.msg = emojiMsg;
                }
              }
              this.messageList.splice(0, 0, buf);
            }
          }
        )
      },
      showSlide() {
        if(!this.isSLide){
          this.getUserList();
        }
        this.isSLide = !this.isSLide;
      },
      checkBeen(arr, item) {
        for (let i = 0; i < arr.length; i++) {
          if (item === arr[i].userid) {
            arr.splice(i, 1);
            return true;
          } else {
            return false;
          }
        }
      },
      checkRepeat(arr, item) {
        for (let i = 0; i < arr.length; i++) {
          if (item - 0 === arr[i].userid - 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      getUserList(info) { // 获取用户列表
        var that = this;
        for (let i in this.userDegree) {
          this.userDegree[i].splice(0);
        }
        User.getList().then(response => {
          const data = response.data;
          var temp = data;
          var manaeeTemp = [];
          if (info) {
            let tip = {
              userid: info.userid,
              user_degree: info.userdegree,
              nickname: info.nickname,
              grade: Util.isNull(info.userdegree) ? 0 : info.userdegree,
              avatar: info.headimage,
              flag: info.user_flag
            };
            this.userDegree[info.userdegree].push(tip);
          }
          data.forEach(item => {
            if (item.user_id !== that.userInfo.userid && (item.user_flag - 0 === 1 || item.user_flag - 0 === 3)) {
              const obj = {
                userid: item.user_id,
                user_degree: item.user_degree,
                nickname: item.nickname,
                grade: Util.isNull(item.user_degree) ? 0 : item.user_degree,
                avatar: (item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.gif' : item.head_image,
                sessionid: item.sessionid,
                flag: item.user_flag
              };
              let isRepeat = true;
              temp.forEach(tempItem => {
                if (tempItem.userid - 0 === item.user_id - 0) {
                  isRepeat = false;
                }
              });
              if (isRepeat) {
                switch (obj.user_degree - 0) {
                  case 10 :
                    this.userDegree['10'].push(obj);
                    break;
                  case 9 :
                    this.userDegree['9'].push(obj);
                    break;
                  case 8 :
                    this.userDegree['8'].push(obj);
                    break;
                  case 7 :
                    this.userDegree['7'].push(obj);
                    break;
                  case 6 :
                    this.userDegree['6'].push(obj);
                    break;
                  case 5 :
                    this.userDegree['5'].push(obj);
                    break;
                  case 4 :
                    this.userDegree['4'].push(obj);
                    break;
                  case 3 :
                    this.userDegree['3'].push(obj);
                    break;
                  case 2 :
                    this.userDegree['2'].push(obj);
                    break;
                  case 1 :
                    this.userDegree['1'].push(obj);
                    break;
                  case 0 :
                    this.userDegree['0'].push(obj);
                    break;
                }
              }
            } else if (item.user_flag - 0 === 2) {
              const obj = {
                userid: item.user_id,
                nickname: item.nickname,
                flag: item.user_flag,
                grade: Util.isNull(item.user_degree) ? 0 : item.user_degree,
                avatar: (item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.gif' : item.head_image
              };
              let isRepeat = true;
              manaeeTemp.forEach(tempItem => {
                if (tempItem.userid == item.user_id) {
                  isRepeat = false;
                }
              });
              if (isRepeat) {
                manaeeTemp.push(obj);
              }
            }
          });
          that.OnLineUserList = temp;
          that.tempOnLineUserList = temp;
          let num = Constants.isLogin ? 1 : 0;
          // for(let j=0; j<that.OnLineUserList.length; j++) {
          // 	if(that.OnLineUserList[j].user_degree > 0) {
          // 		num++
          // 	}
          // }
          that.UserCount = data.length + num;
          that.manageList = manaeeTemp;
        });
      },
      dealUserList(item) {
        let obj = {
          userid: item.user_id,
          nickname: item.nickname,
          flag: item.user_flag,
          grade: Util.isNull(item.user_degree) ? 0 : item.user_degree,
          avatar: (item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.gif' : item.head_image,
          sessionid: item.sessionid,
        };
        if (obj.flag - 0 === 1 || obj.flag - 0 === 3) {
          switch (obj.grade - 0) {
            case 10 :
              if (!this.checkRepeat(this.userDegree['10'], obj.userid)) {
                this.UserCount++;
                this.userDegree['10'].push(obj);
              }
              break;
            case 9 :
              if (!this.checkRepeat(this.userDegree['9'], obj.userid)) {
                this.UserCount++;
                this.userDegree['9'].push(obj);
              }
              break;
            case 8 :
              if (!this.checkRepeat(this.userDegree['8'], obj.userid)) {
                this.UserCount++;
                this.userDegree['8'].push(obj);
              }
              break;
            case 7 :
              if (!this.checkRepeat(this.userDegree['7'], obj.userid)) {
                this.UserCount++;
                this.userDegree['7'].push(obj);
              }
              break;
            case 6 :
              if (!this.checkRepeat(this.userDegree['6'], obj.userid)) {
                this.UserCount++;
                this.userDegree['6'].push(obj);
              }
              break;
            case 5 :
              if (!this.checkRepeat(this.userDegree['5'], obj.userid)) {
                this.UserCount++;
                this.userDegree['5'].push(obj);
              }
              break;
            case 4 :
              if (!this.checkRepeat(this.userDegree['4'], obj.userid)) {
                this.UserCount++;
                this.userDegree['4'].push(obj);
              }
              break;
            case 3 :
              if (!this.checkRepeat(this.userDegree['3'], obj.userid)) {
                this.UserCount++;
                this.userDegree['3'].push(obj);
              }
              break;
            case 2 :
              if (!this.checkRepeat(this.userDegree['2'], obj.userid)) {
                this.UserCount++;
                this.userDegree['2'].push(obj);
              }
              break;
            case 1 :
              if (!this.checkRepeat(this.userDegree['1'], obj.userid)) {
                this.UserCount++;
                this.userDegree['1'].push(obj);
              }
              break;
            case 0 :
              if (!this.checkRepeat(this.userDegree['0'], obj.userid)) {
                this.userDegree['0'].push(obj);
              }
              break;
          }
        } else if (obj.flag - 0 === 2) {
          if (!this.checkRepeat(this.manageList, obj.userid)) {
            this.manageList.push(obj);
          }
        }
      },
      deleteOfflineUser(item) {
        for (let i in this.userDegree) {
          if(this.userDegree[i].length > 0){
            for (let j = 0; j < this.userDegree[i].length; j++) {
              if(this.userDegree[i][j].userid - 0 === item.user_id - 0){
                this.userDegree[i].splice(j, 1);
              }
            }
          }
        }
        if(this.manageList.length > 0){
          for (let i = 0; i < this.manageList.length; i++) {
            if(this.manageList[i].userid - 0 === item.user_id - 0){
              this.manageList.splice(i, 1);
            }
          }
        }
      },
      uploadyanzheng(res) {
        let that = this;
        return new Promise(function (resolve, reject) {
          let reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onload = function (theFile) {
            let image = new Image();
            image.src = theFile.target.result;
            image.onload = function () {
              that.pictureSize.width = this.width;
              that.pictureSize.height = this.height;
            }
          }
        })
      },
      uploadImgOverflow(err) {
        this.showPopup(`图片超过限定大小！`);
        return false;
      },
      uploadImgError(err) {
        this.showPopup(`上传图片出错! ${err}`);
      },
      uploadImgSuccess(callbackData) {
        if (callbackData.code !== 0 || callbackData.url === null) {
          this.showPopup('上传图片出错！');
          return false;
        } else {
          let img = callbackData.url;
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
              msg: img,
              width: this.pictureSize.width,
              height: this.pictureSize.height,
            }
          };
          if (this.userInfo.userflag - 0 === 2) { // 管理员
            jsonMsg.mtype = 'customer';
          }
          this.$root.sendToAll(jsonMsg);
        }
      },
      uploadImg() {
        var grade = this.$store.state.userInfo.userdegree;
        var flag = this.$store.state.userInfo.userflag;
        if (flag - 0 === 1) {
          if (grade < 3) {
            $toast.show(`您没有上传图片的权限！`, 1500);
            return false;
          }
        }
        return true;
      },
      randerList() {
        if (!Util.isNull(this.$root.sidebar)) {
          console.log('-sidebar销毁-->');
          this.$root.sidebar = null;
          $sidebar.destroy();
        }
        var template = this.$refs.OnlineUserTemplate.innerHTML;
        if (Util.isNull(this.$root.sidebar)) {
          console.log('-sidebar创建-->');
          this.$root.sidebar = $sidebar.fromTemplate(template, {position: 'left'})
        }
      },
      qiandao() {
        if (!this.$store.state.isLogin) {
          this.showPopup('亲，请先登录哦！');
          return false
        }
        if (this.isSignin) {
          this.showPopup('今日已经签到过了！');
          return false
        }
        SigninApi.checkIn().then(res => {
            this.isSignin = true;
            $toast.show(`签到成功，获得${res.data.gold}金币`, 1500);
          }
        )
      },
      isQiandao() {
        SigninApi.checkSigin().then(response => {
          let data = response.data;
          this.isSignin = (data.isqiandao - 0 === 1);
        }).catch(error => {
          //$toast.show(error.message || error.msg, 1500);
        });
      },
      openAll() { // 查看大家手气
        this.redRecord = [];
        this.redData.packList.forEach(item => {
          var record = {
            avatar: item.receiverHeadImage,
            nickname: item.receiverName,
            money: item.money,
            time: item.receiveTime
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
        console.log(data + 'methods')
      },
      openRedBag() {
        var that = this;
        let id = this.$store.state.redInfo.redBagId;
        Red.grab(id).then(response => {
          let data = response.data;
          this.$store.commit('SET_RECIVERED', data.receivedRedpack.money);
          Red.getDetail({redpacketId: id}).then(res => {
              this.$store.commit('UPDATE_REDETAIL', res.data.packList);
              this.$store.commit('UPDATE_REDBAG', res.data.redpackInfo);
              this.$store.commit('UPDATE_STD', '2');
              this.$router.push({name: 'reddetail'});
            }
          )
        })
      },
      openRedSubmit() {
        var that = this;
        let id = this.$store.state.redInfo.redBagId;
        Red.grab(id).then(response => {
          let data = response.data;
          that.redData = data;
          this.$store.commit('UPDATE_STD', '2');
          that.grabMoney = data.receivedRedpack.money;
          this.$router.push({name: 'recond'})
        });
      },
      closeWindow() {
        for (let i in this.redForm) {
          this.redForm[i] = '';
        }
        this.redBagFlag = false;
      },
      redBagSubmit() {
        if (Util.isNull(this.redForm.moneyMount)) {
          this.showPopup('红包金额不能为空！');
          return false;
        }
        if (Util.isNull(this.redForm.num)) {
          this.showPopup('红包个数不能为空!');
          return false;
        }
        if (!Util.isNumber(Number(this.redForm.moneyMount))) {
          this.showPopup('请输入正确的红包金额!');
          return false;
        }
        if (!Util.isNumber(Number(this.redForm.num)) || Number(this.redForm.num <= 0)) {
          this.showPopup('请输入正确的红包个数!');
          return false;
        }
        if (this.redForm.moneyMount < 5) {
          this.showPopup('金额必须大于5元!');
          return false;
        }
        if (this.redForm.moneyMount > this.balance) {
          this.showPopup('红包金额不能大于账户余额!')
        }
        var params = {
          num: this.redForm.num,
          amout: this.redForm.moneyMount,
          remarks: '恭喜发财,大吉大利'
        };
        Red.send(params).then(response => {
          // this.sendRedLoading = false;
          // this.sendRedModal = false;
          this.redBagFlag = false;
        }).catch(error => {
          // this.sendRedLoading = false;
        });
      },
      getBalance() {
        Red.getBalance().then(res => {
            this.balance = res.data.money;
          }
        )
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
        };
        let popup = $popup.fromTemplate('<p style="margin-bottom: 0; text-align: center;">' + data + '</p>', options);
        popup.show().then((buttonIndex) => {console.log(buttonIndex);});
      },
      toggleSidebar() {
        this.randerList();
        this.$root.sidebar.toggle();
      },
      onMenu() {
        this.$router.push({name: 'regist'});
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
      },
      sendClick() {
        if (!this.$root.isSocketConnect) {
          $toast.show('网络异常与服务器连接已断开。', 1500);
          return;
        }
        let text = this.message.replace(/&nbsp;/ig, '').trim();
        if (Util.isNull(text)) {
          $toast.show('不能发送空白消息。', 1500);
          return;
        }
        var grade = this.$store.state.userInfo.userdegree;
        var flag = this.$store.state.userInfo.userflag;
        if (flag - 0 === 1) {
          if (grade === 1 || grade === 0) {
            $toast.show('没有发言权限！', 1500);
            return;
          }
        }
        if (this.isSendMessage) {
          return;
        }
        this.isSendMessage = true;
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
          senttype: 'received',
          content: {
            id: 0,
            msg: this.message
          }
        };
        if (this.userInfo.userflag - 0 === 2) { // 管理员
          jsonMsg.mtype = 'customer';
        }
        setTimeout(() => {
          this.seeLatestInfo();
        }, 200);
        this.$root.sendToAll(jsonMsg);
        this.message = '';
      },
      onTabClick(index) {
        this.tabIndex = index;
        this.messageTabbar = false;
        this.sheetShow = false;
        this.tabbarBottom = 0;
        this.contentMargin = 0;
        if (index === 0) { // 表示选择了聊天
          this.contentMargin = 48;
          this.messageTabbar = true;
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      },
      defaultFaceChange(item) {
        if (Util.isNull(this.message)) {
          this.message = '';
        }
        this.message += item;
      },
      loginClick() {
        var that = this;
        if (this.loginLoading) {
          return;
        }
        if (!this.loginForm.username.trim()) {
          $dialog.alert({
            content: '请输入您的会员账号',
            okTheme: 'positive',
            effect: 'slide'
          }).then(() => {
            console.log('alert hide.');
          });
          return;
        }
        if (!this.loginForm.password.trim()) {
          $dialog.alert({
            content: '请输入登录密码',
            okTheme: 'positive',
            effect: 'slide'
          }).then(() => {
            console.log('alert hide.')
          });
          return;
        }
        $loading.show('正在登录...');
        this.loginLoading = true;
        Login.loginUser(this.loginForm).then(response => {
          const data = response.data;
          that.loginLoading = false;
          $loading.hide();
          that.isLogin = Constants.isLogin = true;
          Cookie.setToken(data.token);
          const userdata = {
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
          this.userDegree[userdata.userdegree].push(userdata);
          that.userInfo = userdata;
          if (that.$store) {
            that.$store.commit("SET_USER_INFO", userdata);
            that.$store.commit("SET_TOKEN", data.token);
            that.$store.commit("SET_LOGIN", true);
          }
          this.$refs.loginModal.hide();
          // that.$root.disconnect();
          // setTimeout(()=>{
          //   that.$root.InitSocket();
          // },100);
        }).catch(error => {
          that.loginLoading = false;
          $loading.hide();
        });
      },
      scrollToBottom() {
        let tmp = document.getElementsByClassName('scroll')[0];
        let tmpl = this.$refs.msg;
        if (tmpl && tmpl.offsetHeight) {
          tmp.scrollTo(0, tmpl.offsetHeight);
        }
      },
      sidebarTab(index) {
        this.sidebarInfo.tabIndex = index;
      }
    },
    beforeDestroy() {
      this.isSignin = false;
    }
  }
</script>
<style>
  .forward {
    width: 150px;
    height: 35px;
    line-height: 35px;
    background: #fff;
    text-align: center;
    position: absolute;
    box-shadow:2px 2px 10px #909090;
  }

  .selected {
    background-color: #f5f5f5!important;
  }

  .onlineNotice {
    position: absolute;
    top: 18%;
    left: 0;
    z-index: 10;
    width: 200px;
    height: 30px;
    line-height: 30px;
    background: #ee0024;
    border-radius: 0 25px 25px 0;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }

  .aite {
    position: absolute;
    top: 20%;
    right: 0;
    cursor: pointer;
    z-index: 100;
    height: 60px;
    width: 100px;
  }

  .aite .aitewo{
    background: #fff;
    border-radius: 25px 0 0 25px;
    color:#EE0024;
    font-size: 16px;
    line-height: 30px;
    height: 30px;
    text-align: center;
    top: 100px;
    left: 0;
    box-shadow:2px 2px 10px #909090;
  }

  .chatTips {
    text-align: center;
    position: absolute;
    bottom: 40px;
    left: 0;
    border: 1px solid #e5e5e5;
    padding: 5px 15px;
    border-radius: 50px;
    font-size: 12px;
    margin: 0 17%;
    background: #fefefe;
    box-shadow:2px 2px 10px #909090;
  }

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
    height: 38px !important;
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

  .toggle .track {
    width: 48px;
    height: 25px;
  }

  .toggle .handle {
    width: 21px;
    height: 21px;
    border-radius: 50%;
  }


  .toggle.toggle-balanced input:checked + .track {
    border-color: #EE0024;
    background-color: #EE0024;
  }

  .toggle input:checked + .track {
    border-color: rgb(221, 31, 59);
    background-color: rgb(221, 31, 59);
  }

  .von-toggle {
    height: 40px;
  }

  .button.button-assertive {
    border-color: transparent;
    background-color: #EE0024 !important;
    color: #fff;
  }

  .viewer-backdrop {
    background-color: rgba(0, 0, 0, 0.8) !important;
  }
</style>
