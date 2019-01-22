<template>
	<div v-if="item.type=='red'" class="message-wrap">
		<div class="redbag-info1">
			<p style="color:#333;">{{item.grabnickname}} 领取了 <span style="color:red;">{{item.nickname}}</span> 的红包获得 <span style="color:red;">{{item.context}}元</span></p>
		</div>
		
	</div>
	<div v-else-if="item.type=='message'" class="message-first message-last message-tail message" :class="[item.senttype=='sent'?'message-sent':'message-received',item.mtype=='system'?'message-system':'',item.mtype=='customer'?'message-teacher':'',item.mtype=='manage'?'message-manage':'']">
		<div class="message-avatar" :style="'background:url('+imgUrl+'images/avatar/'+item.avatar+');background-size:cover;background-position:center;'"></div>
		<div class="message-content">
			<div class="message-name">{{item.nickname}} {{item.time|dateFormat('hh:mm:ss')}}</div>
			<div class="message-bubble">
				<div class="message-text" v-html="item.context"></div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import Constants from '@/utils/constants'
	import Util from '@/utils/util'
	export default {
		name:"f8-message",
		props: ['item'],
		data(){
            return {
            	chatUrl:Constants.chatUrl,
      			imgUrl:Constants.staticUrl
            }
        },
        watch:{

		},
		mounted(){

		},
		computed:{

		},
		methods:{

		}
	}
</script>