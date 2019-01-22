var Tools = {
	dateFormat(tmp, fmt) {
      var date = null;
      if(!tmp){
        return "";
      }
      if(tmp instanceof Date){
        date = tmp;
      }else if(typeof tmp == "string"||typeof tmp == "number"){
        date = new Date(tmp);
      }else{
        return "";
      }
      if(date =="Invalid Date"){
        var aaa = tmp.replace(/-/g,"/");
        date = new Date(aaa);
      }
      if(!fmt){
        fmt = "yyyy-MM-dd";
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
  isEmpty(obj){
    for(var key in obj){
      return false;
    }
    return true;
  }
}

export default Tools;