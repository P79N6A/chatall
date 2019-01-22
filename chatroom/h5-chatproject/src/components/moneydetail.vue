<template>
  <div class="privitelist">
    <von-header style="background: #fff;">
      <button @click="backLate" class="button button-icon ion-ios-arrow-back" slot="left"></button>
      <span style="color: #444" slot="title">零钱明细</span>
    </von-header>
    <div class="p-body">
      <ul>
        <li style="padding-top: 13px" v-for="(item, index) in moneyList" :key="index">
          <div style="padding-left: 10px" class="text-body">
            <div style="width: calc(100vw - 53px)" class="text-body-top">
              <h1 v-if="item.amount - 0 < 0">发出的红包</h1>
              <h1 v-if="item.amount - 0 > 0">收到的红包</h1>
              <p :style="{color: item.amount>0?'#EE0024':'#444', fontSize: '18px', lineHeight: '36px'}">{{item.amount}}</p>
            </div>
            <div class="text-body-blow">
              <p>{{item.time}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Red from '@/api/redbag'
  import '../assets/css/privitelist.less'

  export default {
    data() {
      return {
        moneyList: [],
        chatlist: [],
        lastavatar: [],
        lastnickname: [],
        lasttime: [],
        lastmsg: []
      }
    },
    mounted() {
      this.getAllMoney()
    },
    methods: {
      backLate() {
        window.history.go(-1);
      },
      getAllMoney() {
        Red.getMingxi().then(res => {
            this.moneyList = res.data;
            console.log(this.moneyList)
          }
        )
      }
    }
  }
</script>
