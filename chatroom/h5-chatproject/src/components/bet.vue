<template>
  <!--<div id="ifm" style="-webkit-overflow-scrolling:touch;overflow-y: scroll;">-->
    <!--<iframe id="iframe" name="iframe" frameborder="0" marginwidth="0" marginheight="0" :width="wid" :height="hei" scrolling="yes"-->
            <!--:src="betSrc"></iframe>-->
    <!--<object class="object" name="object" :width="wid" :height="hei" :data="betSrc">-->
      <!--<embed :width="wid" :height="hei"  src="http://m.tctx2.com" id="embed"></embed>-->
    <!--</object>-->
  <!--</div>-->
  <div style="overflow: auto;-webkit-overflow-scrolling:touch;width:100%;height:100%;overflow-y: scroll;">
    <iframe id="iframe" frameborder="0" height="100%" scrolling="yes" style="width: 1px; min-width: 100%; *width: 100%;" :src="betSrc"></iframe>
  </div>
</template>
<script>
  import Constants from '@/utils/constants'
  // import '@/assets/css/redbag.less'
  import Bet from '@/api/bet'

  export default {
    name: 'Bet',
    data() {
      return {
        chatUrl: Constants.chatUrl,
        imgUrl: Constants.staticUrl,
        betSrc: '',
        loadingBg: true,
        hei: 0,
        wid: 0,
      }
    },
    watch: {},
    computed: {},
    created() {
      this.Loading();
      Bet.getBetSrc({token: this.$store.state.token}).then(res => {
        if (res.code === 0 && res.data) {
          if (res.data.isEffective === 1) {
            this.betSrc = res.data.betWeb;
          } else if (res.data.isEffective === 2) {
            this.showPopup('token已失效，请重新登录');
          }
        }
      });
    },
    mounted() {
      let ifm = document.getElementById('iframe');
      if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
        ifm.scrolling = 'no';
      }
      // if(/android/i.test(navigator.userAgent)){
      //   ifm.scrolling = 'yes';
      // }
      let hei = window.innerHeight;
      let wid = window.innerWidth;
      this.hei = hei - 90;
      this.wid = wid;
    },
    methods: {
      Loading() {
        $loading.show('拼命加载中..');
        setTimeout(() => {
          $loading.hide()
        }, 1000)
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
          this.$router.push({name: 'regist'});
        });
      },
    }
  }
</script>
<style>

</style>
