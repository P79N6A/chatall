<template>
	<div class="contxt-right">
		<div class="LivePanel">
			<div class="title">
				<span class="btn" :class="[active=='bet'?'active':'']" @click="liveClick('bet')"><i><font-awesome-icon icon="download"/></i>在线投注</span>
				<span class="btn" :class="[active=='video'?'active':'']" @click="liveClick('video')"><i><font-awesome-icon icon="video"/></i>美女直播</span>
				<span class="btn" :class="[active=='alive'?'active':'']" @click="liveClick('alive')"><i><font-awesome-icon icon="font"/></i>文字开奖</span>
				<!-- <span class="btn" :class="[active=='ssc'?'active':'']" @click="liveClick('ssc')"><i><font-awesome-icon icon="trophy"/></i>时时彩直播</span>
				<span class="btn" :class="[active=='pk10'?'active':'']" @click="liveClick('pk10')"><i><font-awesome-icon icon="car"/></i>PK10直播</span> -->
			</div>
			<div class="context-live" :style="heigth">
				<!-- <div
            v-show="active === 'pk10'"
            class="right-container">
              <div

					class="live-container">
						<iframe
						width="100%"
						height="870"
						src="https://kjzb.com/static/wap/assets/dist/vendor/mobile/pk102/index.html" frameborder="0"></iframe>
					</div>
					<div class="kaijiang-container">
						<div class="kjhead-can">
							<div class="little-can">
								<p>期数</p>
							</div>
							<div style="padding: " class="little-can">
								<p>时间</p>
							</div>
							<div class="little-can">
								<ul>
									<li
									@click="bjscTab(index)"
									:class="{on: index === isOn}"
									v-for="(item, index) in title"
									:key="index">
										<span>{{item}}</span>
									</li>
								</ul>
							</div>
						</div>
						<el-scrollbar id="messageScroll1" :native="false" :wrap-style="sHeigth">
						<div class="kjbody-can">
							<div
							v-for="(item, index) in bjscData"
							:key="index"
							class="bd-can">
								<div class="little-bd-can">
									<p>{{item.periods}}</p>
								</div>
								<div class="little-bd-can">
									<p>{{timers(item.starttime, 'MM-dd hh:mm')}}</p>
								</div>
								<div class="little-bd-can">
									<ul>
										<li
										v-if="!isDz"
										v-for="(items, indexes) in item[changeBjsc]"
										:key="indexes"
										:class="[
											'pk10-bg-'+items,
											{
												'pk10-bg-4': items === '大'||items === '单',
												'pk10-bg-6': items === '小'||items === '双'
											}]">{{items}}</li>
										<li
										v-if="isDz"
										v-for="(items, indexes) in item[changeBjsc]"
										:key="indexes"
										:class="bjscData[index].dzrank[indexes] === 1?'pk10-bg-'+(indexes+1):''">{{items}}</li>
									</ul>
								</div>
							</div>
						</div>
					</el-scrollbar>
					</div>
				</div> -->
				<div >
				  <!-- <div class="right-container">
					<div
            v-show="active === 'ssc'"
            class="live-container">
              <iframe
              v-if="isShowIframe"
              width="100%"
              height="870"
              src="https://kjzb.com/static/wap/assets/dist/vendor/mobile/cqssc/live.html" frameborder="0"></iframe>
					</div>
					<div
					v-if="active === 'ssc'"
					class="kaijiang-container">
						<div class="kjhead-can">
							<div class="little-can">
								<p>期数</p>
							</div>
							<div style="padding: " class="little-can">
								<p>时间</p>
							</div>
							<div  class="little-can">
								<p style="position: absolute; left: 55%">开奖号码</p>
							</div>
						</div>
						<el-scrollbar id="messageScroll2" :native="false" :wrap-style="sHeigth">
						<div
						class="kjbody-can">
							<div
							v-for="(item, index) in sscData"
							:key="index"
							class="bd-can">
								<div class="little-bd-can">
									<p>{{item.periods.substr(8, 3)}}</p>
								</div>
								<div class="little-bd-can">
									<p>{{timers(item.starttime, 'MM-dd hh:mm')}}</p>
								</div>
								<div style="padding-left: 18%" class="little-bd-can">
									<ul>
										<li
										v-for="(items, indexes) in item[changeSsc]"
										:key="indexes"
										class="ssc-num" v-cloak>{{items}}</li>
									</ul>
								</div>
							</div>
						</div>
					</el-scrollbar>
					</div>
				</div> -->
				<!-- <el-scrollbar id="messageScroll3" :native="false" :wrap-style="300"> -->
				<div
				v-show="active === 'alive'"
				:style="'height: '+ specialHeight + 'px; overflow-y: scroll'"
				class="right-container">

            <div v-for="(item, index) in lottreyData" :key="index" class="items-container">
                <div class="logo-can">
                  <img :src= item.imageAdd  alt="">
                </div>
              <div class="other-can">
                <div class="other-title">
                  <p class="name"><span>{{item.lottName}}</span> </p>
                    <p>第 <span>{{item.dqqs}}</span>期</p>
                    <p class="kj">下期开奖 <span class="time">{{item.time}}</span></p>
                </div>
                <div class="nums-container">
                <div v-if="item.onKj" class="onKj">正在开奖中...</div>
                <div v-if="!item.onKj" >
                  <ul v-if="item.showType === 'lottery_k3'"  >
                    <li style="margin-right: 10px" v-for="(items, index) in item.dqhm" :key="index+200" :class="'jsk3-bg-'+items">

                    </li>
                  </ul>
                  <ul v-if="item.showType === 'lottery_bjsc'"   >
                    <li v-for="(items, index) in item.dqhm" :key="index" class="item-style" :class="'pk10-bg-'+items">
                      {{items}}
                    </li>
                  </ul>
                  <ul v-if="item.showType === 'lottery_ssc'" style="margin-top: 4px;" >
                    <li  v-for="(items, indexes) in item.dqhm" :key="indexes" :class="'pk10-bg-'+items"  style="border-radius:50%">
                      {{items}}
                    </li>
                  </ul>
                </div>
              </div>
              </div>

            </div>
          <!-- <div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/jsk3.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>江苏快3 </span>第<span>{{dqqs[0]}}</span>期</p>
								<p> 下期开奖还有<span v-cloak> {{times[0]}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[0]"
									:key="index"
									:class="'jsk3-bg-'+item"></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/cqssc.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>重庆时时彩 </span>第<span>{{dqqs[1]}}</span>期</p>
								<p > 下期开奖还有<span v-cloak> {{times[1]}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[1]"
									:key="index"
									class="ssc-num" >{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/pk10.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>北京赛车 </span>第<span>{{dqqs[2]}}</span>期</p>
								<p> 下期开奖还有<span v-cloak> {{times[2]}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[2]"
									:key="index"
									:class="'pk10-bg-'+item">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/ahk3.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>安徽快3 </span>第<span>{{dqqs[3]}}</span>期</p>
								<p> 下期开奖还有<span v-cloak> {{times[3]}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[3]"
									:key="index"
									:class="'jsk3-bg-'+item"></li>
								</ul>
							</div>
						</div>
					</div>

					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/gxk3.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>广西快3 </span>第<span>{{dqqs[4]}}</span>期</p>
								<p> 下期开奖还有<span v-cloak> {{times[4]}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[4]"
									:key="index"
									:class="'jsk3-bg-'+item"></li>
								</ul>
							</div>
						</div>
					</div>


					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/hbk3.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>湖北快3 </span>第<span>{{dqqs[5]}}</span>期</p>
								<p> 下期开奖还有<span v-cloak> {{times[5]}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[5]"
									:key="index"
									:class="'jsk3-bg-'+item"></li>
								</ul>
							</div>
						</div>
					</div>

					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/gsk3.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>甘肃快3 </span>第<span>{{dqqs[6]}}</span>期</p>
								<p> 下期开奖还有<span v-cloak> {{times[6]}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[6]"
									:key="index"
									:class="'jsk3-bg-'+item"></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/hbk3.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>河北快3 </span>第<span>{{dqqs[7]}}</span>期</p>
								<p> 下期开奖还有<span v-cloak> {{times[7]}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[7]"
									:key="index"
									:class="'jsk3-bg-'+item"></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/shk3.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>上海快3 </span>第<span>{{dqqs[8]}}</span>期</p>
								<p> 下期开奖还有<span v-cloak> {{times[8]}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[8]"
									:key="index"
									:class="'jsk3-bg-'+item"></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/jlk3.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>吉林快3 </span>第<span>{{dqqs[9]}}</span>期</p>
								<p> 下期开奖还有<span v-cloak> {{times[9]}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[9]"
									:key="index"
									:class="'jsk3-bg-'+item"></li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/gzk3.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>贵州快3 </span>第<span>{{dqqs[10]}}</span>期</p>
								<p> 下期开奖还有<span v-cloak> {{times[10]}}</span></p>
							</div>
							<div class="nums-container">
								<ul style="flex-wrap: wrap;">
									<li
									v-for="(item, index) in dqhm[10]"
									:key="index"
								:class="'jsk3-bg-'+item"></li>
								</ul>
							</div>
						</div>
					</div>
          <div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/bjk3.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p> <span>北京快3 </span>第<span>{{dqqs[11]}}</span>期</p>
								<p> 下期开奖还有<span v-cloak> {{times[11]}}</span></p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[11]"
									:key="index"
									:class="'jsk3-bg-'+item"></li>
								</ul>
							</div>
						</div>
					</div> -->
				</div>

				<!-- </el-scrollbar> -->

				</div>

				<div
				style="height: 100%"
				v-show="active === 'video'"
				class="right-container">
					<embed
						src="//weblbs.yystatic.com/s/22490906/22490906/yycomscene.swf"
						quality="high" width="100%" height="100%" align="middle" allowscriptaccess="always"
						allowfullscreen="true" wmode="transparent" type="application/x-shockwave-flash"
						autostart="true">
				</div>

				<div
				style="background: #fff"
				v-show="active === 'bet'"
				class="right-container">
					<div id="ifm" >
						<iframe width="100%" height="100%" :src="betSrc" frameborder="0" ></iframe>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import '@/assets/css/scrollbar.less'
	import '@/assets/css/right.less'
  import formatTime from '@/utils/formatTime'
	import KJ from '@/api/lotterytimer'
	import open from '@/api/kaijiang'
  import Constants from '@/utils/constants'
  import Common from '@/api/common'
	export default{
		props:['heigth'],
		data(){

			var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			return {
        xqqs:[],
        lottreyData: [],
        lottreyImageAdd:'/static/images/lottery-logo/',
        lottreyImageType:'.png',
        lottName:[],
				isShowIframe: false,
				chatUrl:Constants.chatUrl,
				imgUrl:Constants.staticUrl,
				active:'alive',
				liveHtml:'',
				title: ['号码', '大小', '单双', '对子'],
				isOn: 0,
				isDz: false,
				sign: 0,
				bjscData: [],
				sscData: [],
				isP: [],
				changeBjsc: 'rank',
				changeSsc: 'rank',
				times: [],
				dqhm: [],
				dqqs: [],
        cargo: [],
        localTimers:[],
				sHeigth: 'max-height: '+(scrollHeight-403)+'px;',
        betSrc:'',
        lineUp:'',
				specialHeight: '',
			}
		},
		watch:{

    },
    // created() {
    //    // 初始化开奖数据
    // },
		mounted(){
			let ifm = document.getElementById('ifm');
			let hei = window.innerHeight;
			this.specialHeight = hei -107;
      ifm.style.height = hei - 107 +'px'
      Common.getSystemInfo(
      ).then(
        res => {
          this.lineUp = res.data.betWeb;
        }
      ).catch()
      // Common.getKjJsonArray(
      // ).then(
      //   res => {
      //     console.log(res)
      //     this.lottreyData = res.data
      //     let lotteryInfos = JSON.parse(this.lottreyData);
      //      let _that = this;
      //   for(let i = 0; i < _that.lottreyData.length; i++){
      //     if(_that.lottreyData[i].lottId === lotteryInfos.lottId){
      //       clearInterval(_that.lottreyData[i].clickName);
      //       this.$set(_that.lottreyData[i],'onKj',false);
      //       this.$set(_that.lottreyData[i],'dqhm',lotteryInfos.dqhm);
      //       this.$set(_that.lottreyData[i],'dqqs',lotteryInfos.dqqs);
      //       this.$set(_that.lottreyData[i],'xqkjsj',lotteryInfos.xqkjsj);
      //       this.countDown(_that.lottreyData[i], lotteryInfos.timestamp);
      //     }
      //   }
      //     // for(let i = 0 ;i < res.data.length; i ++) {
      //     //    this.dqhm.push(res.data[i].dqhm)
      //     //    this.dqqs.push(res.data[i].dqqs)
      //     //   //  this.times.push(res.data[i].timestamp)
      //     //   this.countDown({
			// 		// 		xqkjsj: res.data[i].xqkjsj,
			// 		// 		timestamp: res.data[i].timestamp,
			// 		// 		num: i
			// 		// 	})
      //     // }
      //     // res.data.forEach(item => {


      //     //   	// this.countDown({
			// 		// 		// 	xqkjsj: res.data.xqkjsj,
			// 		// 		// 	timestamp: res.timestamp,
			// 		// 		// 	num: this.sign
			// 		// 		// })
			// 		// 		// this.sign++;

      //     // });
      //   }
      // ).catch()

       this.$root.eventHub.$on('lotteryInfos', item => {
        let lotteryInfos = JSON.parse(item);
        for(let i = 0; i < this.lottreyData.length; i++){
          if(this.lottreyData[i].lottId === lotteryInfos.lottId){
            clearInterval(this.lottreyData[i].clickName);
            this.$set(this.lottreyData[i],'onKj',false);
            this.$set(this.lottreyData[i],'dqhm',lotteryInfos.dqhm);
            this.$set(this.lottreyData[i],'dqqs',lotteryInfos.dqqs);
            this.$set(this.lottreyData[i],'xqkjsj',lotteryInfos.xqkjsj);
            this.countDown(this.lottreyData[i], lotteryInfos.timestamp);
          }
        }
      });
		},
		created() {
      // this.initData();
      this.initData();
			for(let i=0;i<12;i++) {
				this.isP.push(true);
			}

			// this.cqssc();
			// this.bjsc();
		},
		computed:{

		},
		methods:{
    //   onIframeLoad(event) {
    //     const iframe = event.target
    //     console.log(iframe)
    // Util.getIframeStyle(iframe)
    //     console.log(iframe.contentWindow)
    //      var iwindow = iframe.contentWindow;
    //      console.log(this.$el.querySelector("#ifm>iframe>#document"))
    //       // var idoc = iwindow.document;
    //       //  console.log("window",iwindow);//获取iframe的window对象
    //     // console.log("document",idoc);  //获取iframe的document
    //     // console.log("html",idoc.documentElement);//获取iframe的html
    //     // console.log("head",idoc.head);  //获取head
    //     // console.log("body",idoc.body);  //获取body
    //   },
			timers(time, str) {
				return formatTime(new Date(time), str)
			},
			// bjscTab(index = 0) {
			// 	this.isOn = index;
			// 	this.isDz = false;
			// 	if(index === 0) {
			// 		this.changeBjsc = 'rank';
			// 	} else if(index === 1) {
			// 		this.changeBjsc = 'dxrank';
			// 	} else if (index === 2) {
			// 		this.changeBjsc = 'dsrank';
			// 	} else if(index === 3){
			// 		this.changeBjsc = 'rank';
			// 		this.isDz = true;
			// 	}
			// },
			// bjsc() {
			// 	open.bjsckj().then(
			// 		res => {
			// 			this.bjscData = res.data;

			// 		}
			// 	);
			// },
			// cqssc(index = 0) {
			// 	open.cqssc().then(
			// 		res => {
			// 			this.sscData = res.data;
			// 		}
			// 	);
      // },
      reGetDatas(item,lottId) {
        var lott = -1
        if(lottId === 'jsk3') {
           lott = 0;
        }
         else
        if(lottId === 'cqssc') {
          lott = 1;
        }
         else
        if(lottId === 'bjsc') {
           lott = 2;
        }
        if(lottId === 'ahk3') {
          lott = 3;
        }
         else
        if(lottId === 'gxk3') {
          lott = 4;
        }
         else
        if(lottId === 'hubk3') {
          lott = 5;
        }
         else
        if(lottId === 'gsk3') {
          lott = 6;
        }
         else
        if(lottId === 'hebk3') {
           lott = 7;
        }
         else
        if(lottId === 'shk3') {
           lott = 8;
        }
         else
        if(lottId === 'jlk3') {
           lott = 9;
        }
        else
        if(lottId === 'gzk3') {
          lott = 10;
        }
        else
        if(lottId === 'bjk3') {
          lott = 11;
        }
        if(lott>=0) {
          	this.dqhm.splice(lott, 1, item.dqhm);
            this.dqqs.splice(lott, 1, item.dqqs);
						this.countDown({
							xqkjsj: item.xqkjsj,
							timestamp: item.timestamp,
							num: lott
						})
        }

      },
			// reGetData(index) {
			// 	if(index === 0) {
			// 		// this.bjsc()
			// 	} else if (index === 5) {
			// 		this.cqssc()
			// 	}
			// 	KJ(index).then(
			// 		res => {
						// this.dqhm.splice(index, 1, res.data.dqhm);
            // this.dqqs.splice(index, 1, res.data.dqqs);
						// this.countDown({
						// 	xqkjsj: res.data.xqkjsj,
						// 	timestamp: res.timestamp,
						// 	num: index
						// })
			// 		}
			// 	)
      // },
      countDown(lottreyData, timestamp) {
        let timer = Math.ceil((lottreyData.xqkjsj - timestamp) / 1000);
        if(timer === 0 || timer < 0) {
          // 重新去请求数据
          this.$set(lottreyData,'onKj',true);
          this.$set(lottreyData,'time','00:00');
        } else {
          let min = Math.floor(timer / 60 % 60) + (Math.floor(timer / 60 / 60 % 24) * 60);
          let scd = Math.ceil(timer % 60);
          lottreyData.clickName = setInterval(() => {
              -- scd;
              if(((min === 0 || min === '00') && scd === 0) || min < 0) {
                this.$set(lottreyData,'time','00:00');
                this.$set(lottreyData,'onKj',true);
                clearInterval(lottreyData.clickName);
              } else {
                if(scd < 0) {
                  min --;
                  scd = 59;
                }
                if((min + '').length === 1) {
                  min = '0' + min;
                }
                if((scd + '').length === 1) {
                  scd = '0' + scd;
                }
                this.$set(lottreyData,'time', min + ':' + scd);
              }
            },1000);
        }
      },
			// countDown(data) {

      //     if(data.timestamp ==undefined) {
      //        var timer = Math.ceil((data.xqkjsj - new Date().getTime())/1000);
      //     }else {
      //       let localTimer = data.timestamp;
      //        this.times.splice(data.num, 1, '开奖中...');
      //        var timer = Math.ceil((data.xqkjsj - localTimer)/1000);
      //     }
			// 	if(timer -0 <= 0) {
      //     this.times.splice(data.num, 1, '开奖中...');
			// 	} else {
			// 		let min = Math.floor(timer/60);
      //     let scd = Math.ceil(timer%60);
			// 		let click = setInterval(
			// 			() => {
			// 				scd --;
			// 				if(((min === 0||min === '00')&&scd === 0)||min <0){
			// 					clearInterval(click);
			// 					this.times.splice(data.num, 1, '开奖中...');
			// 					// this.reGetData(data.num);
			// 				} else {
			// 					if(scd < 0) {
			// 						min --;
			// 						scd = 59;
			// 					}
			// 					if((min+'').length === 1) {
			// 						min = '0' + min
			// 					}
			// 					if((scd+'').length === 1) {
			// 						scd = '0' + scd
			// 					}
			// 					this.times.splice(data.num, 1, min+':'+scd);
			// 				}
			// 			}
			// 		,1000);
			// 	}
			// },
			// initData() {
			// 	if(this.sign === 12) {
			// 		return false
			// 	} else {
			// 		KJ().then(
			// 			res => {
      //         let timeDown = {
      //           timestamp:res.timestamp
      //         }
      //          this.localTimers.push(timeDown)
			// 				// // this.dqhm.push(res.data.dqhm);
      //         // // // this.dqqs.push(res.data.dqqs);
			// 				// this.countDown({
			// 				// 	xqkjsj: res.data.xqkjsj,
			// 				// 	timestamp: res.timestamp,
			// 				// 	num: this.sign
			// 				// })
			// 				this.sign++;
			// 				this.initData()
			// 			}
			// 		)
			// 	}
      // },
       initData() {
        Common.getKjJsonArray().then(res => {
          if(res.code === 0){
            this.lottreyData = res.data;
            let timestamp = res.timestamp;
            for(let i = 0; i < this.lottreyData.length; i++){
              const STATIC = '/static/images/lottery-logo/' ;
              const IMAGETYPE = '.png' ;
              var imageAdd = STATIC +this.lottreyData[i].lottId + IMAGETYPE
              this.$set(this.lottreyData[i],'onKj',false);
               this.$set(this.lottreyData[i],'imageAdd',imageAdd);
              this.$set(this.lottreyData[i],'clickName','click'+ this.lottreyData[i].lottName);
              this.countDown(this.lottreyData[i],timestamp); // 倒计时
            }
          }
        });
      },
			liveClick(item){
        this.active = item;
				if(item == 'bet'){
          var lineUp = this.lineUp
          this.betSrc =  lineUp
        // let iframeWindow = this.$el.querySelector("#ifm")
        // // .getElementsByClassName("dialog-notice")
        // if(iframeWindow !== null) {
        //    iframeWindow.style.display = "none"
        // }

          // =
          // console.log(iframeWindow);
				}else if(item === 'video'){
					this.liveHtml = '美女直播';
				}else if(item === 'alive'){
					this.liveHtml = '文字开奖'
				}else if(item === 'ssc'){
					this.isShowIframe = true;
					this.liveHtml = '时时彩直播';
				}else if(item === 'pk10'){
					this.liveHtml = 'PK10直播';
				}
			}
		}
	}
</script>
