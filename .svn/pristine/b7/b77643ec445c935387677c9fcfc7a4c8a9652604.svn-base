<template>
  <div class="central">
    <template>
      <div class="openred" v-show="showRedpack">
        <i @click="closeRedpack">x</i>
        <div class="redinfo">
          <span @click="toMyRedpack">我的红包</span>
          <span @click="toSendRedpack">发红包</span>
        </div>
      </div>
    </template>
    <template>
      <div class="grabred" v-show="showGrabRedpack">
        <i @click="closeToGrabRedpack">x</i>
        <div class="redinfo">
          <p>恭喜发财 大吉大利</p>
          <p @click="grabRedpack">抢红包</p>
        </div>
      </div>
    </template>
    <template>
      <div class="grabred" v-show="showOverGrabRedpack">
        <i @click="closeToOverGrabRedpack">x</i>
        <div class="redinfo">
          <p>{{statusname}}</p>
        </div>
      </div>
    </template>

    <Modal
      v-model="showMySendRedpack"
      title=""
      class="showmysendredpack"
      footer-hide
      >
      <div>
        <span>金额</span><Input-number :max="redpackBalanceAmount" :min="1" v-model="redpackAmount"></Input-number>
        <span>个数</span><Input-number :max="10" :min="1" v-model="redpackCount"></Input-number>
        <span>备注</span><Input v-model="redpackRemark" type="text"></Input>
        <p>{{redpackBalanceAmount}}</p>
        <p><i>余额{{redpackBalanceAmount}}</i></p>
        <p><span @click="sendRedpack">发红包</span></p>
      </div>
    </Modal>
    <Modal
      v-model="showMyRedpack"
      title=""
      class="showmyredpack"
      footer-hide
      >
      <div>
        <div class="myredpackhead">
          <div v-if="record">
            <div><img :src="imgUrl + 'images/avatar/' +headimage" alt=""></div>
            <p>{{nickname}}</p>
            <p><i>余额{{redpackBalanceAmount}}</i></p>
            <p><span>共收到{{redpackNum}}个红包，最新记录20条</span></p>
          </div>
          <div v-if="!record">
            <div><img :src="imgUrl + 'images/avatar/' +redpackInfo.sendeHeadImage" alt=""></div>
            <p>{{redpackInfo.name}}</p>
            <p><i>{{redpackInfo.remarks}}</i></p>
            <p><span>{{redpackInfo.amount}}元</span></p>
          </div>
        </div>
        <hr/>
        <div class="getredinfobox">
          <div v-if="record">
            <div class="getredinfo" v-for="(item,index) in redpackList" :key="index">
              <div class="getredinfoleft"><img :src="imgUrl+'images/avatar/'+item.senderHeadImage" alt=""></div>
              <div class="getredinfomiddle"><p>{{item.senderName}}</p><p>{{item.receiveTime | dateFormat('yyyy-MM-dd hh:mm:ss')}}</p></div>
              <div class="getredinforight">{{item.money}}元</div>
            </div>
          </div>
          <div v-if="!record">
            <div class="getredinfo" v-for="(item,index) in packList" :key="index">
              <div class="getredinfoleft"><img :src="imgUrl+'images/avatar/'+item.receiverHeadImage" alt=""></div>
              <div class="getredinfomiddle"><p>{{item.receiverName}}</p><p>{{item.receiveTime | dateFormat('yyyy-MM-dd hh:mm:ss')}}</p></div>
              <div class="getredinforight">{{item.money}}元</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <div class="centralheader">
      <p class="gonggao"><span>公告</span></p>
      <div class="guntiao">
        <marquee behavior="scroll" direction="left" onmouseover="this.stop()"
        onmouseout="this.start()" v-for="(item,index) in topNoticeList" :key="index">{{item}}</marquee>
      </div>
      <div>
        <span class="gundong">滚动</span>
        <span class="qingping" @click="clearMessage">清屏</span>
      </div>
      <div class="redpack" @click="openRedpack">
        <img :src="imgUrl+'images/hongbao.png'" title="红包">
        <p>红包</p>
      </div>
    </div>
    <div class="centralmiddle" ref="s">
      <div class="centralmiddleheader">
        <p @click="getHistoryMessage">查看更多消息</p>
        <p>以上是历史消息</p>
      </div>
      <template>
        <div class="centralmiddlemiddle">
          <div class="chatmessage" v-for="(items,index) in messageList"  :key="index" >
            <div v-if="items.type === 'red'" class="rednotice">
              <div class="rednoticeimg">
                <p class="rednoticeimg1"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{{items.grabnickname}} 领取了 <span>{{items.nickname}} </span> 的红包获得
                <span> {{items.context.amount || items.context}}元 </span></p>
              </div>
            </div>
            <div v-if="items.type === 'message'">
              <div class="chatmessage1">
                <img :src="imgUrl+'images/avatar/'+items.avatar" >
                <img :src="imgUrl+'images/grade/'+items.grade+'.png'" alt="" v-if="items.flag == 1">
                <img v-if=" items.flag == 2" :src="imgUrl+'images/grade/kefu_logo.png'">
                <span>{{items.nickname}}</span>
                <span>{{items.time | dateFormat('hh:mm:ss')}}</span>
              </div>
              <div class="chatmessage2"  v-html="items.context.msg" v-if="items.mtype !== 'redpacket'"></div>
              <div class="redpacket"   v-if="items.mtype === 'redpacket'" >
                <div class="redpacket1" @click="toGrabRedpack(items.context.redpacketid)">
                  <img :src="imgUrl+'images/hongbao.png'" alt="">
                  <p>{{items.context.remarks}}</p><p>领取红包</p>
                </div>
                <div class="redpacket2">直播室红包</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="centralfooder">
      <div><i><font-awesome-icon icon="volume-up"/></i>
        <marquee behavior="scroll" direction="left" onmouseover="this.stop()" onmouseout="this.start()">
        <span  v-for="(item,index) in buttomNoticeList" :key="index">{{item}}</span></marquee></div>
      <div>
        <a :href="'http://wpa.qq.com/msgrd?v=3&uin='+item.customerQq+'&site=qq&menu=yes'" target="_blank"
        v-for="(item,index) in customerInfo" :key="index" :class="item.customerName ==='加盟代理'?'daili':''"
        ><i v-if="item.customerName !=='加盟代理'"><font-awesome-icon icon="coffee"/></i>
        <i v-else><font-awesome-icon icon="dollar-sign"/></i>
        <p>{{item.customerName}}</p></a>
      </div>
      <div class="messagebotton">
        <Dropdown trigger="click" placement="top" class="emojidatasName" >
          <span class="xiaobiaoqing">&nbsp;</span>
          <DropdownMenu slot="list">
            <DropdownItem v-for="(item,key,index) in emojidataName.allEmoji" :key="index">
              <img :src="item" alt="" @click="sendEmoji(key)">
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown trigger="click" placement="top" class="emojidatasName" >
          <span class="dabiaoqing">&nbsp;</span>
          <DropdownMenu slot="list">
            <DropdownItem v-for="(item,key,index) in emojidatasName.allEmoji" :key="index">
              <img :src="item" alt="" @click="sendEmoji(key)">
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Upload
        multiple
        action="http://api.8582333.com/api/upload"
        :show-upload-list="false"
        :on-success="uploadImg"
        :headers="{'token':token}"
        :format="['jpg','jpeg','png']"
        :max-size="1024"
        name="image"
        >
        <span class="tupian" >&nbsp;</span>
        </Upload>
      </div>
      <div class="sendbox">
        <div class="sendmessage" id="sendmessage" contenteditable="true" ref="send"></div>
        <div class="sendmessagebtn" @click="sendMessage">发送</div>
      </div>

    </div>
  </div>
</template>
<script>
import '@/assets/css/publicchat.less'
import Common from '@/api/common'
import Constants from "@/utils/constants"
import RedEnvelope from '@/api/redenvelope'
import emojidatas from '@/assets/js/emojisdata.js'
import emojidata from '@/assets/js/emojidata.js'
import Cookie from '@/utils/auth'
export default {
    name: "publicchat",
    data() {
      return {
          imgUrl: Constants.staticUrl,
          topNoticeList: [],
          buttomNoticeList: [],
          messageList: [],
          showRedpack: false,
          showMyRedpack: false,
          showMySendRedpack: false,
          redpackAmount: 0,
          redpackCount: 1,
          redpackRemark: "恭喜发财，大吉大利",
          redpackBalanceAmount: 0,
          redpackList: [],
          nickname: this.$store.state.userInfo.nickname,
          headimage: this.$store.state.userInfo.headimage,
          redpackNum: 0,
          showGrabRedpack: false,
          redid: null,
          redpackInfo: {},
          record: true,
          packList: [],
          showOverGrabRedpack: false,
          statusname: null,
          customerInfo: [],
          emojidatasName: emojidatas,
          emojidataName: emojidata,
          sendValue: null,
          editValue: null,
          token:this.$store.state.token
      }
    },
    created() {
        var that = this;
        this.$root.eventHub.$on("ReceiveMessageEvent",(msgObj) => {
            that.messageList.push(msgObj);
            this.$refs.s.scrollTop = 2124;
        });
    },
    mounted() {
        var that = this;
        this.getHistoryMessage();
        this.getNotice();
        this.getCustomerInfo();
		},
    methods: {
        getNotice() {
            Common.getNotice().then(response => {
					      let data = response.data;
					      this.topNoticeList = data.top;
					      this.buttomNoticeList = data.bottom;
				    }).catch(error => {

				    });
        },
        getCustomerInfo() {
            Common.getCustomerInfo().then(res => {
                let data,start;
                data = {};
                res.data.customerqq.forEach(element => {
                    var start,data;
                    data = {};
                    start = element.indexOf("@");
                    data.customerQq = element.slice(0,start);
                    data.customerName = element.slice(start+1);
                    this.customerInfo.push(data);
                });
                start = res.data.agentqq[0].indexOf("@");
                data.customerQq = res.data.agentqq[0].slice(0,start);
                data.customerName = res.data.agentqq[0].slice(start+1);
                this.customerInfo.push(data);
            }).catch(error => {

            });
        },
        getHistoryMessage() {
            let time = new Date().getTime();
            let data,that = this;
            if (that.messageList.length !== 0) {
                time = that.messageList[0].time;
            }
            RedEnvelope.getHistory(time).then(res => {
                for (let i = res.data.length-1; i >= 0; i--) {
                    let data = {
                        touserid: res.data[i].touserid,
                        tousernickname: res.data[i].tousernickname,
                        touserheadimage: res.data[i].touserheadimage,
                        msgid: res.data[i].msgid,
                        grabnickname: res.data[i].grabnickname,
                        avatar: res.data[i].fromuserheadimage,
                        context: res.data[i].content,
                        flag: res.data[i].fromuseruserflag,
                        type: res.data[i].type,
                        mtype: res.data[i].mtype,
                        nickname: res.data[i].fromnickname,
                        time: res.data[i].msgtime,
                        userid: res.data[i].fromuserid,
                        user_degree: res.data[i].fromuseruserdegree
                        };
                    if (data.context.id - 0  === 1) {
                        data.context.msg = '<img src=http://' + data.context.msg + '>';
                    } else if (data.context.id - 0 === 0) {
                        let fisrtDeal,regExp;
                        regExp = /\[[\u4E00-\u9FA5]+\]/g;
                        while (fisrtDeal = regExp.exec(data.context.msg)) {
                            let sencondDeal,str;
                            sencondDeal = emojidatas.allEmoji[fisrtDeal[0]]?'<img src="' + emojidatas.allEmoji[fisrtDeal[0]] + '">':fisrtDeal[0]
                            sencondDeal = emojidata.allEmoji[sencondDeal]?'<img src="' + emojidata.allEmoji[sencondDeal] + '">':sencondDeal
                            str = data.context.msg.replace(fisrtDeal[0],sencondDeal)
                            data.context.msg = str;
                        }
                    }
                    that.messageList.splice(0,0,data);
                }
            }).catch( error => {
          });
        },
        clearMessage() {
            this.messageList = [];
        },
        openRedpack() {
            this.showRedpack = true;
        },
        closeRedpack() {
            this.showRedpack = false;
        },
        closeToOverGrabRedpack() {
            this.showOverGrabRedpack = false;
        },
        toMyRedpack() {
            this.showRedpack =false;
            this.showMyRedpack = true;
            this.record = true;
            RedEnvelope.getMyRed().then(res => {
                this.redpackBalanceAmount = res.data.accountBalance;
                this.nickname = res.data.nickname;
                this.redpackNum = res.data.redpackNum;
                this.redpackList = res.data.redpackList;
            }).catch(error =>{

            })
        },
        toSendRedpack () {
            this.showRedpack = false;
            this.showMySendRedpack = true;
            RedEnvelope.getBalance().then(res => {
                this.redpackBalanceAmount = res.data.money;
            }).catch(error => {

            })
        },
        sendRedpack() {
            let data;
            data = {
		            num:this.redpackCount,
				      	amout:this.redpackAmount,
					      remarks:this.redpackRemark
            };
            if (data.amout < 5) {
                this.$toast.center("红包金额需大于5元","center");
                return
            }
            RedEnvelope.send(data).then( res => {
                this.showMySendRedpack = false;
                this.redpackAmount = 0;
                this.redpackCount = 1;
            }).catch (error => {

            })
        },
        toGrabRedpack(id) {
            this.redid = id;
            let data;
            data = {
              redpacketId: id
            };
            RedEnvelope.getStutas(data).then(res => {
                if (res.data.status === 1 ) {
                    this.showGrabRedpack = true;
                } else if (res.data.status === 2) {
                    this.grabRedpack();
                } else if (res.data.status === 3) {
                    this.showOverGrabRedpack = true;
                    this.statusname = res.data.statusName;
                }
            }).catch(error => {

            });
        },
        closeToGrabRedpack() {
            this.showGrabRedpack = false;
        },
        grabRedpack() {
            let id;
            var that = this;
            id = this.redid;
            RedEnvelope.grab(id).then(res => {
                this.showGrabRedpack = false;
                this.redpackInfo = res.data.redpackInfo;
                this.packList = res.data.packList;
                this.showMyRedpack = true;
                this.record = false;
            }).catch(error => {

            });
        },
        sendEmoji(value) {
            this.$refs.send.innerHTML += value;
        },
        uploadImg(response, file, fileList) {
            let imgUrl = response.url;
            let jsonMsg = {
                type: 'message',
                mtype: 'user',
                fromuserid: this.$store.state.userInfo.userid,
                fromnickname: this.$store.state.userInfo.nickname,
                fromuserheadimage: this.$store.state.userInfo.headimage,
                fromuseruserdegree: this.$store.state.userInfo.userdegree,
                fromuseruserflag: this.$store.state.userInfo.userflag,
                touserid: '',
                tousernickname: '',
                content: {
                  id: 1,
                  msg: imgUrl
                }
            };
            if (jsonMsg.fromuseruserflag === 2) {
                jsonMsg.mtype = "customer"
            }
            this.$root.sendToAll(jsonMsg);
        },
        sendMessage() {
            var that = this;
            this.editValue = this.$refs.send.innerHTML;
            let jsonMsg = {
                type: 'message',
                mtype: 'user',
                fromuserid: this.$store.state.userInfo.userid,
                fromnickname: this.$store.state.userInfo.nickname,
                fromuserheadimage: this.$store.state.userInfo.headimage,
                fromuseruserdegree: this.$store.state.userInfo.userdegree,
                fromuseruserflag: this.$store.state.userInfo.userflag,
                touserid: '',
                tousernickname: '',
                content: {
                  id: 0,
                  msg: this.editValue
                }
            };
            if (jsonMsg.fromuseruserflag === 2) {
                jsonMsg.mtype = "customer"
            }
            this.$root.sendToAll(jsonMsg);
            this.$refs.send.innerHTML = '';
        }

    }
}
</script>
