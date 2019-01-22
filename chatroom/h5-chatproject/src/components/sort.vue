<template>
  <div>
    <div class="sort-container">
      <von-header style="background: #fff;">
        <button style="color: #444;border: none;background: transparent;" slot="left" @click="backTolate">取消</button>
        <span style="color: #444" slot="title">选择提醒对象</span>
      </von-header>
      <div class="sort-container-top">
        <input v-model="searchData" placeholder="搜索" type="text">
      </div>
      <template v-if="!showBoard">
        <div class="sort-body-container">
          <ul>
            <li @click="at(item.nickname)" v-for="(item, index) in boardData">
              <img :src="'../../static/images/avatars/' + item.head_image" alt="">
              <p>{{item.nickname}}</p>
            </li>
          </ul>
        </div>
      </template>
      <template v-if="showBoard">
        <!--<div class="sort-body-container">-->
          <!--<div class="sort-grey">-->
            <!--<p>在线管理/客服</p>-->
          <!--</div>-->
          <!--<ul>-->
            <!--<li>-->
              <!--<img src="../../static/images/avatars/10.png" alt="">-->
              <!--<p>youre my sunshine</p>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
        <div v-for="(item, index) in allData" v-if="item.length !== 0" :key="index" class="sort-body-container">
          <div class="sort-grey">
            <p>{{index | toHighWord}}</p>
          </div>
          <ul>
            <li @click="at(items.nickname)" v-for="(items, indexes) in item">
              <img :src="'../../static/images/avatars/' + items.head_image" alt="">
              <p>{{items.nickname}}</p>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import '../assets/css/sort.less'
  import User from '../api/user.js'
  import {pySegSort} from '../utils/sort.js'

  export default {
    data() {
      return {
        boardData: [],
        showBoard: true,
        searchData: '',
        short: [],
        userName: [],
        allData: {
          a: [],
          b: [],
          c: [],
          d: [],
          e: [],
          f: [],
          g: [],
          h: [],
          i: [],
          j: [],
          k: [],
          l: [],
          m: [],
          n: [],
          o: [],
          p: [],
          q: [],
          r: [],
          s: [],
          t: [],
          u: [],
          v: [],
          w: [],
          x: [],
          y: [],
          z: [],
          '#': []
        },
        managersList: []
      }
    },
    watch: {
      searchData(data) {
        if (data) {
          this.showBoard = false;
          this.boardData.splice(0);
          for (let i in this.allData) {
            for (let j = 0; j < this.allData[i].length; j++) {
              if (this.allData[i][j].nickname.toLowerCase().includes(data.toLowerCase())) {
                this.boardData.push(this.allData[i][j]);
              }
            }
          }
        } else {
          this.showBoard = true;
        }
      }
    },
    created() {
      this.getUserList();
    },
    methods: {
      at(name) {
        this.$store.commit('SET_ATWORD', '@' + name + ' ');
        this.$router.push({name: 'Home'});
      },
      backTolate() {
        window.history.go(-1);
      },
      getUserList() {
        let patrn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
        let num = /^[0-9]*$/;
        let hanzi = /^[\u4E00-\u9FFF]+$/;
        User.getList().then(res => {
            $loading.show('加载用户列表中...');
            let data = res.data;
            let name = [];
            for (let i = 0; i < data.length; i++) {
              if (hanzi.test((data[i].nickname[0] + ''))) {
                if (!name.includes(data[i].nickname)) {
                  this.userName.push({
                    nickname: data[i].nickname,
                    head_image: data[i].head_image,
                    user_degree: data[i].user_degree
                  });
                }
                name.push(data[i].nickname);
              } else {
                for (let j in this.allData) {
                  if (((data[i].nickname[0] + '').toLowerCase()) === j) {
                    this.allData[j].push({
                      nickname: data[i].nickname,
                      head_image: data[i].head_image,
                      user_degree: data[i].user_degree
                    });
                  } else {
                    for (let k = 0; k < this.allData['#'].length; k++) {
                      if (this.allData['#'][k].nickname !== data[i].nickname) {
                        this.allData['#'].push({
                          nickname: data[i].nickname,
                          head_image: data[i].head_image,
                          user_degree: data[i].user_degree
                        });
                      }
                    }
                  }
                }
              }
            }
            this.short = pySegSort(this.userName);
            for (let i = 0; i < this.short.length; i++) {
              for (let j in this.allData) {
                if (this.short[i].group === j) {
                  for (let k = 0; k < this.short[i].data.length; k++) {
                    this.allData[j].push(this.short[i].data[k]);
                  }
                }
              }
            }
            $loading.hide();
          }
        )
      }
    },
    destroyed() {
      for (let i in this.allData) {
        for (let j = 0; j < this.allData[i].length; j++) {
          this.allData[i].splice(0);
        }
      }
    },
  }
</script>

<style scoped>

</style>
