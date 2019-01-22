<template>
  <div class="regist-content">
        <p 
        @click="backLate"
        style="top: 10px; left: 20px; transform: scaleY(1.8)"
        class="top-font"
        v-text="'<'"></p>
        <p 
        style="left: 38%"
        class="top-font">收到的红包</p>
        <img 
        @click="showItem"
        width="22"
        height="4"
        style="position: absolute; top: 18px; right: 20px;z-index: 102"
        src="../../static/images/more.png" alt="">
    <div class="regist-bg">
        <img src="../../static/images/regist/ball.png" alt="">
    </div>
    <div class="regist-logo">
        <img :src="'../../static/images/avatars/' + userInfo.headimage" alt="">
    </div>
    <div class="recive-can">
        <div class="text-can">
            <p>{{userInfo.nickname}}</p>
            <h1>{{num}}</h1>
        </div>
        <div class="list-can">
            <ul style="height: calc(100vh - 251px); overflow-y: scroll">
                <li v-for="(item, index) in gotList" :key="index">
                    <!-- <img :src="'../../static/images/avatars/'+item.receiverHeadImage" alt=""> -->
                    <div class="list-right-can">
                        <div style="width: calc(100vw - 27px);" class="list-right-top">
                            <p>{{'红包'}}</p>
                            <p>{{item.amount}}</p>
                        </div>
                        <span style="margin-top: -12px">
                            {{item.time}}
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div 
        v-if="showBtn"
        class="list-menu">
        <ul>
            <li
                @click="toGetRed"
            >
                <p>收到的红包</p>
            </li>
            <li
                @click="toOutRed"
            >
                <p>发出的红包</p>
            </li>
            <li 
                @click="showItem"
                style="border-top: 4px solid #dbdbdb">
                <p>取消</p>
            </li>
        </ul>
    </div>
    <div 
        v-if="showBtn"
        class="mask">
    </div>
  </div>  
</template>

<script>
import Red from '@/api/redbag'

import '../assets/css/regist.less'
import '../assets/css/redrecond.less'
export default {
    data() {
        return {
            showBtn: false,
            redInfo: {},
            packList: [],
            recive: '',
            userInfo: {},
            gotList: [],
            num: 0,
        }
    },
    mounted() {
        this.redInfo = this.$store.state.redInfo;
        this.recive = this.$store.state.reciveMoney;
        this.packList = this.$store.state.redDetail;
        this.userInfo = this.$store.state.userInfo;
        this.getDetail();
    },
    methods: {
        getDetail() {
            Red.getMingxi().then(
                res => {
                    let data = res.data;
                    for(let i=0; i<data.length; i++) {
                        if(data[i].amount - 0 > 0) {
                            this.num = this.num + (data[i].amount - 0);
                            this.gotList.push(data[i])
                        }
                    }
                }
            )
        },
        toOutRed() {
            this.$router.push({name: 'outredbag'})
        },
        toGetRed() {
            this.$router.push({name: 'gotredbag'})
        },
        backLate() {
            window.history.go(-1);
        },
        showItem() {
            this.showBtn = !this.showBtn
        }
    }
}
</script>

