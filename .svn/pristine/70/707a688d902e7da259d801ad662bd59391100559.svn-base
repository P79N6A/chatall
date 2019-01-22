<template>
  <div>
    <div v-if="item.type === 'red'" class="message-wrap">
      <div class="redbag-info1">
        <p style="color:#444;">{{item.fromnickname}} <span style="color: #999">领取了</span> <span style="color:#EE0024;">{{item.fromnickname}}</span>
          <span style="color: #999">的红包 </span></p>
      </div>
    </div>
    <template>
      <div v-if="item.fromid - 0 !== myid - 0" class="msg-content-common">
        <div class="msg-common-header">
          <img :src="'../../static/images/avatars/' + item.fromavatar" alt="">
        </div>
        <div class="msg-common-content">
          <div class="common-content-header">
            <div :class="{
							'kefu': item.flag - 0 === 2,
							'diwang': item.grade - 0 === 10,
							'chengxiang': item.grade - 0 === 9,
							'xunfu': item.grade - 0 === 8,
							'zongdu': item.grade - 0 === 7,
							'zhifu': item.grade - 0 === 6,
							'tongpan': item.grade - 0 === 5,
							'zhixian': item.grade - 0 === 4,
							'dizhu': item.grade - 0 === 3,
							'nongmin': item.grade - 0 === 2,
							'huiyuan': item.grade - 0 === 1
							}"></div>
            <p>{{item.fromnickname}}</p>
            <p>{{item.time | dateFormat('hh:mm:ss')}}</p>
          </div>
          <div class="common-content">
            <div v-if="item.mtype === 'redpacket'" class="redbag"
              @click="GrabRedClick(item.content.redpacketid, item.content.remarks, item.fromavatar, item.fromnickname)">
              <img
                style="position: absolute; left: 12px; top: 8px"
                width="38"
                height="43"
                src="../assets/images/hongbao/leftred.png" alt="">
              <h1>恭喜发财，大吉大利</h1>
              <p>查看红包</p>
              <span>红包</span>
            </div>
            <div v-if="item.mtype !== 'redpacket'" class="normal-chat">
              <p v-html="item.content.msg" style="margin-bottom: 0"></p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="(item.fromuserid - 0 === myid) || (item.fromid - 0 === myid - 0)"
           style="justify-content: flex-end; width: 97%;" class="msg-content-common">
        <div class="msg-common-content">
          <div style="justify-content: flex-end;" class="common-content-header">
            <p>{{item.fromnickname}}</p>
            <p>{{item.time | dateFormat('hh:mm:ss')}}</p>
            <div :class="{
							'kefu-m': item.flag - 0 === 2,
							'diwang-m': item.grade - 0 === 10,
							'chengxiang-m': item.grade - 0 === 9,
							'xunfu-m': item.grade - 0 === 8,
							'zongdu-m': item.grade - 0 === 7,
							'zhifu-m': item.grade - 0 === 6,
							'tongpan-m': item.grade - 0 === 5,
							'zhixian-m': item.grade - 0 === 4,
							'dizhu-m': item.grade - 0 === 3,
							'nongmin-m': item.grade - 0 === 2,
							'huiyuan-m': item.grade - 0 === 1
							}"></div>
          </div>
          <div class="common-content">
            <div v-if="item.mtype === 'redpacket'" class="redbag-me"
              @click="GrabRedClick(item.content.redpacketid, item.content.remarks, item.fromavatar, item.fromnickname)">
              <img
                style="position: absolute; left: 12px; top: 8px"
                width="38"
                height="43"
                src="../assets/images/hongbao/leftred.png" alt="">
              <h1>{{item.content.remarks}}</h1>
              <p>查看红包</p>
              <span>红包</span>
            </div>
            <div v-if="item.mtype !== 'redpacket'" class="myself">
              <p v-html="item.content.msg" style="margin-bottom: 0"></p>
            </div>
          </div>
        </div>
        <div style="margin-right: -10px" class="msg-common-header">
          <img :src="'../../static/images/avatars/' + item.fromavatar" alt="">
        </div>
      </div>
      <!--红包-->
      <div v-if="redStd" class="red-bag-can" style="background:rgba(0, 0, 0, 0.2)!important;">
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
    </template>
  </div>

</template>
<script>
  import {domain, PriviteCacheGet, PriviteLocalCache} from '../utils/privitelocalstorge.js'

  import Constants from '@/utils/constants'
  import Red from '@/api/redbag'

  import '@/assets/css/chatstyle.less'

  export default {
    props: ['item'],
    name: 'message-item',
    data() {
      return {
        chatUrl: Constants.chatUrl,
        imgUrl: Constants.staticUrl,
        myid: '',
        redItem: {
          remarks: '恭喜发财,大吉大利！'
        },
      }
    },
    watch: {},
    mounted() {
      this.myid = PriviteCacheGet(domain + 'userid');
    },
    computed: {
      redStd() {
        return this.$store.state.redBagStutas;
      },
      redInfo() {
        return this.$store.state.redInfo;
      },
    },
    methods: {
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
        })
      },
      closeBag() {
        this.$store.commit('UPDATE_STD', '');
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
    },
    destroyed() {
      this.closeBag();
    },
  }
</script>
