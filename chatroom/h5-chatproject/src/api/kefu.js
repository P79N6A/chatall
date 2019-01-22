import request from '@/utils/request'

var kefu = {
	getQQ(){
		return request({
		    url: '/getCustomerInfo',
		    method: 'get'
	  	});
	},
}
export default kefu;