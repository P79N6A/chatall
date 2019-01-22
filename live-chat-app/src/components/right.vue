<template>
	<div class="contxt-right">
		<div class="LivePanel">
			<div class="title">
				<span class="btn" :class="[active=='bet'?'active':'']" @click="liveClick('bet')"><i><font-awesome-icon icon="download"/></i>在线投注</span>
				<span class="btn" :class="[active=='video'?'active':'']" @click="liveClick('video')"><i><font-awesome-icon icon="video"/></i>美女直播</span>
				<span class="btn" :class="[active=='alive'?'active':'']" @click="liveClick('alive')"><i><font-awesome-icon icon="font"/></i>文字开奖</span>
				<span class="btn" :class="[active=='ssc'?'active':'']" @click="liveClick('ssc')"><i><font-awesome-icon icon="trophy"/></i>时时彩直播</span>
				<span class="btn" :class="[active=='pk10'?'active':'']" @click="liveClick('pk10')"><i><font-awesome-icon icon="car"/></i>PK10直播</span>
			</div>
			<div class="context-live" :style="heigth">
				<div 
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
				</div>
				<div >
				<div class="right-container">
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
										class="ssc-num">{{items}}</li>
									</ul>
								</div>
							</div>
						</div>
					</el-scrollbar>
					</div>
				</div>
				<!-- <el-scrollbar id="messageScroll3" :native="false" :wrap-style="300"> -->
				<div 
				v-show="active === 'alive'"
				:style="'height: '+ specialHeight + 'px; overflow-y: scroll'"
				class="right-container">
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/pk10.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p>北京赛车 最新开奖{{dqqs[0]}}期</p>
								<p>距离下期开奖还有:{{times[0]}}</p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[0]"
									:key="index"
									:class="'pk10-bg-'+item">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/xyft.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p>幸运飞艇 最新开奖{{dqqs[2]}}期</p>
								<p>距离下期开奖还有:{{times[2]}}</p>
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
							<img src="/static/images/lottery-logo/cqssc.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p>重庆时时彩 最新开奖{{dqqs[5]}}期</p>
								<p>距离下期开奖还有:{{times[5]}}</p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									style="background: #ff7600"
									v-for="(item, index) in dqhm[5]"
									:key="index"
									class="blue-defult">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/jsk3.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p>江苏快三 最新开奖{{dqqs[3]}}期</p>
								<p>距离下期开奖还有:{{times[3]}}</p>
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
							<img src="/static/images/lottery-logo/gdkl10.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p>广东快乐十分 最新开奖{{dqqs[1]}}期</p>
								<p>距离下期开奖还有:{{times[1]}}</p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									style="background: #237c7d; border-radius: 50%;"
									v-for="(item, index) in dqhm[1]"
									:key="index"
									class="blue-defult">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					
					
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/xync.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p>幸运农场 最新开奖{{dqqs[4]}}期</p>
								<p>距离下期开奖还有:{{times[4]}}</p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									style="border-radius: 50%"
									v-for="(item, index) in dqhm[4]"
									:key="index"
									class="blue-defult">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/gd11x5.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p>广东11选5 最新开奖{{dqqs[6]}}期</p>
								<p>距离下期开奖还有:{{times[6]}}</p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[6]"
									:key="index"
									class="blue-defult">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/jx11x5.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p>江西11选5 最新开奖{{dqqs[7]}}期</p>
								<p>距离下期开奖还有:{{times[7]}}</p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									style="background: #237c7d"
									v-for="(item, index) in dqhm[7]"
									:key="index"
									class="blue-defult">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/xjssc.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p>新疆时时彩 最新开奖{{dqqs[8]}}期</p>
								<p>距离下期开奖还有:{{times[8]}}</p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									style="border-radius: 50%; background: #ff7600"
									v-for="(item, index) in dqhm[8]"
									:key="index"
									class="blue-defult">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/tjssc.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p>天津时时彩 最新开奖{{dqqs[9]}}期</p>
								<p>距离下期开奖还有:{{times[9]}}</p>
							</div>
							<div class="nums-container">
								<ul>
									<li
									v-for="(item, index) in dqhm[9]"
									:key="index"
									class="blue-defult">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="items-container">
						<div class="logo-can">
							<img src="/static/images/lottery-logo/kl8.png" alt="">
						</div>
						<div class="other-can">
							<div class="other-title">
								<p>快乐8 最新开奖{{dqqs[10]}}期</p>
								<p>距离下期开奖还有:{{times[10]}}</p>
							</div>
							<div class="nums-container">
								<ul style="flex-wrap: wrap;">
									<li
									style="margin-bottom: 3px;"
									v-for="(item, index) in dqhm[10]"
									:key="index"
									class="blue-defult">{{item}}</li>
								</ul>
							</div>
						</div>
					</div>
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
						<iframe width="100%" height="100%" :src="betSrc" frameborder="0"></iframe>
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
	export default{
		props:['heigth'],
		data(){
			
			var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			return {
				isShowIframe: false,
				chatUrl:Constants.chatUrl,
				imgUrl:Constants.staticUrl,
				active:'pk10',
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
				sHeigth: 'max-height: '+(scrollHeight-403)+'px;',
				betSrc:'',
				specialHeight: '',
			}
		},
		watch:{

		},
		mounted(){
			let ifm = document.getElementById('ifm');
			let hei = window.innerHeight;
			this.specialHeight = hei -107;
			ifm.style.height = hei - 107 +'px'
		},
		created() {
			this.initData();
			for(let i=0;i<12;i++) {
				this.isP.push(true);
			}
			
			this.cqssc();
			this.bjsc();
		},
		computed:{

		},
		methods:{
			timers(time, str) {
				return formatTime(new Date(time), str)
			},
			bjscTab(index = 0) {
				this.isOn = index;
				this.isDz = false;
				if(index === 0) {
					this.changeBjsc = 'rank';
				} else if(index === 1) {
					this.changeBjsc = 'dxrank';
				} else if (index === 2) {
					this.changeBjsc = 'dsrank';
				} else if(index === 3){
					this.changeBjsc = 'rank';
					this.isDz = true;
				}
			},
			bjsc() {
				open.bjsckj().then(
					res => {
						this.bjscData = res.data;

					}
				);
			},
			cqssc(index = 0) {
				open.cqssc().then(
					res => {
						this.sscData = res.data;
					}
				);
			},
			reGetData(index) {
				if(index === 0) {
					this.bjsc()
				} else if (index === 5) {
					this.cqssc()
				}
				KJ(index).then(
					res => {
						this.dqhm.splice(index, 1, res.data.dqhm);
						this.dqqs.splice(index, 1, res.data.dqqs)
						this.countDown({
							xqkjsj: res.data.xqkjsj,
							timestamp: res.timestamp,
							num: index
						})
					}
				)
			},
			countDown(data) {
				let localTimer = data.timestamp;
				let otherClick;
				let timer = Math.ceil((data.xqkjsj - localTimer)/1000);
				if(timer === 0||timer < 0) {                                       	
					otherClick = setTimeout(() => { 
						this.reGetData(data.num)
					},5000);
				} else {
					clearTimeout(otherClick);
					let min = Math.floor(timer/60);
					let scd = Math.ceil(timer%60);
					let click = setInterval(
						() => {
							scd --;
							if(((min === 0||min === '00')&&scd === 0)||min <0) {
								clearInterval(click);
								this.times.splice(data.num, 1, '开奖中...');
								this.reGetData(data.num);
							} else {
								if(scd < 0) {
									min --;
									scd = 59;
								}
								if((min+'').length === 1) {
									min = '0' + min
								}
								if((scd+'').length === 1) {
									scd = '0' + scd
								}
								this.times.splice(data.num, 1, min+':'+scd);
							}
						}
					,1000);
				}
			},
			initData() {
				if(this.sign === 12) {
					return false
				} else {
					KJ(this.sign).then(
						res => {
							this.dqhm.push(res.data.dqhm);
							this.dqqs.push(res.data.dqqs);
							this.countDown({
								xqkjsj: res.data.xqkjsj,
								timestamp: res.timestamp,
								num: this.sign
							})
							this.sign++;
							this.initData()
						}
					)
				}
			},
			liveClick(item){
				this.active = item;
				if(item === 'bet'){
					this.betSrc = 'http://klk2018.com/m';
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