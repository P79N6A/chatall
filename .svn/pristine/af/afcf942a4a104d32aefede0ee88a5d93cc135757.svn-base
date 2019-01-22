<template>
  <div class="privitelist">
    <von-header style="background: #fff;">
      <button @click="backLate" class="button button-icon ion-ios-arrow-back" slot="left"></button>
      <span style="color: #444" slot="title">消息列表</span>
    </von-header>
    <div class="p-body">
      <ul>
        <li v-for="(item, index) in chatlist" @click.prevent="readyToPrivateChat(item)" :key="index">
          <div class="avatar">
            <div v-if="tipsNum[index]" class="news-tip">
              <p>{{tipsNum[index]}}</p>
            </div>
            <img :src="'../../static/images/avatars/' + lastavatar[index]" alt="">
          </div>
          <div class="text-body">
            <div class="text-body-top">
              <h1>{{lastnickname[index]}}</h1>
              <p>{{lasttime[index] | dateFormat('hh:MM')}}</p>
            </div>
            <div class="text-body-blow">
              <p>{{lastmsg[index]}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {domain, PriviteCacheGet, PriviteLocalCache} from '../utils/privitelocalstorge.js'
  import emojidata from '@/assets/js/emojidata'
  import beardata from '@/assets/js/beardata'
  import '../assets/css/privitelist.less'

  export default {
    data() {
      return {
        tipsNum: [],
        chatlist: [],
        lastavatar: [],
        lastnickname: [],
        lasttime: [],
        lastmsg: [],
        userInfo: {},
        userId: '',
        realList: {
          first: [],
          nameList: [],
        },
        secondRealList: {
          first: [],
          nameList: [],
        },
      }
    },
    created() {
      for (let i in emojidata.firstEmoji) {
        this.realList.nameList.push(i);
        this.realList.first.push(emojidata.firstEmoji[i]);
      }
      for (let i in beardata.allEmoji) {
        this.secondRealList.nameList.push(i);
        this.secondRealList.first.push(beardata.allEmoji[i]);
      }
    },
    mounted() {
      let cargo = PriviteCacheGet(domain);
      this.userId = PriviteCacheGet(domain + 'userid');
      this.userInfo = this.$store.state.userInfo;
      if (cargo) {
        this.chatlist = cargo;
        for (let i = 0; i < cargo.length; i++) {
          let tmplNum = 0;
          if (cargo[i].neverseen === true) {
            tmplNum += 1;
          }
          if ((cargo[i].fromid - 0) === (this.userId - 0)) {
            this.lastavatar.push(cargo[i].toavatar);
            this.lastnickname.push(cargo[i].tonickname);
          } else {
            this.lastavatar.push(cargo[i].fromavatar);
            this.lastnickname.push(cargo[i].fromnickname);
          }
          if (cargo[i].data.length === 0) {
            this.getMsgName(cargo[i]);
          } else {
            for (let j = 0; j < cargo[i].data.length; j++) {
              if (cargo[i].data[j].neverseen === true) {
                tmplNum += 1;
              }
            }
            this.getMsgName(cargo[i].data[cargo[i].data.length - 1]);
          }
          this.tipsNum.push(tmplNum);
        }
      }
    },
    methods: {
      backLate() {
        window.history.go(-1);
      },
      getMsgName(item) {
        if (item.content.msg) {
          if (item.content.msg.indexOf('emoji') !== -1) {
            let src = item.content.msg.split('src=')[1].split('"')[1];
            for (let i = 0; i < this.realList.first.length; i++) {
              if (this.realList.first[i] === src) {
                this.$set(item.content, 'msg', this.realList.nameList[i]);
              }
            }
          } else if (item.content.msg.indexOf('lottery') !== -1) {
            let src = item.content.msg.split('src=')[1].split('"')[1];
            for (let i = 0; i < this.secondRealList.first.length; i++) {
              if (this.secondRealList.first[i] === src) {
                this.$set(item.content, 'msg', this.secondRealList.nameList[i]);
              }
            }
          } else if (item.content.msg.indexOf('imageView') !== -1) {
            this.$set(item.content, 'msg', '[图片]');
          }
        } else {
          this.$set(item.content, 'msg', '[红包]');
        }
        this.lastmsg.push(item.content.msg);
        this.lasttime.push(item.time);
      },
      readyToPrivateChat(data) {
        let toid;
        let toname;
        if (data.toid - 0 === this.userId - 0) {
          toid = data.fromid;
          toname = data.fromnickname;
        } else {
          toid = data.toid;
          toname = data.tonickname;
        }
        let tmpl = {
          avatar: data.toavatar,
          flag: data.flag,
          grade: data.grade,
          nickname: toname,
          userid: toid
        };
        let info = {
          privateUser: tmpl,
          currentUser: this.userInfo
        };
        this.$root.eventHub.$emit('StartPrivate', info);
        this.$store.commit('SET_PINFO', info);
        this.$router.push({
          path: '/private',
          query: {id: toid, nickname: toname}
        })
      },
    }
  }
</script>
