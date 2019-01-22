import request from '@/utils/request'

var Notice = {
	getList(params) {
		return request({
		    url: '/manage/message/list',
		    method: 'get',
		    params
		})
	},
	delete(inId) {
		return request({
		    url: '/manage/message/del',
		    method: 'post',
		    data:{
		    	inId
		    }
		})
	},
	add(data){
		return request({
		    url: '/manage/message/add',
		    method: 'post',
		    data
		})
	},
	update(data){
		return request({
		    url: '/manage/message/update',
		    method: 'post',
		    data
		})
	}
}

export default Notice;