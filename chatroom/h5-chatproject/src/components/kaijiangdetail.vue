<template>
  <div>
    <von-header theme="lights" :fixed="true" class="lottorey">
      <button style="color: #fff; margin-top: -4.5px;" @click="back" class="button button-icon ion-ios-arrow-back" slot="left"></button>
      <span slot="title">开奖历史</span>
    </von-header>
    <div class="scroll-content has-header">
      <div class="row play-container">
        <div class="play-image">
          <img :src="'../../static/images/kaijianglogo/' + this.$route.query.item + '.png'" alt="">
        </div>
        <div class="row">
          <div class="col play-left-item">
            <p>{{this.$route.query.name}}</p>
            <span>{{historyList[0].periods}}</span>
          </div>
          <div class="col play-left">
            <div>官方开奖</div>
          </div>
          <div class="col play-right">
            <p>开奖倒计时</p>
            <span>{{historyList[0].starttime | dateFormat('mm:ss')}}</span>
          </div>
        </div>
      </div>
      <ul style="height: 100%;overflow-y: scroll;padding-bottom: 45px;" class="list lottorey-lists">
        <li v-for="(item, index) in historyList" :key="index" style="width: calc(100vw - 20px) !important;
        margin: 0 auto; 
        border: none; 
        border-bottom: 1px solid #dbdbdb;
        height: 72px;
        padding-top: 4px;
        " class="item row lottorey-list">
          <div class="col lottorey-container-left">
            <span style="line-height: 23px" class="lottorey-top-left">{{item.periods}}</span>
            <div class=" lottorey-blow-right">
              <span v-for="items in item.rank" class="blow">{{items}}</span>
            </div>
          </div>
          <div style="margin-left: 9px; margin-top: 3px;" class="col lottorey-container-right">{{item.starttime | dateFormat('yyyy-MM-dd hh:mm')}}</div>
        </li>
      </ul>
    </div>
    <div class="tabbar moveBottom visible fixed">
      <a class="link" @click="gohistory()">
        <div slot="title">去购彩</div>
      </a>
    </div>
  </div>
</template>

<script>
  import '../assets/css/kaijiang.less'
  import Constants from '@/utils/constants'
  import Lottery from '@/api/lottery'
  import Kjlist from '@/api/kaijiang'

  export default {
    name: 'LotteryHistory',
    props: {
      title: String,
      theme: String,
      destroyOnHide: Boolean,
      onHide: Function,
    },

    data() {
      return {
        historyList: [],
        chatUrl: Constants.chatUrl,
        imgUrl: Constants.staticUrl,
        sign: 0,
        dqhm: [],
        dqqs: [],
        times: [],
        isP: [],
      }
    },
    watch: {},
    created() {
      // this.initData();
      this.initData();
    },
    mounted() {
      this.getLottreyList()
    },
    methods: {
      timeShort() {},
      getLottreyList() {
        Kjlist.getList(this.$route.query.item).then(res => {
            this.historyList = res.data;
            console.log(res.data);
        });
      },
      back() {
        window.history.go(-1);
      },
      gohistory() {
        window.open('http://m.tctx1.com');
      },
      initData() {
        if (this.sign === 12) {
          return false;
        } else {
          Lottery.getTimer(this.sign).then(res => {
              console.log(res.data.xqkjsj);
          });
        }
      },
    }
  }
</script>


