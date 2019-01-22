<template>
	<div class="contxt-left" :style="heigth">
		<div class="contxt-left-wrap">
			<div class="apps clearfix">
				<a href="https://kjzb.com/" target="_blank" class="appico col3-1 jbnone">
					<img :src="imgUrl+'images/lottery.png'">
					<br>
					<span>开奖直播</span>
				</a>
				<a href="javascript:;" class="appico col3-1 jbnone" @click="RedRuleClick">
					<img :src="imgUrl+'images/red.png'">
					<br>
					<span>红包规则</span>
				</a>
				<a href="javascript:;" class="appico col3-1 jbnone" @click="SigninRuleClick">
					<img :src="imgUrl+'images/qiandaogz.png'">
					<br>
					<span>签到规则</span>
				</a>
				<a href="http://www.k0060.com/#/home/register" target="_blank" class="appico col3-1 jbnone">
					<img :src="imgUrl+'images/qiu.png'">
					<br>
					<span>开户/注册</span>
				</a>
			</div>
			<div class="tab_nav">
				<a href="javascript:;" :class="[tabNav=='manage'?'active':'']" @click="choseTab('manage')">客服/管理</a>
				<a href="javascript:;" style="display:none;">我的客户<br><span>0</span></a>
				<a href="javascript:;" :class="[tabNav=='online'?'active':'']" @click="choseTab('online')">在线人数<p>{{UserCount}}</p></a>
			</div>
		</div>
		<div class="tab_div in" v-if="tabNav=='manage'">
			<div class="title">在线人数</div>
			<el-scrollbar id="manageScroll" :native="false" :wrap-style="'max-height: '+numberHeigth+'px;'">
			<div class="OnLineUser">
				<ul>
					<li v-for="(item,index) in manageList" :key="index">
						<a href="javascript:;">
							<span class="ugroup">
								<Poptip trigger="hover" placement="right-start" transfer>
									<img :src="imgUrl+'images/role/'+item.flag+'.png'" align="top">
									<div slot="content">
										<template v-if="item.flag=='2'">管理-系统管理员</template>
										<template v-if="item.flag=='1'">管理-客服</template>
									</div>
								</Poptip>
							</span>
							<span class="uimg">
								<img :src="imgUrl+'images/avatar/'+item.avatar" border="0" class="head">
							</span>
							<span class="unick">{{item.nickname}}</span>
						</a>
					</li>
				</ul>
			</div>
			</el-scrollbar>
		</div>
		<div class="tab_div in" v-else>
			<div class="OnlineUser_Find">
				<Input search placeholder="我要找人(区分大小写)" v-model="searchtxt" @on-search="search"/>
			</div>
			<el-scrollbar id="onlineScroll" :native="false" :wrap-style="'max-height: '+(numberHeigth-5)+'px;'">
				<div class="OnLineUser">
					<ul>
						<li v-if="userInfo&&userInfo.userdegree !== 0" @contextmenu.prevent="openMenu(userInfo,$event)">
							<a href="javascript:;">
								<span class="ugroup">
									<Poptip trigger="hover" placement="right-start" transfer>
										<img v-if="userInfo.userflag == 1" :src="imgUrl+'images/grade/'+userInfo.userdegree+'.png'" align="top">
										<img v-if="userInfo.userflag == 2" :src="imgUrl+'images/role/2.png'" align="top">
										<div slot="content">
											<Grade v-if="userInfo.userflag == 1" :grade="userInfo.userdegree"></Grade>
											<template v-if="userInfo.userflag == 2">
												管理-系统管理员
											</template>
										</div>
									</Poptip>
								</span>
								<span class="uimg">
									<img :src="imgUrl+'images/avatar/'+userInfo.headimage" border="0" class="head">
								</span>
								<span class="unick">{{userInfo.nickname}}</span>
							</a>
						</li>
						<template v-if="isSearch">

						<li v-for="(item,index) in manageList" :key="index" @contextmenu.prevent="openMenu(item,$event)">
							<a href="javascript:;">
								<span class="ugroup">
									<Poptip trigger="hover" placement="right-start" transfer>
										<img :src="imgUrl+'images/role/'+item.flag+'.png'" align="top">
										<div slot="content">
											<template v-if="item.flag==2">管理-系统管理员</template>
											<template v-if="item.flag==1">管理-客服</template>
										</div>
									</Poptip>
								</span>
								<span class="uimg">
									<img :src="imgUrl+'images/avatar/'+item.avatar" border="0" class="head">
								</span>
								<span class="unick">{{item.nickname}}</span>
							</a>

						</li>
							<!-- <li v-for="item in OnLineUserList" @contextmenu.prevent="openMenu(item,$event)">
								<a href="javascript:;" >
									<span class="ugroup">
										<Poptip trigger="hover" placement="right-start" transfer>
											<img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
											<div slot="content">
												<Grade :grade="item.grade"></Grade>
											</div>
										</Poptip>
									</span>
									<span class="uimg">
										<img :src="imgUrl+'images/avatar/'+item.avatar" border="0" class="head">
									</span>
									<span class="unick">{{item.nickname}}</span>
								</a>
							</li> -->
							<li v-for="item in userDegree['6']" @contextmenu.prevent="openMenu(item,$event)">
								<a href="javascript:;" >
									<span class="ugroup">
										<Poptip trigger="hover" placement="right-start" transfer>
											<img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
											<div slot="content">
												<Grade :grade="item.grade"></Grade>
											</div>
										</Poptip>
									</span>
									<span class="uimg">
										<img :src="imgUrl+'images/avatar/'+item.avatar" border="0" class="head">
									</span>
									<span class="unick">{{item.nickname}}</span>
								</a>
							</li>
							<li v-for="item in userDegree['5']" @contextmenu.prevent="openMenu(item,$event)">
								<a href="javascript:;" >
									<span class="ugroup">
										<Poptip trigger="hover" placement="right-start" transfer>
											<img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
											<div slot="content">
												<Grade :grade="item.grade"></Grade>
											</div>
										</Poptip>
									</span>
									<span class="uimg">
										<img :src="imgUrl+'images/avatar/'+item.avatar" border="0" class="head">
									</span>
									<span class="unick">{{item.nickname}}</span>
								</a>
							</li>
							<li v-for="item in userDegree['4']" @contextmenu.prevent="openMenu(item,$event)">
								<a href="javascript:;" >
									<span class="ugroup">
										<Poptip trigger="hover" placement="right-start" transfer>
											<img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
											<div slot="content">
												<Grade :grade="item.grade"></Grade>
											</div>
										</Poptip>
									</span>
									<span class="uimg">
										<img :src="imgUrl+'images/avatar/'+item.avatar" border="0" class="head">
									</span>
									<span class="unick">{{item.nickname}}</span>
								</a>
							</li>
							<li v-for="item in userDegree['3']" @contextmenu.prevent="openMenu(item,$event)">
								<a href="javascript:;" >
									<span class="ugroup">
										<Poptip trigger="hover" placement="right-start" transfer>
											<img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
											<div slot="content">
												<Grade :grade="item.grade"></Grade>
											</div>
										</Poptip>
									</span>
									<span class="uimg">
										<img :src="imgUrl+'images/avatar/'+item.avatar" border="0" class="head">
									</span>
									<span class="unick">{{item.nickname}}</span>
								</a>
							</li>
							<li v-for="item in userDegree['2']" @contextmenu.prevent="openMenu(item,$event)">
								<a href="javascript:;" >
									<span class="ugroup">
										<Poptip trigger="hover" placement="right-start" transfer>
											<img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
											<div slot="content">
												<Grade :grade="item.grade"></Grade>
											</div>
										</Poptip>
									</span>
									<span class="uimg">
										<img :src="imgUrl+'images/avatar/'+item.avatar" border="0" class="head">
									</span>
									<span class="unick">{{item.nickname}}</span>
								</a>
							</li>
							<li v-for="item in userDegree['1']" @contextmenu.prevent="openMenu(item,$event)">
								<a href="javascript:;" >
									<span class="ugroup">
										<Poptip trigger="hover" placement="right-start" transfer>
											<img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
											<div slot="content">
												<Grade :grade="item.grade"></Grade>
											</div>
										</Poptip>
									</span>
									<span class="uimg">
										<img :src="imgUrl+'images/avatar/'+item.avatar" border="0" class="head">
									</span>
									<span class="unick">{{item.nickname}}</span>
								</a>
							</li>
							<li v-for="item in userDegree['0']" @contextmenu.prevent="openMenu(item,$event)">
								<a href="javascript:;" >
									<span class="ugroup">
										<Poptip trigger="hover" placement="right-start" transfer>
											<img :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
											<div slot="content">
												<Grade :grade="item.grade"></Grade>
											</div>
										</Poptip>
									</span>
									<span class="uimg">
										<img :src="imgUrl+'images/avatar/'+item.avatar" border="0" class="head">
									</span>
									<span class="unick">{{item.nickname}}</span>
								</a>
							</li>
						</template>
						<template v-if="!isSearch">
							<li v-for="item in searchList" @contextmenu.prevent="openMenu(item,$event)">
								<a href="javascript:;" >
									<span class="ugroup">
										<Poptip trigger="hover" placement="right-start" transfer>
											<img v-if="item.flag != 2" :src="imgUrl+'images/grade/'+item.grade+'.png'" align="top">
											<img v-if="item.flag == 2" :src="imgUrl+'images/role/'+item.flag+'.png'" align="top">
											<div slot="content">
												<Grade :grade="item.grade"></Grade>
												<template v-if="item.flag==2">管理-系统管理员</template>
												<template v-if="item.flag==1&&item.grade != 0">管理-客服</template>
											</div>
										</Poptip>
									</span>
									<span class="uimg">
										<img :src="imgUrl+'images/avatar/'+item.avatar" border="0" class="head">
									</span>
									<span class="unick">{{item.nickname}}</span>
								</a>
							</li>
						</template>
					</ul>
				</div>
			</el-scrollbar>
		</div>
		<div class="contextmenu" v-show="visible" :style="'left:'+left+'px;top:'+top+'px;'">
			<template v-if="isMe">
				<div @click="broadcastInfo" class="li">
					<div class="icon">
						<i><font-awesome-icon :icon="['fas','street-view']"/></i>
					</div>
					<span>我的资料</span>
				</div>
			</template>
			<template v-else>
				<div v-if="(nowFlog !== 0)&&isPreventChat" class="li" @click="privateChat">
					<div class="icon">
						<i><font-awesome-icon :icon="['fas','comments']"/></i>
					</div>
					<span>私聊</span>
				</div>
				<div v-if="(nowFlog !== 0)&&isPreventChat" class="li" @click="selectInfo">
					<div class="icon">
						<i><font-awesome-icon :icon="['fas','user']"/></i>
					</div>
					<span>查看资料</span>
				</div>
				<!-- <div class="li">
					<div class="icon">
						<i><font-awesome-icon :icon="['fas','eye-slash']"/></i>
					</div>
					<span>屏蔽消息</span>
				</div> -->
			</template>
		</div>
		<Modal class="red-rule-modal" v-model="redRuleModal" footer-hide width='800px'>
			
		</Modal>
		<Modal class="signin-rule-modal" v-model="signinRuleModal" footer-hide width='800px'>
			
		</Modal>
		<Modal 
		width="300"
		footer-hide
		v-model="isNumbersInfo">
			<div class="numbers-card">
				<div class="numbers-card-head">
					<img :src="imgUrl+'images/avatar/'+numbersInfo.headImage" alt="">
					<h1>{{numbersInfo.nickname}}</h1>
				</div>
				<div class="numbers-card-body">
					<ul>
						<li>
							<p>用户昵称:</p>
							<p>{{numbersInfo.nickname}}</p>
						</li>
						<li>
							<p>用户性别:</p>
							<p>{{genders[numbersInfo.gender]}}</p>
						</li>
						<li>
							<p>个人简介:</p>
							<p>{{numbersInfo.selfIntroduction}}</p>
						</li>
					</ul>
				</div>
			</div>
		</Modal>
	</div>
</template>
<script>
	import Constants from '@/utils/constants'
	import Grade from '@/components/grade'
	import User from '@/api/user'
	import Util from '@/utils/util'
	export default{
		props:['heigth','numberHeigth'],
		components:{Grade},
		data(){
			return {
				genders: {
					1: '男',
					2: '女',
					0: '保密'
				},
				chatUrl:Constants.chatUrl,
				imgUrl:Constants.staticUrl,
				tabNav:'online',
				userInfo:null,
				visible:false,
				isMe:false,
				top: 0,
      			left: 0,
      			selectedMenu:{},
      			UserCount:0,
      			searchtxt:null,
      			redRuleModal:false,
      			signinRuleModal:false,
				manageList:[
					
				],
				OnLineUserList:[
					
				],
				tempOnLineUserList:[],
				numbersInfo: {},
				isNumbersInfo: false,
				isPreventChat: false,
				userDegree: {
					'6': [],
					'5': [],
					'4': [],
					'3': [],
					'2': [],
					'1': [],
					'0': [] 
				},
				searchList: [],
				isSearch: true,
			}
		},
		watch:{
			searchtxt(val) {
				if(val === '') {
					this.isSearch = true
				}
			},
			visible(value) {
		      if (value) {
		        document.body.addEventListener('click', this.closeMenu)
		      } else {
				this.isPreventChat = false;
		        document.body.removeEventListener('click', this.closeMenu)
		      }
		    }
		},
		beforeCreate(){
			var that = this;
			this.$root.eventHub.$on("onLiveChatEvent",item=>{
				console.log('上线===>')
				console.log(item);
		      that.userInfo = item;
		    //this.dealUserList(item);
			  this.getUserList(item);
		    });
		},
		mounted() {		  
			var that = this;
			//用户上线事件发布
		    this.$root.eventHub.$on("onlineEvent",item=>{
				// that.OnLineUserList.splice(0);
				console.log(item);
		    	var bool = true;
		    	this.dealUserList(item);
		    	
		    });
		    //断开连接
		    this.$root.eventHub.$on("disconnectEvent",item=>{
				console.log(item);
				if(item.user_degree !== '0') {
					if(this.checkBeen(this.userDegree[item.user_degree], item.user_id)) {
						for(let i=0; i<this.userDegree[item.user_degree].length; i++) {
							if(this.userDegree[item.user_degree][i].userid === item.user_id) {
								this.userDegree[item.user_degree].splice(i, 1);
							}
						}
					} 
				}				
		    });
		},
		computed:{
			nowFlog() {
				return this.$store.state.userInfo.userflag - 0;
			}
		},
		methods:{
			dealUserList(item) {
				let obj = {
					userid: item.user_id,
					nickname: item.nickname,
					flag: item.user_flag,
					grade:Util.isNull(item.user_degree) ? 0 : item.user_degree,
					avatar: (item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.gif' :item.head_image,
					sessionid: item.sessionid,
				}
				let repeatFlag = false;
				// console.log(this.userDegree['0']);
				// console.log(item.user_id);
				if(obj.flag-0 === 0) {
					for(let i=0; i<this.userDegree['0'].length; i++) {
						if(this.userDegree['0'][i].userid === item.user_id) {
							repeatFlag = true;
						}
					}
					if(!repeatFlag) {
						this.userDegree['0'].push(obj);
						this.UserCount ++;
					}
				} else {
					if(obj.flag === '1'||obj.flag === '0') {
						switch (obj.grade-0) {
							case 6 :
								if(!this.checkRepeat(this.userDegree['6'], obj.userid)) {
									this.UserCount ++;
									this.userDegree['6'].push(obj);
								}
								break
							case 5 :
								if(!this.checkRepeat(this.userDegree['5'], obj.userid)) {
									this.UserCount ++;
									this.userDegree['5'].push(obj);
								}
								break
							case 4 :
								if(!this.checkRepeat(this.userDegree['4'], obj.userid)) {
									this.UserCount ++;
									this.userDegree['4'].push(obj);
								}
								break
							case 3 :
								if(!this.checkRepeat(this.userDegree['3'], obj.userid)) {
									this.UserCount ++;
									this.userDegree['3'].push(obj);
								}
								break
							case 2 :
								if(!this.checkRepeat(this.userDegree['2'], obj.userid)) {
									this.UserCount ++;
									this.userDegree['2'].push(obj);
								}
								break
							case 1 :
								if(!this.checkRepeat(this.userDegree['1'], obj.userid)) {
									this.UserCount ++;
									this.userDegree['1'].push(obj);
								}
								break	
						}
					} else if(obj.flag === 2){
						if(!this.checkRepeat(this.manageList, obj.userid)) {
							this.manageList.push(obj);
						}
					}
				}
				
				console.log(this.userDegree)
			},
			checkBeen(arr, item) {
				for(let i=0; i<arr.length; i++) {
					if(item === arr[i].userid) {
						arr.splice(i, 1);
						return true						
					}
					return false
				}
				console.log(arr)
			},
			checkRepeat(arr, item) {
				for(let i=0; i<arr.length; i++) {
					if(item === arr[i].userid) {
						return true
					} else {
						return false
					}
				}
			},
			broadcastInfo() {
				this.$store.commit('SET_INFO', true);
			},
			choseTab(item){
				this.tabNav = item;
			},
			openMenu(item,e) {
				console.log(item)
				let tip = this.$store.state.userInfo.userflag;
				if(tip-0 === 2) {
					this.isPreventChat = true;
				} else if(tip-0 === 1) {
					if(item.flag-0 === 2) {
						this.isPreventChat = true;
					} else {
						return false;	
					}
				}
				if(item.userid == this.userInfo.userid){
					this.isMe = true;
				}else{
					this.isMe = false;
				}
				this.visible = true;
				this.selectedMenu = item;
				const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
			    this.left = e.clientX - offsetLeft + 15; // 15: margin right
			    this.top = e.clientY;
			},
			closeMenu(){
				this.visible = false;
			},
			getUserList(info) {//获取用户列表
				var that = this;
				for(let i in this.userDegree) {
					this.userDegree[i].splice(0);
				}
				User.getList().then(response =>{
					const data = response.data;
					var temp = data;
					var manaeeTemp = [];
					console.log(data);
					let uid = this.$store.state.userInfo.userid;
					let short = 0;
					// if(info) {
					// 	let tip = {
					// 		userid: info.userid,
					// 		user_degree: info.userdegree,
					// 		nickname: info.nickname,
					// 		grade: Util.isNull(info.userdegree) ? 0 : info.userdegree,
					// 		avatar: info.headimage,
					// 	}
					// 	this.userDegree[info.userdegree].push(tip);
					// }
					data.forEach(item =>{
						//debugger
						short++;
						if(item.user_id === uid) {
							data.splice(short, 1);
							return
						} else {
							if(item.user_id !== that.userInfo.userid && item.user_flag == 1){
								const obj = {
									userid: item.user_id,
									flag: item.user_flag,
									user_degree: item.user_degree,
									nickname: item.nickname,
									grade: Util.isNull(item.user_degree) ? 0 : item.user_degree,
									avatar: (item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.gif' :item.head_image,
									sessionid: item.sessionid
								};
								
								var isRepeat = true;
								temp.forEach(tempItem=> {
									if(tempItem.userid == item.user_id) {
										isRepeat = false;
									}
								});
								if(isRepeat) {
									// temp.push(obj);
									switch (obj.user_degree-0) {
										case 6 :
											this.userDegree['6'].push(obj);
											break
										case 5 :
											this.userDegree['5'].push(obj);
											break
										case 4 :
											this.userDegree['4'].push(obj);
											break
										case 3 :
											this.userDegree['3'].push(obj);
											break
										case 2 :
											this.userDegree['2'].push(obj);
											break
										case 1 :
											this.userDegree['1'].push(obj);
											break	
										case 0 :
											this.userDegree['0'].push(obj);
											break
									}
								}							
							} 
							else if(item.user_flag === '2') {
								const obj = {
									userid:item.user_id,
									nickname:item.nickname,
									flag:item.user_flag,
									avatar:(item.head_image == 0 || Util.isNull(item.head_image)) ? 'default.gif' :item.head_image
								};
								var isRepeat = true;
								manaeeTemp.forEach(tempItem=> {
									if(tempItem.userid == item.user_id){
										isRepeat = false;
									}
								});
								if(isRepeat){
									manaeeTemp.push(obj);
								}
							}
						}
						
					});
					that.OnLineUserList = temp;
					that.tempOnLineUserList = temp;
					let num = Constants.isLogin?1:0;
					// for(let j=0; j<that.OnLineUserList.length; j++) {
					// 	if(that.OnLineUserList[j].user_degree > 0) {
					// 		num++
					// 	}
					// }
					that.UserCount = data.length + num;
					that.manageList = manaeeTemp;
				});
			},
			search(){
				console.log(111)
				if(Util.isNull(this.searchtxt)){
					return false
				}else{
					var searchData = [];
					
					this.isSearch =false
					// this.OnLineUserList.forEach(item =>{
					// 	if(!item.nickname) {
							
					// 	}
					// 	if(item.nickname.indexOf(this.searchtxt) > -1){
					// 		searchData.push(item);
					// 	}
					// });
					for(let i=0; i<this.manageList.length; i++) {
						if(this.manageList[i].nickname.indexOf(this.searchtxt) > -1) {
							searchData.push(this.manageList[i]);
							this.isSearch =false
						}
					}
					for(let i=0; i<6; i++) {
						for(let j=0; j<this.userDegree[i].length; j++) {
							if(this.userDegree[i][j].nickname.indexOf(this.searchtxt) > -1) {
								searchData.push(this.userDegree[i][j]);
								this.isSearch =false
							}
						}
					}
					this.searchList = searchData;
					console.log(this.userDegree[5]);
				}
			},
			RedRuleClick(){
				this.redRuleModal = true;
			},
			SigninRuleClick(){
				this.signinRuleModal = true;
			},
			privateChat(){
				if(!Constants.isLogin){
					this.$toast.center('没有发言权限！','center');
					return;
				}
				if(this.userInfo.userFlag == 1){
					if(this.userInfo.userdegree < 3){
						this.$toast.center('没有私聊权限！','center');
						return;
					}
				}
				
				var selectData = {
					privateUser:this.selectedMenu,
					currentUser:this.userInfo
				}
				this.$root.eventHub.$emit("PrivateChatEvent",selectData);
			},
			selectInfo(){
				if(!Constants.isLogin){
					this.$toast.center('没有用户资料查看权限！','center');
					return;
				}
				if(this.userInfo.userFlag == 1){
					if(this.userInfo.userdegree < 3){
						this.$toast.center('没有用户资料查看权限！','center');
						return;
					}
				}
				this.$emit('numbersInfo', true);
				if(!this.selectedMenu.userid) {
					this.$Message.error('无法查看游客的资料');
					return false
				} else {
					User.getNumberInfo(this.selectedMenu.userid).then(
							res => {
								this.numbersInfo.nickname = res.data.nickname;
								this.numbersInfo.headImage = res.data.headImage;
								this.numbersInfo.selfIntroduction = res.data.selfIntroduction;
								this.numbersInfo.gender = res.data.gender;
								this.isNumbersInfo = true;
							}
						)
				}
			}
		}
	}
</script>