<template>
  <Modal
    v-model="showInfoCard"
    class="showinfo"
    >
    <div slot="header">
      <img :src="'/static/images/avatar/' + item +'.gif'" alt=""/>
      <h1>
        <p style="font-size: 20px;">1122</p>
        <p>13132</p>
        <p>133</p>
      </h1>
    </div>
    <div>
      <Tabs>
        <TabPane label="用户资料" name="">
          <ul>
            <li>
              用户性别 ： 保密
            </li>
            <li>
              登录次数 ：
            </li>
            <li>
              注册时间 ：
            </li>
            <li>
              用户组 ：
            </li>
          </ul>
        </TabPane>
        <TabPane label="编辑资料" name="">
          <ul>
            <li>
              用户昵称 : <Input v-model="userName" ></Input>
            </li>
            <li>
              选择性别 :
              <Select v-model="model">
                <Option v-for="item in list" :value="value" :key="item">{{item}}</Option>
              </Select>
            </li>
            <li>
              平台账号 : <Input v-model="account" ></Input>
            </li>
            <li>
              自我介绍 : <Input v-model="self" ></Input>
            </li>
          </ul>
        </TabPane>
        <TabPane label="修改头像" name="">
          <ul style="width: 400px;">
            <li style="width: 411px;height: 331px;display: block;overflow-y: scroll;">
               <img :src="'/static/images/avatar/' + item +'.gif'" v-for="item of 30" @click="changeAvatar(item)" alt="">
            </li>
          </ul>

        </TabPane>
        <TabPane label="修改密码" name="">
          <ul>
            <li>
             <span>旧密码 : </span><Input v-model="userName" ></Input>
            </li>
            <li>
              <span>新密码 : </span><Input v-model="userName" ></Input>
            </li>
            <li>
              <span>重复新密码 : </span><Input v-model="userName" ></Input>
            </li>
          </ul>
        </TabPane>
      </Tabs>
    </div>

  </Modal>
</template>
<script>
export default {
    name: "showinfo",
    data () {
        return {
            item:1,
            showInfoCard: false,
            list: ["男","女","保密"
            ]
        }
    },
    mounted() {
        this.$root.eventHub.$on("showInfoCard",item => {
            this.showInfoCard = item;
        });
    },
    methods: {
      changeAvatar(index) {
        this.item=index;
      }
    }
}
</script>
