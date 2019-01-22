import request from '@/utils/request'

var Detect = {

	getList(params) {
		return request({
		    url: '/manage/detect/list',
		    method: 'get',
		    params
		})
	},
	getDetect(params){
		return request({
		    url: '/manage/detect/request',
		    method: 'get',
		    params
		})
	}
}

export default Detect;