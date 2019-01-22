<template>
  <div class="regist-content">
    <p @click="backLate" style="top: 10px; left: 20px; transform: scaleY(1.8)" class="top-font" v-text="'<'"></p>
    <p style="left: 45%" class="top-font">红包</p>
    <img @click="showItem" width="22" height="4" style="position: absolute; top: 18px; right: 20px;z-index: 102" src="../../static/images/more.png" alt="">
    <div class="regist-bg">
      <img src="../../static/images/regist/ball.png" alt="">
    </div>
    <div class="regist-logo">
      <img :src="'../../static/images/avatars/' + redInfo.redBagAvatar" alt="">
    </div>
    <div class="recive-can">
      <div class="text-can">
        <p>{{redInfo.redBagNickname}}</p>
        <h1>{{recive}}</h1>
      </div>
      <div class="list-can">
        <ul>
          <li v-for="(item, index) in packList" :key="index">
            <img :src="'../../static/images/avatars/' + item.receiverHeadImage" alt="">
            <div class="list-right-can">
              <div class="list-right-top">
                <p>{{item.receiverName}}</p>
                <p>{{item.money}}</p>
              </div>
              <span style="margin-top: -12px">{{item.receiveTime}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="showBtn" class="list-menu">
      <ul>
        <li @click="toGetRed">
          <p>收到的红包</p>
        </li>
        <li @click="toOutRed">
          <p>发出的红包</p>
        </li>
        <li @click="showItem" style="border-top: 4px solid #dbdbdb">
          <p>取消</p>
        </li>
      </ul>
    </div>
    <div v-if="showBtn" class="mask"></div>
  </div>
</template>

<script>
  import '../assets/css/regist.less'
  import '../assets/css/redrecond.less'

  export default {
    data() {
      return {
        showBtn: false,
        redInfo: {},
        packList: [],
        recive: '',
      }
    },
    mounted() {
      this.redInfo = this.$store.state.redInfo;
      this.recive = this.$store.state.reciveMoney;
      this.packList = this.$store.state.redDetail;
    },
    methods: {
      toOutRed() {
        this.$router.push({name: 'outredbag'});
      },
      toGetRed() {
        this.$router.push({name: 'gotredbag'});
      },
      backLate() {
        window.history.go(-1);
      },
      showItem() {
        this.showBtn = !this.showBtn;
      }
    }
  }
</script>

