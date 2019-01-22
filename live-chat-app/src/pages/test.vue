<template>
	<div id="test">
		<Poptip trigger="hover" placement="top-start">
	        <Button>Hover</Button>
	        <div slot="content">
	        	sadasdas
	        </div>
	    </Poptip>
		<Button type="info" @click="clicks">Info</Button>
		<h2>list:</h2>
	  	<el-scrollbar id="asdas" wrap-class="list" wrap-style="color: red;" view-style="font-weight: bold;" view-class="view-box" :native="false">
		    <div v-for="va in num" :key="va">
		      {{va}}
		    </div>
	  	</el-scrollbar>
	</div>
</template>
<script>
	export default{
		name: 'test',
		data(){
			return {
				num:36,
				moveX:50
			}
		},
		computed:{

  		},
		mounted(){
			this.scrollToBottom();
		},
		methods:{
			clicks(){
				this.num += 1;
			},
			scrollToBottom(){
				this.$nextTick(() => {
             		var div = document.getElementById('asdas')
             		div.scrollTop = div.scrollHeight;
     			});
			},
		}
	}
</script>