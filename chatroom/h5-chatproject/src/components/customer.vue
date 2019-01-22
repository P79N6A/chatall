<template>
  <div style="text-align: center" class="customer">
    <div class="kefu">
      <ul>
        <li v-for="(item, index) in agentQQ" :key="index">
          <div class="li-left">
            <img :src="imgUrl+'images/avatar/default.gif'" alt="">
            <p>{{agentName[index]}}</p>
          </div>
          <div class="call-btn">
            <a :href="'http://wpa.qq.com/msgrd?v=3&uin='+item">联系客服</a>
          </div>
        </li>
        <li v-for="(item, index) in customerQQ" :key="index">
          <div class="li-left">
            <img :src="imgUrl+'images/avatar/default.gif'" alt="">
            <p>{{customerName[index]}}</p>
          </div>
          <div class="call-btn">
            <a :href="'mqqwpa://im/chat?chat_type=wpa&uin='+item+'&version=1&src_type=web&web_src=oicqzone.com'">联系客服</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Constants from '@/utils/constants'
  import Util from '@/utils/util'
  import kefu from '@/api/kefu'
  import '@/assets/css/kefu.less'

  export default {
    name: 'Customer',
    data() {
      return {
        chatUrl: Constants.chatUrl,
        imgUrl: Constants.staticUrl,
        agentName: [],
        agentQQ: [],
        customerName: [],
        customerQQ: []
      }
    },
    watch: {},
    created() {
      kefu.getQQ().then(res => {
          let short1 = res.data.agentqq;
          let short2 = res.data.customerqq;
          for (let i = 0; i < short1.length; i++) {
            let at = short1[i].indexOf('@');
            this.agentQQ.push(short1[i].slice(0, at));
            this.agentName.push(short1[i].slice(at + 1, short1[i].length));
          }
          for (let i = 0; i < short2.length; i++) {
            let at = short2[i].indexOf('@');
            this.customerQQ.push(short2[i].slice(0, at));
            this.customerName.push(short2[i].slice(at + 1, short2[i].length));
          }
        }
      )
    },
    mounted() {},
    computed: {},
    methods: {}
  }
</script>
