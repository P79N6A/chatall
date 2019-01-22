<template>
  <div class="plan-containers">
    <ul>
      <li v-for="(item, index) in lottreyData" :key="index" class="li-containers">
        <div class="li-top">
          <span class="name">{{item.lottName}}</span>
          <span>第{{item.dqqs}}期</span>
          <span class="kj">下期开奖 <span class="time">{{item.time}}</span></span>
        </div>
        <div class="li-blow">
          <div v-if="item.onKj" class="onKj">正在开奖中...</div>
          <div v-if="!item.onKj">
            <div v-if="item.showType === 'lottery_k3'" class="item-container">
              <div style="margin-right: 10px" v-for="(items, index) in item.dqhm" :key="index+200" :class="'icp-jsk3-'+items+'-sm'"></div>
            </div>
            <div v-if="item.showType === 'lottery_bjsc'" class="item-container">
              <div v-for="(items, index) in item.dqhm" :key="index" class="item-style" :class="'spe-'+items">
                <p>{{items}}</p>
              </div>
            </div>
            <ul v-if="item.showType === 'lottery_ssc'" style="margin-top: 4px;">
              <li style="background: #3999e3" v-for="(items, indexes) in item.dqhm">
                {{items}}
              </li>
            </ul>
          </div>

          <!--<div v-if="index === 3" class="item-container">-->
            <!--<div v-for="(items, index) in item.dqhm" :key="index" class="item-style" :class="'spe-'+items">-->
              <!--<p>{{items}}</p>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div v-if="index === 4" class="item-container">-->
            <!--<div style="margin-right: 5px" v-for="(item, index) in lottreyData[4].dqhm" :key="index+1001" :class="(item-0)<10?'icp-xync-'+('0'+item+'-md'):('icp-xync-'+item+'-md')">-->
              <!--&lt;!&ndash; <p>{{item}}</p> &ndash;&gt;-->
            <!--</div>-->
          <!--</div>-->
          <!--<ul style="margin-top: 4px;" v-if="index === 5">-->
            <!--<li style="background: #3999e3" v-for="(items, indexes) in item.dqhm">-->
              <!--<p>{{items}}</p>-->
            <!--</li>-->
          <!--</ul>-->

          <!--<ul style="margin-top: 4px;" v-if="index === 6">-->
            <!--<li style="background: #3999e3" v-for="(items, indexes) in item.dqhm">-->
              <!--<p>{{items}}</p>-->
            <!--</li>-->
          <!--</ul>-->

          <!--<ul style="margin-top: 4px;" v-if="index === 7">-->
            <!--<li style="background: #3999e3" v-for="(items, indexes) in item.dqhm">-->
              <!--<p>{{items}}</p>-->
            <!--</li>-->
          <!--</ul>-->
          <!--<ul style="margin-top: 4px;" v-if="index === 8">-->
            <!--<li style="background: #3999e3" v-for="(items, indexes) in item.dqhm">-->
              <!--<p>{{items}}</p>-->
            <!--</li>-->
          <!--</ul>-->
          <!--<ul style="margin-top: 4px;" v-if="index === 9">-->
            <!--<li style="background: #3999e3" v-for="(items, indexes) in item.dqhm">-->
              <!--<p>{{items}}</p>-->
            <!--</li>-->
          <!--</ul>-->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import '../assets/css/result.less'
  import '../assets/css/spe.less'

  import Lottery from '@/api/lottery'
  import All from '@/api/lishikaijiang'

  export default {
    data() {
      return {
        lottreyData: [],
      }
    },
    created() {
      this.initData(); // 初始化开奖数据
    },
    mounted(){
      let _that = this;
      this.$root.eventHub.$on('lotteryInfos', item => {
        let lotteryInfos = JSON.parse(item);
        for(let i = 0; i < _that.lottreyData.length; i++){
          if(_that.lottreyData[i].lottId === lotteryInfos.lottId){
            clearInterval(_that.lottreyData[i].clickName);
            this.$set(_that.lottreyData[i],'onKj',false);
            this.$set(_that.lottreyData[i],'dqhm',lotteryInfos.dqhm);
            this.$set(_that.lottreyData[i],'dqqs',lotteryInfos.dqqs);
            this.$set(_that.lottreyData[i],'xqkjsj',lotteryInfos.xqkjsj);
            this.countDown(_that.lottreyData[i], lotteryInfos.timestamp);
          }
        }
      });
    },
    methods: {
      initData() {
        Lottery.getkjArray().then(res => {
          if(res.code === 0){
            this.lottreyData = res.data;
            let timestamp = res.timestamp;
            for(let i = 0; i < this.lottreyData.length; i++){
              this.$set(this.lottreyData[i],'onKj',false);
              this.$set(this.lottreyData[i],'clickName','click'+ this.lottreyData[i].lottName);
              this.countDown(this.lottreyData[i],timestamp); // 倒计时
            }
          }
        });
      },

      countDown(lottreyData, timestamp) {
        let timer = Math.ceil((lottreyData.xqkjsj - timestamp) / 1000);
        if(timer === 0 || timer < 0) {
          // 重新去请求数据
          this.$set(lottreyData,'onKj',true);
          this.$set(lottreyData,'time','00:00');
        } else {
          let min = Math.floor(timer / 60 % 60) + (Math.floor(timer / 60 / 60 % 24) * 60);
          let scd = Math.ceil(timer % 60);
          lottreyData.clickName = setInterval(() => {
              -- scd;
              if(((min === 0 || min === '00') && scd === 0) || min < 0) {
                this.$set(lottreyData,'time','00:00');
                this.$set(lottreyData,'onKj',true);
                clearInterval(lottreyData.clickName);
              } else {
                if(scd < 0) {
                  min --;
                  scd = 59;
                }
                if((min + '').length === 1) {
                  min = '0' + min;
                }
                if((scd + '').length === 1) {
                  scd = '0' + scd;
                }
                this.$set(lottreyData,'time', min + ':' + scd);
              }
            },1000);
        }
      },

      goToDetail(items, names) {
        this.$router.push({
          path: '/lottreydetail',
          query: {item: items, name: names}
        })
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
        let popup = $popup.fromTemplate('<p style="margin-bottom: 0; text-align: center;">' + data + '</p>', options)

        popup.show().then((buttonIndex) => {
          console.log(buttonIndex)
        })
      },
      getAll(item) {
        All(item).then(
          res => {
            console.log(res.data)
          }
        )
      },
    },
    beforeDestroy() {
      for(let i = 0; i < this.lottreyData.length; i++){
        if(this.lottreyData[i].clickName){
          clearInterval(this.lottreyData[i].clickName);
        }
      }
    }
  }
</script>

