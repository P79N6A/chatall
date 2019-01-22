<template>
  <Modal
    v-model="userChatList"
    draggable
    footer-hide
    class-name='online'
    width='260px'
    >
    <div slot= 'header'>
      <div>
        <span> {{userName}}</span>
        <i><Icon type="md-checkmark-circle" /></i>
      </div>
      <div>
        <input type="text" v-model="userSign">
      </div>
      <div>
        <ul>
          <li>
            <span><Icon type="md-person" /></span>
          </li>
          <li>
            <span><Icon type="md-people" /></span>
          </li>
          <li>
            <span><Icon type="md-chatboxes" /></span>
          </li>
        </ul>
      </div>
    </div>
    <div class= 'contentbox'>
      <ul class= 'contactpeople'>
        <li class='usergrouping' @click='showguanliyuan'>
          <!-- <Icon type="ios-arrow-down" /> -->
          <Icon type="ios-arrow-forward" />
          <span>管理员</span>
          <em>{{guan}}</em>
        </li>
        <li v-show='guanliyuan' >
          <ul class= 'informationdegree' v-for="(item, index) in userList" :key='index' @click="privateChat(index)">
            <li class= 'contactlist'  v-if ='item.flag == 1' >
              <img :src="imgUrl+'images/avatar/'+item.avatar" alt="">
              <span>{{item.nickname}}</span>
            </li>
            <!-- <template>
              <contenttext v-show = 'visible'></contenttext>
            </template> -->
          </ul>
        </li>
        <li class='usergrouping' @click='showzhixingren'>
          <!-- <Icon type="ios-arrow-down" /> -->
          <Icon type="ios-arrow-forward" />
          <span>知心人</span>
          <em>{{zhi}}</em>
        </li>
        <li v-show='zhixingren'>
          <ul class= 'informationdegree' v-for="(item, index) in userList" :key='index' @click="privateChat(index)">
            <li class= 'contactlist' v-if ='item.flag == 2' >
              <img :src="imgUrl+'images/avatar/'+item.avatar" alt="">
              <span>{{item.nickname}}</span>
            </li>
          </ul>
        </li>
        <li class='usergrouping' @click='showhuiyuan'>
          <!-- <Icon type="ios-arrow-down" /> -->
          <Icon type="ios-arrow-forward" />
          <span>会员</span>
          <em>{{hui}}</em>
        </li>
        <li v-show='huiyuan'>
          <ul class= 'informationdegree'  v-for="(item, index) in userList" :key='index' @click="privateChat(index)">
            <li class= 'contactlist' v-if ='item.flag == 0' >
              <img :src="imgUrl+'images/avatar/'+item.avatar" alt="">
              <span>{{item.nickname}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </Modal>
</template>
<script>
import Constants from '@/utils/constants'
import User from '@/api/user'
import Constant from '@/utils/constants'
import Util from '@/utils/util'
export default {
  name:'userchatlist',
  data(){
    return {
      visible: false,
      imgUrl:Constant.staticUrl,
      userList:[],
      userChatList:false,
      userName:'',
      userSign:'往事随风飘',
      guanliyuan:false,
      zhixingren:false,
      huiyuan:false,
      guan:0,
      zhi:0,
      hui:0
    }
  },
  methods:{
    openTab() {
      this.visible = true;
    },
    showguanliyuan() {
      this.guanliyuan=this.guanliyuan?false:true;
    },
    showzhixingren() {
      this.zhixingren=this.zhixingren?false:true;
    },
    showhuiyuan() {
      this.huiyuan=this.huiyuan?false:true;
    },
    checkrepeat(msg) {
      for (let i=0 ; i < this.userList.length; i++) {
        if (this.userList[i].userid === msg.userid) {return true}
      }
      return false;
    },
    checkrepeatnum(msg) {
      for (let i=0 ; i < this.userList.length; i++) {
        if (this.userList[i].userid === msg.userid) {return i}
      }
      return -1;
    },
    getUserList() {
      var that=this;
      User.getList().then( res => {
        let temp=res.data;
        if (temp.length >=1) {
          for (let i = 0 ; i < temp.length-1;i++) {
            for (let j = i+1 ; j< temp.length ;j++) {
              if(temp[i].user_id === res.data[j].user_id) {
                temp.splice(j,1);
              }
            }
          }
        }
        res.data.forEach(item => {
          const obj = {
                  userid: item.user_id,
                  flag: item.user_flag,
                  user_degree: item.user_degree,
                  nickname: item.nickname,
                  grade: Util.isNull(item.user_degree) ? 0 : item.user_degree,
                  avatar: (item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.png' :item.head_image,
                  sessionid: item.sessionid,
                  degree:(item.user_flag=='2'?'customer':item.user_degree),
                };
          that.userList.push(obj);
        });
        for ( let k = 0 ; k < res.data.length; k++) {
          if (res.data[k].user_flag === '1') {
            that.guan++;
          } else if (res.data[k].user_flag ==='2' ) {
            that.zhi++;
          } else if (res.data[k].user_flag === '0') {
            that.hui++;
          }
        }
      }).catch(function (error) {//加上catch
          console.log(error);
        })
      },
    privateChat(index){
				if(!Constants.isLogin){
					this.$toast.center('没有发言权限！','center');
					return;
				}
				if(this.$store.state.userInfo.userflag == 1){
					if(this.$store.state.userInfo.userdegree < 3){
						this.$toast.center('没有私聊权限！','center');
						return;
					}
				}
				var selectData = {
					privateUser:this.userList[index],
					currentUser:this.$store.state.userInfo,
        }
        let id=selectData.privateUser.userid;
        this.$root.eventHub.$emit("PrivateChatEvent",selectData,id);
      },
  },
  created(){
    this.userName=this.$store.state.userInfo.nickname;
    this.getUserList();
  },
  mounted(){
    this.$root.eventHub.$on('openchatlist',() =>{
      this.userChatList=true;
    })
    this.$root.eventHub.$on("onlineEvent", (item) =>{
      let obj = {
                  userid: item.user_id,
                  nickname: item.nickname,
                  flag: item.user_flag,
                  grade:Util.isNull(item.user_degree) ? 0 : item.user_degree,
                  avatar: (item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.png' :item.head_image,
                  sessionid: item.sessionid,};
      if (! this.checkrepeat(obj)){
        this.userList.push(obj);
        if(obj.flag==='1') {
          this.guan++;
        } else if (obj.flag ==='2') {
          this.zhi++;
        } else if (obj.flag ==='0') {
          this.hui++;
        }
      }
    });
    this.$root.eventHub.$on("disconnectEvent",(item) =>{
      let obj = {
                  userid: item.user_id,
                  nickname: item.nickname,
                  flag: item.user_flag,
                  grade:Util.isNull(item.user_degree) ? 0 : item.user_degree,
                  avatar: (item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.png' :item.head_image,
                  sessionid: item.sessionid,};
      if (this.checkrepeatnum(obj)!== -1) {
        this.userList.splice(this.checkrepeatnum(obj),1);
         if(obj.flag==='1') {
          this.guan--;
        } else if (obj.flag ==='2') {
          this.zhi--;
        } else if (obj.flag ==='0') {
          this.hui--;
        }
      }
    })

  }
}
</script>
