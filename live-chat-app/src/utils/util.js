import Constants from '@/utils/constants'
var Util = {
	makeJson(data) {
		return JSON.stringify(data)
	},
	getStorage(key){//获取html5本地缓存
		return window.localStorage.getItem(key)
	},
	setStorage(key,data){//设置html5本地缓存
		if(typeof data === 'object'){
			data = JSON.stringify(data);
		}
		window.localStorage.setItem(key,data)
	},
	isEmpty(obj){//检查对象为空
		for(var key in obj){
			return false;
		}
		return true;
	},
	isNotEmpty(obj){//检查对象不为空
		for(var key in obj){
			return true;
		}
		return false;
	},
	isNull(value){//检查字符串为空
		if(value == null || value == undefined || value =='' || value.length <= 0) {
			return true;
		}
		return false;
	},
	dateFormat(tmp, fmt){//日期格式化
		var date = null;
		if(!tmp){
			return "";
		}
		if(tmp instanceof Date){
			date = tmp;
		}else if(typeof tmp == 'string'||typeof tmp == 'number'){
			date = new Date(tmp);
		}else{
			return "";
		}
		if(date =="Invalid Date"){
			var aaa = tmp.replace(/-/g,"/");
			date = new Date(aaa);
		}
		if(/(y+)/.test(fmt)){
			fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
		}
		var o ={
	        "M+" : date.getMonth()+1,                 //月份
	        "d+" : date.getDate(),                    //日
	        "h+" : date.getHours(),                   //小时
	        "m+" : date.getMinutes(),                  //分
	        "s+" : date.getSeconds(),                 //秒
	        "q+" : Math.floor((date.getMonth()+3)/3), //季度
	        "S"  : date.getMilliseconds()             //毫秒
      	};
      	for(var k in o){
      		if(new RegExp("("+ k +")").test(fmt)){
      			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      		}
      	}
      	return fmt;
	},
	toFixed(val){
  		return "" != val && void 0 != val || (val = "0.00"),isNaN(val) ? "number" == typeof val ? "0.00": -1 != val.indexOf("*") ? val : "0.00": val == Number.MAX_VALUE ? "0.00": "number" != typeof val ? val: Math.floor(100 * Number(val)) / 100
  	},
	  messageFilter(val){//消息表情过滤替换
  		var regex = /\[(.+?)\]/g;// [] 中括号
  		var fs = val.msg.match(regex);//提取[]数据返回数组
  		if(Util.isNull(fs)){
  			return val;
  		}
  		var newval = val.msg;
  		for(var i=0;i < fs.length;i++){
  			let faceObj = Constants.faceList.filter(item=>{
				return item.datatxt === fs[i];
			});
			if(!Util.isNull(faceObj)){
				var img = `<img src="`+Constants.staticUrl+`images/face/`+faceObj[0].type+`/`+faceObj[0].images+`">`;
  				newval = newval.replace(fs[i],img);
			}
  		}
  		return val;
  	}
}

export default Util;