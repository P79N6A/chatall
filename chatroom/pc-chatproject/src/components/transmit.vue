<template>
  <div>
    <Modal
      v-model="showTransmitMessage"
      class="m-transmit"
      width="450px"
      >
      <div slot="header">
        <p class="title">转发信息</p>
      </div>
      <div class="body">
        <div class="transmitlist" v-for="(item,index) in roomList" :key="index">
          <img src="../assets/images/room.png" alt="" class="roomimg">
          <span class="roomname">{{item.roomName}}</span>
          <div class="select" @click="selectRoom(item.roomId)">
            <img src="../assets/images/select.png" alt="" v-show="select(item.roomId)" class="selected" @click.stop="cancelSelectRoom(item.roomId)">
          </div>
        </div>
      </div>
      <div slot="footer">
        <span class="selectall" @click="selectAll" v-show="!selectStatus">全选</span>
        <span class="cancelselectall" v-show="selectStatus" @click="cancelSelectAll">取消全选</span>
        <span class="send" @click="sendRoomList">发送</span>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "transmit",
  data() {
    return{
      selectRoomList: [],
      selectStatus: false,
      status: null
    }
  },
  created() {

  },
  mounted() {

  },
  computed: {
    showTransmitMessage: {
      get() {
        if (!this.$store.state.transmitMessage.showTransmitMessage) {
          this.selectStatus = false;
          this.selectRoomList.splice(0);
        }
        return this.$store.state.transmitMessage.showTransmitMessage;
      },
      set(val) {
        this.$store.commit("UPDATETRANSMITMESSAGE",val);
      }
    },
    roomList() {
      return this.$store.state.transmitMessage.roomList;
    }
  },
  watch: {

  },
  methods: {
    select(val) {
      let status = this.selectRoomList.indexOf(val);
      if (status !== -1 ) {
        return true
      } else {
        return false
      }
    },
    fiterSendRoomList() {
      var that = this;
      var str = "";
      this.selectRoomList.forEach(element => {
        str += /[0-9]+/.exec(element)[0] + ",";
      });
      return str.slice(0,-1);
    },
    selectRoom(roomId) {
      this.status = this.selectRoomList.indexOf(roomId);
      if (this.status !== -1 ) {
        return
      } else {
        this.selectRoomList.push(roomId);
        this.status = this.selectRoomList.indexOf(roomId);
      }
    },
    cancelSelectRoom(roomId) {
      this.status = this.selectRoomList.indexOf(roomId);
      this.selectRoomList.splice(this.status,1);
    },
    selectAll() {
      var that = this;
      this.selectRoomList.splice(0);
      this.roomList.forEach(element => {
        that.selectRoomList.push(element.roomId);
      });
      this.selectStatus = true;
    },
    cancelSelectAll() {
      this.selectRoomList.splice(0);
      this.selectStatus = false;
    },
    sendRoomList() {
      let item = this.fiterSendRoomList();
      this.$parent.sendMutipleChat(item);
    }
  },
}
</script>
<style lang="less">
  .m-transmit {
    .ivu-modal-close {
      top: 18px;
    }
    .ivu-modal-header {
      .title {
        text-align: center;
        line-height: 38px;
        height: 38px;
        font-size: 36px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(0,0,0,1);
      }
    }
    .body {
      position: relative;
      height: 600px;
      overflow: auto;
      .transmitlist {
        .roomimg {
          position: absolute;
          width: 60px;
          height: 60px;
          margin-top: 20px;
        }
        .roomname {
          margin-left: 70px;
          line-height: 100px;
          height: 29px;
          font-size: 30px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(68,68,68,1);
        }
        .select {
          display: inline-block;
          position: absolute;
          right: 45px;
          margin-top: 32px;
          width: 46px;
          height: 46px;
          cursor: pointer;
          border:2px solid rgba(171,171,171,1);
          border-radius:50%;
          .selected {
            position: absolute;
            top: -10px;
            left: -24px;
          }
        }
      }
    }
    .body::-webkit-scrollbar {/*滚动条整体样式*/
      width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
      }
    .body::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: #cfc3c3;
    }
    .body::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background: #EDEDED;
    }
    .ivu-modal-footer {
      width: 450px;
      height: 50px;
      background: rgba(245,245,245,1);
      padding: 0 10px;
      .selectall {
        float: left;
        width: 64px;
        height: 50px;
        line-height: 50px;
        font-size: 32px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(238,0,36,1);
        cursor: pointer;
      }
      .cancelselectall {
        float: left;
        line-height: 50px;
        width: 128px;
        height: 50px;
        font-size: 32px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(238,0,36,1);
        cursor: pointer;
      }
      .send {
        float: right;
        line-height: 50px;
        width: 64px;
        height: 50px;
        font-size: 32px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(238,0,36,1);
        cursor: pointer;
      }
    }
  }
</style>
