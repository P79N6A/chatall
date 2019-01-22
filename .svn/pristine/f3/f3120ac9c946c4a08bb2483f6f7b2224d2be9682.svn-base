<template>
	<div>
		<Modal class="private-chat-modal" :mask="false" draggable v-model="privateChatModal" footer-hide width='500px'>
			<div slot="header">
				<Icon type="ios-chatbubbles" size="16"/> {{privateUser.nickname}}
			</div>
			<div class="message-box">
				<el-scrollbar id="privateChatScroll" :native="false" wrap-style="max-height:250px;">
					<div class="message-items">
						<div class="message-item " :class="[item.userid==currentUser.userid?'mechat':'notmine']" v-for="item in messageList">
							<div class="avatar">
								<img :src="imgUrl+'images/avatar/'+item.avatar">
							</div>
							<div class="chat-info">
								<div class="chat-info-1" v-if="item.userid==currentUser.userid">
									<span class="chat-time">{{item.time|dateFormat('hh:mm:ss')}}</span>
									<span class="chat-name">{{item.nickname}}</span>
								</div>
								<div class="chat-info-1" v-else>
									<span class="chat-name">{{item.nickname}}</span>
									<span class="chat-time">{{item.time|dateFormat('hh:mm:ss')}}</span>
								</div>
								<div class="chat-info-2">
									<div class="chat-msg" v-html="item.message"></div>
								</div>
							</div>
						</div>
					</div>
				
				</el-scrollbar>
			</div>
			<div class="chatbtns">
				<div>
					<Dropdown trigger="custom" :visible="visibleFace" placement="top-start" transfer>
						<a href="javascript:void(0)" class="btn b1" title="表情" @click="FaceOpenClick"></a>
						<DropdownMenu slot="list">
							<Face @defaultFaceChange="defaultFaceClick" @sprayFaceChange="sprayFaceClick"></Face>
						</DropdownMenu>
					</Dropdown>
				</div>
				<Dropdown trigger="click" placement="top-start" transfer @on-click="FaceBarClick">
					<a href="javascript:void(0)" class="btn b2" title="表情条"></a>
					<DropdownMenu slot="list">
			            <DropdownItem name="dyg">顶一个</DropdownItem>
			            <DropdownItem name="zyg">赞一个</DropdownItem>
			            <DropdownItem name="geili">给力</DropdownItem>
			            <DropdownItem name="zs">掌声</DropdownItem>
			            <DropdownItem name="xh">鲜花</DropdownItem>
			        </DropdownMenu>
				</Dropdown>
				<div><a href="javascript:void(0)" class="btn b3" title="赞" @click="GoodClick"></a></div>
				<div><a href="javascript:void(0)" class="btn b4" title="玫瑰" @click="FlowerClick"></a></div>
				<div>
					<Upload multiple action="//jsonplaceholder.typicode.com/posts/">
						<a href="javascript:void(0)" class="btn b5" title="上传图片"></a>
					</Upload>
				</div>
			</div>
			<div class="msssage-control">
				<Editdiv v-model="privateMessage" id="privateChat"></Editdiv>
				<div class="sendBtn" @click="sendClick"><Icon type="ios-send"/>发送</div>
			</div>
		</Modal>
	</div>
</template>
<script>
	import Constants from '@/utils/constants'
	import Util from '@/utils/util'
	import Face from '@/components/face.vue'
	import Editdiv from '@/components/editdiv.vue'
	export default {
		name:"PrivateChat",
		components:{
			Face,
			Editdiv
		},
		data(){
			return {
				imgUrl: Constants.staticUrl,
				privateChatModal:false,
				privateUser:{
					userid:null,
					nickname:'',
					avatar:''
				},
				currentUser:null,
				visibleFace:false,
				privateMessage:null,
				messageList:[

				]
			}
		},
		watch:{
			visibleFace(value){
  				if (value) {
			        document.body.addEventListener('click', this.closeFace)
			    } else {
			        document.body.removeEventListener('click', this.closeFace)
			    }
  			}
		},
		mounted(){
			var that = this;
			this.$root.eventHub.$on("PrivateChatEvent",item=>{
				that.privateUser = item.privateUser;
				that.currentUser = item.currentUser;
				that.messageList = [];
				that.privateChatModal = true;

			});
			//接收消息事件发布
			this.$root.eventHub.$on("PrivateChatReceiveEvent",item=>{
				that.currentUser = this.$store.state.userInfo;
				that.messageList.push(item.messageItem);
				that.privateUser = item.privateUser;
				that.privateChatModal = true;
				setTimeout(()=>{
	      			that.privateChatScrollToBottom();
	      		},200);
			});
			//消息发送完成事件
			this.$root.eventHub.$on("PrivateChatSendCompletedEvent",item =>{
				that.messageList.push(item);
				setTimeout(()=>{
	      			that.privateChatScrollToBottom();
	      		},200);
	      		that.privateMessage = null;
	      		that.$root.eventHub.$emit("clearDivEvent","privateChat");
			});
		},
		computed:{

		},
		methods:{
			privateChatScrollToBottom(){
				var div = document.getElementById('privateChatScroll')
             	div.scrollTop = div.scrollHeight;
			},
			FaceBarClick(name){
				if(name == 'geili'){
					var facestr = '<img src="'+this.imgUrl+'images/face/s1.gif" isface>';
						facestr += '<img src="'+this.imgUrl+'images/face/s1.gif" isface>';
						facestr += '<img src="'+this.imgUrl+'images/face/s6.gif" isface>';
						facestr += '<img src="'+this.imgUrl+'images/face/s6.gif" isface>';
						facestr += '<img src="'+this.imgUrl+'images/face/geili_thumb.gif" isface>';
						facestr += '<img src="'+this.imgUrl+'images/face/geili_thumb.gif" isface>';
						facestr += '<img src="'+this.imgUrl+'images/face/s0.gif" isface>';
						facestr += '<img src="'+this.imgUrl+'images/face/s0.gif" isface>';
					 if(Util.isNull(this.privateMessage)){
					 	this.privateMessage = facestr;
					 }else{
					 	this.privateMessage += facestr;
					 }
					 var that = this;
					 this.$root.eventHub.$emit("inputDivEvent",{
						id:'privateChat',
						message:that.privateMessage
					 });
				}else{
					var facestr = '<img src="'+this.imgUrl+'images/face/'+name+'.gif" isface>';
					if(Util.isNull(this.privateMessage)){
						this.privateMessage = facestr;
					}else{
						this.privateMessage += facestr;
					}
					var that = this;
					 this.$root.eventHub.$emit("inputDivEvent",{
						id:'privateChat',
						message:that.privateMessage
					 });
				}
			},
			FaceOpenClick(){
				this.visibleFace = true;
			},
			FlowerClick(){
				//插入玫瑰表情
				var flower = '<img src="'+this.imgUrl+'images/face/flower.gif" isface>';
				if(Util.isNull(this.privateMessage)){
					this.privateMessage =  flower;
				}else{
					this.privateMessage +=  flower;
				}
				var that = this;
				 this.$root.eventHub.$emit("inputDivEvent",{
					id:'privateChat',
					message:that.privateMessage
				 });
				
			},
			GoodClick(){
				var good = '<img src="'+this.imgUrl+'images/face/good.gif" isface>';
				if(Util.isNull(this.privateMessage)){
					this.privateMessage = good;
				}else{
					this.privateMessage += good;
				}
				var that = this;
				 this.$root.eventHub.$emit("inputDivEvent",{
					id:'privateChat',
					message:that.privateMessage
				 });
			},
			closeFace(e){
				var t = e.target;
				if(t.id !== 'tab-spray' && t.id !=='tab-default'){
					this.visibleFace = false;
				}
			},
			defaultFaceClick(val){
				var facestr = '<img src="'+this.imgUrl+'images/face/default/'+val+'.gif" isface>';
				if(Util.isNull(this.privateMessage)){
					this.privateMessage = facestr;
				}else{
					this.privateMessage += facestr;
				}
				this.visibleFace = false;
				var that = this;
				 this.$root.eventHub.$emit("inputDivEvent",{
					id:'privateChat',
					message:that.privateMessage
				 });
			},
			sprayFaceClick(val){
				var facestr = '<img src="'+this.imgUrl+'images/face/spray/'+val+'.gif" isface>';
				if(Util.isNull(this.privateMessage)){
					this.privateMessage = facestr;
				}else{
					this.privateMessage += facestr;
				}
				this.visibleFace = false;
				var that = this;
				 this.$root.eventHub.$emit("inputDivEvent",{
					id:'privateChat',
					message:that.privateMessage
				 });
			},
			sendClick(){
				if(!this.$root.isSocketConnect){
					this.$Modal.error({
			            title: '错误提示',
			            content: '网络异常与服务器连接已断开。'
			        });
			        return;
				}
				if(Util.isNull(this.privateMessage)){
					this.$toast.center('发送内容不能为空，请输入！','center');
					return;
				}
				var jsonMessage = {
					type:'message',
					mtype:'user',
					touserid:this.privateUser.userid,
					tousernickname:this.privateUser.nickname,
					touserheadimage:this.privateUser.avatar,
					fromuserid:this.currentUser.userid,
					fromuserheadimage:this.currentUser.headimage,
					fromuseruserflag:this.currentUser.userflag,
					fromuseruserdegree:this.currentUser.userdegree,
					fromnickname:this.currentUser.nickname,
					content:{
						id:0,
						msg:this.privateMessage
					}
				}
				this.$root.sendToUser(jsonMessage);
			}
		}

	}
</script>