<template>
<div>
    <div 
    class="swiper-container show-swiper swiper-container-horizontal swiper-container-ios">
    <div 
    class="swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(-1199px, 0px, 0px);">

    <div 
          class="swiper-slide">
          <div 
          class="goods" style="transform: scale3d(1, 0.9, 1); transition-duration: 0ms;">
              <img :src="'../../static/images/kaijianglogo/jsk3.png'">
              <div class="right-can">
                  <div class="right-can-top">
                      <h1>江苏快三</h1>
                      <p>{{lottreyData[0]['dqqs']}}</p>
                  </div>
                  <div class="right-can-blow">

                      <div class="item-container">
                          <div
                            style="margin-right: 10px"
                            v-for="(item, index) in lottreyData[0].dqhm"
                            :key="index+200"
                            :class="'icp-jsk3-'+item+'-sm'"
                          >
                              <!-- <p>{{item}}</p> -->
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div 
      class="swiper-slide">
          <div 
          class="goods" style="transform: scale3d(1, 0.9, 1); transition-duration: 0ms;">
              <img :src="'../../static/images/kaijianglogo/bjsc.png'">
              <div class="right-can">
                  <div class="right-can-top">
                      <h1>北京赛车</h1>
                      <p>{{lottreyData[1]['dqqs']}}</p>
                  </div>
                  <div class="right-can-blow">
                      <!-- <ul>
                          <p>如长时间未加载数据请滑动该栏</p>
                          <li 
                          v-if="!Number.isNaN(items - 0)"
                          v-for="(items, indexes) in lottreyData[0]">
                              <p>{{items}}</p>
                          </li>
                      </ul> -->
                      <div class="item-container">
                          <div
                            v-for="(item, index) in lottreyData[1].dqhm"
                            :key="index"
                            class="item-style"
                            :class="'spe-'+item"
                          >
                              <p>{{item}}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

          <div 
          class="swiper-slide">
          <div 
          class="goods" style="transform: scale3d(1, 0.9, 1); transition-duration: 0ms;">
              <img :src="'../../static/images/kaijianglogo/gdklsf.png'">
              <div class="right-can">
                  <div class="right-can-top">
                      <h1>广东快乐十分</h1>
                      <p>{{lottreyData[2]['dqqs']}}</p>
                  </div>
                  <div class="right-can-blow">
                      <ul>
                          <li 
                          style="background: #3999e3"
                          v-if="!Number.isNaN(items - 0)"
                          v-for="(items, indexes) in lottreyData[2].dqhm">
                              <p>{{items}}</p>
                          </li>
                      </ul>
                      <!-- <div class="item-container">
                          <div
                            v-for="(item, index) in lottreyData[0].dqhm"
                            :key="index"
                            class="item-style"
                            :class="'spe-'+item"
                          >
                              <p>{{item}}</p>
                          </div>
                      </div> -->
                  </div>
              </div>
          </div>
      </div>

      <div 
          class="swiper-slide">
          <div 
          class="goods" style="transform: scale3d(1, 0.9, 1); transition-duration: 0ms;">
              <img :src="'../../static/images/kaijianglogo/xyft.png'">
              <div class="right-can">
                  <div class="right-can-top">
                      <h1>幸运飞艇</h1>
                      <p>{{lottreyData[3]['dqqs']}}</p>
                  </div>
                  <div class="right-can-blow">
                      <!-- <ul>
                          <li 
                          style="background: #3999e3"
                          v-if="!Number.isNaN(items - 0)"
                          v-for="(items, indexes) in lottreyData[2].dqhm">
                              <p>{{items}}</p>
                          </li>
                      </ul> -->
                      <div class="item-container">
                          <div
                            v-for="(item, index) in lottreyData[3].dqhm"
                            :key="index+100"
                            class="item-style"
                            :class="'spe-'+item"
                          >
                              <p>{{item}}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>


      <div 
          class="swiper-slide">
          <div 
          class="goods" style="transform: scale3d(1, 0.9, 1); transition-duration: 0ms;">
              <img :src="'../../static/images/kaijianglogo/xync.png'">
              <div class="right-can">
                  <div class="right-can-top">
                      <h1>幸运农场</h1>
                      <p>{{lottreyData[4]['dqqs']}}</p>
                  </div>
                  <div class="right-can-blow">

                      <div class="item-container">
                          <div
                            style="margin-right: 5px"
                            v-for="(item, index) in lottreyData[4].dqhm"
                            :key="index+1001"
                            :class="(item-0)<10?'icp-xync-'+('0'+item+'-md'):('icp-xync-'+item+'-md')"
                          >
                              <!-- <p>{{item}}</p> -->
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      

      <div 
          class="swiper-slide">
          <div 
          class="goods" style="transform: scale3d(1, 0.9, 1); transition-duration: 0ms;">
              <img :src="'../../static/images/kaijianglogo/cqssc.png'">
              <div class="right-can">
                  <div class="right-can-top">
                      <h1>重庆时时彩</h1>
                      <p>{{lottreyData[5]['dqqs']}}</p>
                  </div>
                  <div class="right-can-blow">
                      <ul>
                          <li 
                          style="background: #3999e3"
                          v-if="!Number.isNaN(items - 0)"
                          v-for="(items, indexes) in lottreyData[5].dqhm">
                              <p>{{items}}</p>
                          </li>
                      </ul>
                      <!-- <div class="item-container">
                          <div
                            v-for="(item, index) in lottreyData[0].dqhm"
                            :key="index"
                            class="item-style"
                            :class="'spe-'+item"
                          >
                              <p>{{item}}</p>
                          </div>
                      </div> -->
                  </div>
              </div>
          </div>
      </div>

      <div 
          class="swiper-slide">
          <div 
          class="goods" style="transform: scale3d(1, 0.9, 1); transition-duration: 0ms;">
              <img :src="'../../static/images/kaijianglogo/gd11x5.png'">
              <div class="right-can">
                  <div class="right-can-top">
                      <h1>广东十一选五</h1>
                      <p>{{lottreyData[6]['dqqs']}}</p>
                  </div>
                  <div class="right-can-blow">
                      <ul>
                          <li 
                          style="background: #3999e3"
                          v-if="!Number.isNaN(items - 0)"
                          v-for="(items, indexes) in lottreyData[6].dqhm">
                              <p>{{items}}</p>
                          </li>
                      </ul>
                      <!-- <div class="item-container">
                          <div
                            v-for="(item, index) in lottreyData[0].dqhm"
                            :key="index"
                            class="item-style"
                            :class="'spe-'+item"
                          >
                              <p>{{item}}</p>
                          </div>
                      </div> -->
                  </div>
              </div>
          </div>
      </div>

      <div 
          class="swiper-slide">
          <div 
          class="goods" style="transform: scale3d(1, 0.9, 1); transition-duration: 0ms;">
              <img :src="'../../static/images/kaijianglogo/jx11x5.png'">
              <div class="right-can">
                  <div class="right-can-top">
                      <h1>江西十一选五</h1>
                      <p>{{lottreyData[7]['dqqs']}}</p>
                  </div>
                  <div class="right-can-blow">
                      <ul>
                          <li 
                          style="background: #3999e3"
                          v-if="!Number.isNaN(items - 0)"
                          v-for="(items, indexes) in lottreyData[7].dqhm">
                              <p>{{items}}</p>
                          </li>
                      </ul>
                      <!-- <div class="item-container">
                          <div
                            v-for="(item, index) in lottreyData[0].dqhm"
                            :key="index"
                            class="item-style"
                            :class="'spe-'+item"
                          >
                              <p>{{item}}</p>
                          </div>
                      </div> -->
                  </div>
              </div>
          </div>
      </div>

      <div 
          class="swiper-slide">
          <div 
          class="goods" style="transform: scale3d(1, 0.9, 1); transition-duration: 0ms;">
              <img :src="'../../static/images/kaijianglogo/xjssc.png'">
              <div class="right-can">
                  <div class="right-can-top">
                      <h1>新疆时时彩</h1>
                      <p>{{lottreyData[8]['dqqs']}}</p>
                  </div>
                  <div class="right-can-blow">
                      <ul>
                          <li 
                          style="background: #3999e3"
                          v-if="!Number.isNaN(items - 0)"
                          v-for="(items, indexes) in lottreyData[8].dqhm">
                              <p>{{items}}</p>
                          </li>
                      </ul>
                      <!-- <div class="item-container">
                          <div
                            v-for="(item, index) in lottreyData[0].dqhm"
                            :key="index"
                            class="item-style"
                            :class="'spe-'+item"
                          >
                              <p>{{item}}</p>
                          </div>
                      </div> -->
                  </div>
              </div>
          </div>
      </div>

      <div 
          class="swiper-slide">
          <div 
          class="goods" style="transform: scale3d(1, 0.9, 1); transition-duration: 0ms;">
              <img :src="'../../static/images/kaijianglogo/tjssc.png'">
              <div class="right-can">
                  <div class="right-can-top">
                      <h1>天津时时彩</h1>
                      <p>{{lottreyData[9]['dqqs']}}</p>
                  </div>
                  <div class="right-can-blow">
                      <ul>
                          <li 
                          style="background: #3999e3"
                          v-if="!Number.isNaN(items - 0)"
                          v-for="(items, indexes) in lottreyData[9].dqhm">
                              <p>{{items}}</p>
                          </li>
                      </ul>
                      <!-- <div class="item-container">
                          <div
                            v-for="(item, index) in lottreyData[0].dqhm"
                            :key="index"
                            class="item-style"
                            :class="'spe-'+item"
                          >
                              <p>{{item}}</p>
                          </div>
                      </div> -->
                  </div>
              </div>
          </div>
      </div>
      
    </div>
  </div>
</div>
</template>

<script>
import Swiper from 'swiper'
import Lottery from '@/api/lottery'
import 'swiper/dist/css/swiper.min.css'
import '../assets/css/swiper.less'
import '../assets/css/spe.less'


export default {
    props: {
        resultData: null
    },
    data() {
        return {
            isReal: false,
            sign: 0,
            left: 0,
            point: 0,
            lottreyData: [
                {   dqqs: '获取数据中...',
                    dqhm: ['获取数据中...']
                },
                {
                    dqqs: '获取数据中...',
                    dqhm: ['获取数据中...']
                },
                {
                    dqqs: '获取数据中...',
                    dqhm: ['获取数据中...']
                },
                {
                    dqqs: '获取数据中...',
                    dqhm: ['获取数据中...']
                },
                {
                    dqqs: '获取数据中...',
                    dqhm: ['获取数据中...']
                },
                {
                    dqqs: '获取数据中...',
                    dqhm: ['获取数据中...']
                },
                {
                    dqqs: '获取数据中...',
                    dqhm: ['获取数据中...']
                },
                {
                    dqqs: '获取数据中...',
                    dqhm: ['获取数据中...']
                },
                {
                    dqqs: '获取数据中...',
                    dqhm: ['获取数据中...']
                },
                {
                    dqqs: '获取数据中...',
                    dqhm: ['获取数据中...']
                },
            ],
            lottreyName: [
                '江苏快三',

                '北京赛车',
                '广东快乐十分',
                '幸运飞艇',
                '幸运农场',
                '重庆时时彩',
                '广东十一选五',
                '江西十一选五',
                '新疆时时彩',
                '天津时时彩',
            ],
            lottreyLogo: [
                'jsk3.png',

                'bjsc.png',
                'gdklsf.png',
                'xyft.png',
                'xync.png',
                'cqssc.png',
                'gd11x5.png',
                'jx11x5.png',
                'xjssc.png',
                'tjssc.png',
            ]
        }
    },
    methods: {
        initData() {
            const that = this;
            $loading.show('数据加载中...');
            if(this.sign === 11) {
                this.sign = 0;
                var swiperShow=new Swiper(
                    ".show-swiper",
                    {   
                        loop: true,
                        slidesPerView:"auto",
                        watchSlidesProgress:!0,
                        resistanceRatio:1,
                        on: {
                            slideChangeTransitionEnd: function() {
                                that.left = this.realIndex * 5
                            },
                            progress: function(b) {
                                for(let i=0;i<this.slides.length;i++) {
                                    let slide=this.slides.eq(i);
                                    let slideProgress=this.slides[i].progress;
                                    let prevIndent=1==i?.3228:.0898;
                                    let scale=1>Math.abs(slideProgress+prevIndent)?
                                    0.1*(1-Math.abs(slideProgress+prevIndent))+1:1;
                                    slide.find(".goods").transform("scale3d("+scale+","+(scale+0.1)+",1)")}},

                            setTransition: function(b) {
                                for(var a=0;a<this.slides.length;a++) {
                                    this.slides.eq(a).find(".goods").transition(b)}
                                },
                            slideChangeTransitionEnd: function() {
                            }
                        }
                    });
                    $loading.hide();
                return false
            } else {
              Lottery.getTimer(this.sign).then(
                    res => {
                        this.lottreyData.splice(this.sign, 1, res.data);
                        this.sign++;
                        this.initData()
                    }
                )
            }
        },
        reGetData() {
            if(this.sign === 11) {
                this.sign = 0;
                return false
            } else {
              Lottery.getTimer(this.sign).then(
                    res => {
                        this.lottreyData.splice(this.sign, 1, res.data);
                        // this.lottreyData.push(res.data);
                        this.sign++;
                        this.reGetData()
                        }
                    )
                }
            }
    },
    created() {
    },
    mounted() {
        const that = this;
        this.initData();     
        let daojishi = setInterval(() => {
            this.reGetData();
        }, 10000)       
    },
}
</script>

