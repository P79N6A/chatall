<template>
  <div class="zhuanzhang">
    <von-header style="background: #fff">
      <p @click="backTo" style="margin: 8px 0 0 10px; position: relative; z-index: 100" slot="left">取消</p>
      <span style="color: #444; font-size: 18px" slot="title">转帐</span>
    </von-header>
    <div class="z-can">
      <div class="ava-title">
        <img src="../../static/images/index.png" alt="">
        <p>体彩天下</p>
      </div>
    </div>
    <div class="next-can">
      <div class="next-can-top">
        <p>转账金额</p>
        <p style="color: #888">(最低100元)</p>
      </div>
      <div class="next-can-body">
        <p>¥</p>
        <input v-model="count" type="text" placeholder="0.00">
      </div>
      <div class="next-can-blow">
        <p>{{'余额为:'+balance+','}}</p>
        <p @click="outAll" style="color: #0B66A3">全部提现</p>
      </div>
    </div>
    <div @click="tixian" class="regist-btn">提现</div>
  </div>
</template>

<script>
  import Util from '@/utils/util'
  import Red from '../api/redbag.js'
  import '../assets/css/zhuanzhang.less'

  export default {
    data() {
      return {
        count: '',
        balance: ''
      }
    },
    mounted() {
      this.getBalance();
    },
    methods: {
      tixian() {
        if (Util.isNull(this.count)) {
          this.showPopup('提现金额不能为空！');
          return false;
        }
        if (this.count - 0 < 100) {
          this.showPopup('提现金额不能小于100元！');
          return false;
        }
        Red.tixian({amount: this.count}).then(res => {
            this.showPopup('提现成功！');
        }).catch(err => {
            this.showPopup(err.msg);
         }
        )
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
        let popup = $popup.fromTemplate('<p style="margin-bottom: 0; text-align: center;">' + data + '</p>', options);
        popup.show().then((buttonIndex) => {
          console.log(buttonIndex);
        })
      },
      outAll() {
        this.count = this.balance;
      },
      getBalance() {
        Red.getBalance().then(res => {
            this.balance = res.data.money;
          }
        )
      },
      backTo() {
        window.history.go(-1);
      }
    }
  }
</script>

