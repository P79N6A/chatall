<template>
  <div class="m-mutiplechat">
    <Tree :data="roomLists" :show-checkbox="true" @on-check-change="selectMutipleChat" class="m-mutiplechat-body"></Tree>
    <Button type="primary" @click="sendMutipleChat" v-show="showButton" class="m-mutiplechat-footer">确定</Button>
  </div>
</template>
<script>
export default {
  name: "mutiplechat",
  data() {
    return {
      roomLists: [{
        title: "转发",
        expand: true,
        children: []
      }],
      sendRoomList: [],
      showButton: false,
      roomIds: []
    }
  },
  computed: {
    roomList() {
      return this.$store.state.myRoomList.roomList;
    }
  },
  watch: {
    "roomList.roomName"() {
      this.getChildren();
    }
  },
  created() {

  },
  mounted() {
    this.getChildren();
  },
  methods: {
    getChildren() {
      var that = this;
      this.roomLists[0].children.splice(0);
      this.roomList.forEach(element => {
        let item = {
          title: element.roomName,
          roomId: element.roomId
        };
        that.roomLists[0].children.push(item);
      });
    },
    selectMutipleChat(value) {
      this.sendRoomList = value;
      if (this.sendRoomList == false) {
        this.showButton = false;
      } else {
        this.showButton = true;
      }
    },
    sendMutipleChat() {
      var that = this;
      var roomIds = '';
      this.sendRoomList.forEach(element => {
        if (element.title === "转发") {
          return
        }
        let roomId = /[0-9]+/.exec(element.roomId);
        roomIds+=(roomId[0] + ',');
      });
      let str = roomIds.slice(0,-1);
      that.roomIds.push(str);
      that.$parent.$parent.sendMutipleChat(that.roomIds);
    }
  }
}
</script>
<style lang="less">
  .m-mutiplechat {
    position: absolute;
    top: 100%;
    background: rgba(0, 0, 0, .8);
    .ivu-tree-title {
      color: white;
      width: 70px;
      padding: 0;
    }
    .ivu-tree li ul {
      padding: 0;
    }
    .ivu-tree-arrow {
      color: white;
    }
    .ivu-tree-title:hover {
      background-color: wheat;
    }
    .m-mutiplechat-footer {
      display: block;
      margin: 0 auto;
      background: rgba(0, 0, 0, .8);
    }
  }
</style>
