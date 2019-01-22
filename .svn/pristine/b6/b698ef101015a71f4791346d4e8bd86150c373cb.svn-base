<template>
  <div style=" height: 100%;">
    <div v-if="!joinLive" class="prettylive-can">
      <ul>
        <li v-for="(item, index) in douyuData" @click="liveContent(item.flv)" :key="index">
          <div class="img-can">
            <img :src="item.photo" alt="">
          </div>
          <p>{{item.nickname}}</p>
          <div class="tag"></div>
          <span>{{item.allnum}}</span>
        </li>
      </ul>
    </div>
    <!-- <div 
    v-if="joinLive"    
    class="live-bg">
        <div  
        @click="backToLive"
        class="little-img-can">
            <img src="../../static/images/xuanfu/float-btn.png" alt="">
        </div>
        <embed 
            style="margin-top: -82px"
            data-v-0bbb0d4a="" 
            width="100%" 
            height="100%" 
            allownetworking="all" 
            allowscriptaccess="always" 
            :src="'https://staticlive.douyucdn.cn/common/share/play.swf?room_id='+roomId" 
            quality="high" 
            bgcolor="#000" 
            wmode="transparent" 
            allowfullscreen="true" 
            allowfullscreeninteractive="true" 
            type="application/x-shockwave-flash">
    </div> -->
    <div v-show="joinLive" class="live-bg">
      <video style="width: calc(100vw)" ref="flvplayer" id="live" muted></video>
      <div class="btn-can">
        <!-- <img
        style="width: 30px; height: 30px"
        v-show="audio"
        src="../../static/images/live/audio-off.png" alt=""> -->
        <img @click="openVoice" src="../../static/images/live/audio-on.png" alt="">
        <img @click="backToLive" src="../../static/images/live/menu.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import flv from 'flv.js'
  import Live from '@/api/douyulive'
  import '../assets/css/prettylive.less'

  export default {
    data() {
      return {
        audio: true,
        player: {},
        isSupport: null,
        roomId: null,
        joinLive: false,
        douyuData: [],
        douyuApi_1: 'https://m.douyu.com/api/room/list?page=1&type=yz',
        douyuApi_2: 'https://m.douyu.com/api/room/list?page=2&type=yz'
      }
    },
    mounted() {},
    methods: {
      openVoice() {
        let ele = window.document.getElementById('live');
        ele.muted = false;
        this.audio = false;
      },
      changeLive() {
        let ele = window.document.getElementById('live');
        this.isSupport = flv.isSupported();
        this.player = flv.createPlayer({
          type: 'flv',
          url: this.roomId,
          isLive: true,
          cors: true,
        });
        this.$nextTick(() => {
            this.player.attachMediaElement(window.document.getElementById('live'));
            if (this.isSupport) {
              this.player.load();
              this.player.play();
            }
          }
        )
      },
      liveContent(id) {
        this.roomId = id;
        this.joinLive = true;
        this.changeLive();
      },
      backToLive() {
        let ele = window.document.getElementById('live');
        ele.muted = true;
        this.joinLive = false;
        this.player.destroy();
      },
      getLiveList() {
        Live().then(res => {
            this.douyuData = res.data.list;
        });
        // axios.get('http://live.9158.com/Room/GetNewRoomOnline?page=1').then(
        //     res => {

        //     }
        // )
      }
    },
    created() {
      this.getLiveList();
    }
  }
</script>

