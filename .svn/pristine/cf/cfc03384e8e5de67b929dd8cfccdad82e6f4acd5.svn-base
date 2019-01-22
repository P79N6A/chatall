<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:list" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>客拉客-聊天室</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-if-ios="f7:person_fill" icon-if-md="material:account_circle" login-screen-open="#login-screen"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-messages>
      <f8message v-for="message in messageList" :item="message" :key="message.id"></f8message>
    </f7-messages>
    <f7-messagebar placeholder="请输入信息" @submit="onSubmit" :sheetVisible="sheetVisible">
        <f7-link slot="inner-start" icon-only @click="openSheet">
          <f7-icon f7="add_round_fill"></f7-icon>
        </f7-link>
        <f7-link slot="send-link" icon-only>
          <f7-icon f7="arrow_up_fill"></f7-icon>
        </f7-link>
        <div slot="after-inner" class="messagebar-sheet">s</div>
    </f7-messagebar>
  </f7-page>
</template>
<script>
import f8message from '@/components/f8-message.vue'
import Constants from '@/utils/constants'
import Util from '@/utils/util'
import md5 from '@/utils/md5Utils'
export default {
  components:{
    f8message
  },
  data() {
    return {
      sheetVisible:false,
      chatUrl:Constants.chatUrl,
      imgUrl:Constants.staticUrl,
      messageList:[
        {
          id:'1',
          nickname:'今晚打老虎',
          time:'2018-10-05 09:02:15',
          avatar:'1.gif',
          context:'我去你妈的',
          type:'message',
          mtype:'member',
          senttype:'received'
        },
        {
          id:'2',
          grabnickname:'今晚打老虎',
          nickname:'今晚打狮子',
          context:'1.89',
          type:'red'
        },
        {
          id:'3',
          nickname:'系统消息',
          time:'2018-10-05 09:02:15',
          avatar:'1.gif',
          context:'身边有玩的，可以介绍来幸运，送18-588不等的推荐彩金！详情联系客服咨询！',
          type:'message',
          mtype:'system',
          senttype:'received'
        },
        {
          id:'4',
          nickname:'客拉客客服➟小雪',
          time:'2018-10-05 09:02:15',
          avatar:'1.gif',
          context:'身边有玩的，可以介绍来幸运，送18-588不等的推荐彩金！详情联系客服咨询！',
          type:'message',
          mtype:'customer',
          senttype:'received'
        },
        {
          id:'5',
          nickname:'计划机器人',
          time:'2018-10-05 09:02:15',
          avatar:'1.gif',
          context:'653-654  冠军六码 【01 03 06 07 08 10】 开 10 中<br>655-656  冠军六码 【01 02 03 05 08 09】 开 05 中<br>657-658  冠军六码 【02 03 06 08 09 10】 开 08 中<br>658-659  冠军六码 【02 03 06 07 08 09】 开 02 中<br>659-660  冠军六码 【01 03 05 06 07 08】 进行中[1]<br>--------------------<br>649-651  冠亚和值大小 【小】 开 09,01 中<br>650-652  冠亚和值大小 【小】 开 03,05 中<br>653-655  冠亚和值大小 【小】 开 07,10 错<br>656-658  冠亚和值大小 【小】 开 02,01 中<br>659-661  冠亚和值大小 【小】 进行中[1]<br>-------------------------------------------<br>幸运彩票，值得信赖！<br>北京PK拾 第【707658】期 开奖号码【02,01,05,08,04,09,07,06,10,03】<br>',
          type:'message',
          mtype:'manage',
          senttype:'received'
        },
      ]
    }
  },
  created(){

  },
  mounted(){
    console.log('---------->'+this.imgUrl);
  },
  computed:{

  },
  methods:{
    onSubmit(text, clear){
        // console.log(text);
        let text1 = text.replace(/\n/g,'').trim();
        if (text1 == "") {
            this.$f7.dialog.alert('不能发送空白消息','提示');
            return false;
        }
        let result = "";
        let c;
        for ( let i = 0; i < text.length; i++) {
            c = text.substr(i, 1);
            if ( c == "\n")
                result = result + "</br>";
            else if (c != "\r")
                result = result + c;
        }
        text = result;

        var obj = {
        id:md5.getMd5NoCache(),
        nickname:'今晚打狮子',
        time:new Date(),
        avatar:'2.gif',
        context:text,
        type:'message',
        mtype:'member',
        senttype:'sent'
      }
      this.messageList.push(obj);
      clear();
    },
    openSheet(){
      this.sheetVisible = !this.sheetVisible;
    }
  }
}
</script>
