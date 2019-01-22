<template>
  <div>
    <div v-if="item.type === 'red'" class="message-wrap">
      <div class="redbag-info1">
        <p style="color:#444;">{{item.grabnickname}} <span style="color: #999">领取了</span> <span style="color:#EE0024;">{{item.nickname}}</span>
          <span style="color: #999">的红包 </span></p>
      </div>
    </div>
    <template v-if="item.type === 'message' && ((item.flag - 0 === 1 || item.flag - 0 === 3) || !item.flag) && !manager">
      <div v-if="item.userid -0 !== userinfo.userid - 0" :id="[item.isAiTeMeMsg ? ('anchor-' + item.time) : '']"
           class="msg-content-common">
        <div class="msg-common-header" @touchstart.prevent="atPeople(item, $event)" @touchend.prevent="cleartime">
          <img :src="'../../static/images/avatars/' + item.avatar" alt="">
        </div>
        <div class="msg-common-content">
          <div class="common-content-header">
            <div :class="{
							'kefu': item.flag-0 === 2, 
							'diwang': item.grade-0 === 10,
							'chengxiang': item.grade-0 === 9,
							'xunfu': item.grade-0 === 8,
							'zongdu': item.grade-0 === 7,
							'zhifu': item.grade-0 === 6,
							'tongpan': item.grade-0 === 5,
							'zhixian': item.grade-0 === 4,
							'dizhu': item.grade-0 === 3,
							'nongmin': item.grade-0 === 2,
							'huiyuan': item.grade-0 === 1
							}"></div>
            <p>{{item.nickname}}</p>
            <p>{{item.time | dateFormat('hh:mm:ss')}}</p>
          </div>
          <div class="common-content">
            <div v-if="item.mtype === 'redpacket'" class="redbag"
              @click="GrabRedClick(item.context.redpacketid, item.context.remarks, item.avatar, item.nickname)">
              <img
                style="position: absolute; left: 12px; top: 8px"
                width="38"
                height="43"
                src="../assets/images/hongbao/leftred.png" alt="">
              <h1>{{item.context.remarks}}</h1>
              <p>查看红包</p>
              <span>红包</span>
            </div>
            <div v-if="item.mtype !== 'redpacket'" class="normal-chat" @touchstart.prevent="showForwardButton(item, $event)" @touchend.prevent="cleartime">
              <p v-viewer="{navbar: false, rotatable: false, scalable: false,}" v-html="item.context.msg" style="margin-bottom: 0"></p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.userid - 0 === userinfo.userid - 0" :id="[item.isAiTeMeMsg ? ('anchor-' + item.time) : '']"
           style="justify-content: flex-end; width: 97%;" class="msg-content-common">
        <div class="msg-common-content">
          <div style="justify-content: flex-end;" class="common-content-header">
            <p>{{item.nickname}}</p>
            <p>{{item.time | dateFormat('hh:mm:ss')}}</p>
            <div :class="{
							'kefu-m': item.flag-0 === 2, 
							'diwang-m': item.grade-0 === 10,
							'chengxiang-m': item.grade-0 === 9,
							'xunfu-m': item.grade-0 === 8,
							'zongdu-m': item.grade-0 === 7,
							'zhifu-m': item.grade-0 === 6,
							'tongpan-m': item.grade-0 === 5,
							'zhixian-m': item.grade-0 === 4,
							'dizhu-m': item.grade-0 === 3,
							'nongmin-m': item.grade-0 === 2,
							'huiyuan-m': item.grade-0 === 1
							}"></div>
            <div class="common-content"></div>
          </div>
          <div class="common-content" >
            <div
              @click="GrabRedClick(item.context.redpacketid, item.context.remarks, item.avatar, item.nickname)"
              v-if="item.mtype === 'redpacket'" class="redbag-me">
              <img style="position: absolute; left: 12px; top: 8px"
                width="38" height="43" src="../assets/images/hongbao/leftred.png" alt="">
              <h1>{{item.context.remarks}}</h1>
              <p>查看红包</p>
              <span>红包</span>
            </div>
            <div v-if="item.mtype !== 'redpacket'" class="myself" @touchstart.prevent="showForwardButton(item, $event)" @touchend.prevent="cleartime">
              <p v-viewer="{navbar: false, rotatable: false, scalable: false}" v-html="item.context.msg" style="margin-bottom: 0"></p>
            </div>
          </div>
        </div>
        <div style="margin-right: -10px" class="msg-common-header" @touchstart.prevent="atPeople(item, $event)" @touchend.prevent="cleartime">
          <img :src="'../../static/images/avatars/' + item.avatar" alt="">
        </div>
      </div>
    </template>
    <template v-if="item.type === 'message' && (item.flag - 0 === 2)">
      <div v-if="item.userid -0 !== userinfo.userid - 0" :id="[item.isAiTeMeMsg ? ('anchor-' + item.time) : '']"
           class="msg-content-common">
        <div class="msg-common-header" @touchstart.prevent="atPeople(item, $event)" @touchend.prevent="cleartime">
          <img :src="'../../static/images/avatars/' + item.avatar" alt="">
        </div>
        <div class="msg-common-content">
          <div class="common-content-header">
            <div :class="{
							'kefu': item.flag-0 === 2, 
							'diwang': item.grade-0 === 10,
							'chengxiang': item.grade-0 === 9,
							'xunfu': item.grade-0 === 8,
							'zongdu': item.grade-0 === 7,
							'zhifu': item.grade-0 === 6,
							'tongpan': item.grade-0 === 5,
							'zhixian': item.grade-0 === 4,
							'dizhu': item.grade-0 === 3,
							'nongmin': item.grade-0 === 2,
							'huiyuan': item.grade-0 === 1
							}"></div>
            <p>{{item.nickname}}</p>
            <p>{{item.time | dateFormat('hh:mm:ss')}}</p>
          </div>
          <div class="common-content">
            <div
              @click="GrabRedClick(item.context.redpacketid, item.context.remarks, item.avatar, item.nickname)"
              v-if="item.mtype === 'redpacket'" class="redbag">
              <img
                style="position: absolute; left: 12px; top: 8px"
                width="38"
                height="43"
                src="../assets/images/hongbao/leftred.png" alt="">
              <h1>{{item.context.remarks}}</h1>
              <p>查看红包</p>
              <span>红包</span>
            </div>
            <div v-if="item.mtype !== 'redpacket'" class="normal-chat" @touchstart.prevent="showForwardButton(item, $event)" @touchend.prevent="cleartime">
              <p v-viewer="{navbar: false, rotatable: false, scalable: false}"
                 v-html="item.context.msg" style="margin-bottom: 0"></p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.userid -0 === userinfo.userid - 0" :id="[item.isAiTeMeMsg ? ('anchor-' + item.time) : '']"
           style="justify-content: flex-end; width: 97%;" class="msg-content-common">
        <div class="msg-common-content">
          <div style="justify-content: flex-end;" class="common-content-header">
            <p>{{item.nickname}}</p>
            <p>{{item.time | dateFormat('hh:mm:ss')}}</p>
            <div :class="{
							'kefu-m': item.flag-0 === 2, 
							'diwang-m': item.grade-0 === 10,
							'chengxiang-m': item.grade-0 === 9,
							'xunfu-m': item.grade-0 === 8,
							'zongdu-m': item.grade-0 === 7,
							'zhifu-m': item.grade-0 === 6,
							'tongpan-m': item.grade-0 === 5,
							'zhixian-m': item.grade-0 === 4,
							'dizhu-m': item.grade-0 === 3,
							'nongmin-m': item.grade-0 === 2,
							'huiyuan-m': item.grade-0 === 1
							}"></div>
            <div class="common-content"></div>
          </div>
          <div class="common-content">
            <div @click="GrabRedClick(item.context.redpacketid, item.context.remarks, item.avatar, item.nickname)"
                 v-if="item.mtype === 'redpacket'" class="redbag-me">
              <img
                style="position: absolute; left: 12px; top: 8px"
                width="38"
                height="43"
                src="../assets/images/hongbao/leftred.png" alt="">
              <h1>{{item.context.remarks}}</h1>
              <!-- Meiyoushuju -->
              <p>查看红包</p>
              <span>红包</span>
            </div>
            <div v-if="item.mtype !== 'redpacket'" class="myself"  @touchstart.prevent="showForwardButton(item, $event)" @touchend.prevent="cleartime">
              <p v-viewer="{navbar: false, rotatable: false, scalable: false}"
                 v-html="item.context.msg" style="margin-bottom: 0"></p>
            </div>
          </div>
        </div>
        <div style="margin-right: -10px" class="msg-common-header" @touchstart.prevent="atPeople(item, $event)" @touchend.prevent="cleartime">
          <img :src="'../../static/images/avatars/' + item.avatar" alt="">
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Viewer from 'v-viewer'
  import 'viewerjs/dist/viewer.css'
  import Constants from '@/utils/constants'
  import Red from '@/api/redbag'
  Vue.use(Viewer);
  import '@/assets/css/chatstyle.less'

  export default {
    props: ['item', 'index'],
    name: 'message-item',
    data() {
      return {
        userinfo: {},
        chatUrl: Constants.chatUrl,
        imgUrl: Constants.staticUrl,
        redItem: {
          remarks: '恭喜发财,大吉大利！'
        },
        timer: null,
        isShowForwardPop: false
      }
    },
    watch: {},
    computed: {
      manager() {
        return this.$store.state.isManager;
      }
    },
    mounted() {
      this.userinfo = this.$store.state.userInfo;
    },
    methods: {
      atPeople(item, e) {
        if(!item.userid || (item.userid - 0 === this.userinfo.userid - 0)){
          return;
        }
        let that = this;
        let atWord = '@' + item.nickname + ' ';
        clearInterval(this.timer);
        this.timer = setTimeout(function() {
          that.$store.commit('SET_ATWORD', atWord);
          that.$root.eventHub.$emit("atPeople", atWord);
        }.bind(this), 600);
      },
      showForwardButton(item, e) {
        if((this.userinfo.userflag - 0 === 1) || !item.msgid || (item.mtype === 'redpacket')){
          return;
        }
        let that = this;
        let offsetTop = e.currentTarget.offsetTop;
        clearInterval(this.timer);
        this.timer = setTimeout(function() {
          that.$store.commit('UPDATE_MSGID', item.msgid);
          that.$root.eventHub.$emit("forwardPop", offsetTop);
        }.bind(this), 600);
      },
      cleartime() {
        clearInterval(this.timer);
      },
      GrabRedClick(id, remarks, avatar, nickname) {
        this.redItem.redpacketid = id;
        this.redItem.remarks = remarks;
        Red.getStutas({redpacketId: id}).then(res => {
          let status = res.data.status;
          this.$store.commit('UPDATE_REDINFO', {
            redBagId: id,
            redBagAvatar: avatar,
            redBagRemarks: remarks,
            redBagNickname: nickname
          });
          if (status === 1) {
            this.$store.commit('UPDATE_STD', '1');
          } else if (status === 2) {
            this.$store.commit('UPDATE_STD', '2');
          } else if (status === 3) {
            this.$store.commit('UPDATE_STD', '3');
          }
        });
      },
    }
  }
</script>
