<template>
  <div>
    <von-header style="background: #fff">
      <button @click.prevent="backTo" class="button button-icon ion-ios-arrow-back" slot="left"></button>
      <span style="color: #444; font-size: 18px" slot="title">发红包</span>
      <p style="font-size: 15px; color: #444; line-height: 35px; margin-right: 10px;" slot="right">红包记录</p>
    </von-header>
    <div class="send-red">
      <ul>
        <li>
          <p class="font-left">总金额</p>
          <span>元</span>
          <input @change="varify" v-model="redForm.moneyMount" type="tel" placeholder="0.00">
          <p class="font-little">{{'余额：' + balance}}</p>
        </li>
        <li>
          <p class="font-left">红包个数</p>
          <span>个</span>
          <input @change="varify" v-model="redForm.num" type="tel" placeholder="填写个数">
        </li>
        <li>
          <p class="font-left">留言</p>
          <input readonly style="background-color: transparent" type="text" placeholder="大吉大利，恭喜发财">
        </li>
        <li>
          <div class="font-money">
            <p>¥</p>
            <p class="money-span">{{redForm.moneyMount ? redForm.moneyMount : '0.00'}}</p>
          </div>
        </li>
        <li @click.prevent="redBagSubmit">
          <div class="red-btn">发红包</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import '../assets/css/sendred.less'
  import Util from '@/utils/util'
  import Red from '../api/redbag.js'

  export default {
    data() {
      return {
        redForm: {
          moneyMount: '',
          num: '',
          remarks: ''
        },
        balance: 0,
      }
    },
    created() {
      this.getBalance();
    },
    methods: {
      toRed() {
        this.$router.push({name: 'gotredbag'});
      },
      backTo() {
        window.history.go(-1);
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
          console.log(buttonIndex)
        })
      },
      varify() {
        if (Number.isNaN(this.redForm.moneyMount - 0)) {
          this.redForm.moneyMount = '';
        } else if (Number.isNaN(this.redForm.num - 0)) {
          this.redForm.num = '';
        }
      },
      getBalance() {
        Red.getBalance().then(res => {
            this.balance = res.data.money;
          }
        )
      },
      redBagSubmit() {
        if (Util.isNull(this.redForm.moneyMount)) {
          this.showPopup('红包金额不能为空！');
          return false;
        }
        if (Util.isNull(this.redForm.num)) {
          this.showPopup('红包个数不能为空!');
          return false;
        }
        if (!Util.isNumber(Number(this.redForm.moneyMount))) {
          this.showPopup('请输入正确的红包金额!');
          return false;
        }
        if (!Util.isNumber(Number(this.redForm.num)) || Number(this.redForm.num <= 0)) {
          this.showPopup('请输入正确的红包个数!');
          return false;
        }
        if(Util.isNumber(Number(this.redForm.num)) && Number(this.redForm.num > 100)){
          this.showPopup('红包数量不能大于100!');
          return false;
        }
        if(this.$route.query.toWho && Util.isNumber(Number(this.redForm.num)) && Number(this.redForm.num > 1)){
          this.showPopup('红包数量不能大于1!');
          return false;
        }
        if (this.redForm.moneyMount < 5) {
          this.showPopup('金额必须大于5元!');
          return false;
        }
        if (this.redForm.moneyMount > this.balance) {
          this.showPopup('红包金额不能大于账户余额!');
        }
        var params = {
          num: this.redForm.num,
          amout: this.redForm.moneyMount,
          remarks: this.redForm.remarks ? this.redForm.remarks : '恭喜发财,大吉大利',
          receiveUserId: this.$route.query.toWho ? this.$route.query.toWho : ''
        };
        Red.send(params).then(response => {
          this.getBalance();
          if (!this.$route.query.toWho) {
            this.$router.push({name: 'Home'});
          } else {
            window.history.go(-1);
          }
          this.redBagFlag = false;
        }).catch(error => {
          // this.sendRedLoading = false;
        });
      },
    }
  }
</script>
