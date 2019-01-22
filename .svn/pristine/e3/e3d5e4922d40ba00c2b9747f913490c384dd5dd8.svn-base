<template>
  <div style="width: calc(100vw)" class="regist-content">
    <p @click="backLate" style="top: 10px; left: 20px; transform: scaleY(1.8)" class="top-font" v-text="'<'"></p>
    <p style="left: 46%" class="top-font">红包</p>
    <div class="regist-bg">
      <img src="../../static/images/regist/ball.png" alt="">
    </div>
    <div class="regist-logo">
      <img :src="'../../static/images/avatars/' +realRedinfo.sendeHeadImage" alt="">
    </div>
    <div class="recive-can">
      <div class="text-can">
        <p>{{redInfo.redBagNickname}}</p>
        <p>{{redInfo.remarks}}</p>
        <h1>{{recive}}</h1>
        <p @click="toMoneyRecond" style="font-size: 14px; color: #0B66A3; line-height: 30px">已存入零钱</p>
      </div>
      <div class="list-can">
        <div style="border-top: 1px solid #dbdbdb;
                border-bottom: 1px solid #dbdbdb;
                padding-left: 20px;
                padding-top: 4px;
                height: 30px;
            ">
          <p style="color: #444;">共{{realRedinfo.num}}个红包</p>
        </div>
        <ul>
          <li v-for="(item, index) in packList" :key="index">
            <img :src="'../../static/images/avatars/'+item.receiverHeadImage" alt="">
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
    <!-- <div 
        v-if="showBtn"
        class="list-menu">
        <ul>
            <li
                @click="toGetRed"
            >
                <p>收到的红包</p>
            </li>
            <li
                @click="toOutRed"
            >
                <p>发出的红包</p>
            </li>
            <li 
                @click="showItem"
                style="border-top: 4px solid #dbdbdb">
                <p>取消</p>
            </li>
        </ul>
    </div> -->
    <div v-if="showBtn" class="mask"></div>
  </div>
</template>

<script>
  import '../assets/css/regist.less'
  import '../assets/css/redrecond.less'

  export default {
    data() {
      return {
        realRedinfo: {},
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
      this.realRedinfo = this.$store.state.redBag;
    },
    methods: {
      toMoneyRecond() {
        this.$router.push({name: 'moneydetail'});
      },
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

