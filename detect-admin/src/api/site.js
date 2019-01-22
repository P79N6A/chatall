import request from '@/utils/request'

var Site = {

	getList(params) {
		return request({
		    url: '/manage/site/list',
		    method: 'get',
		    params
		})
	},
	delete(inId) {
		return request({
		    url: '/manage/site/del',
		    method: 'post',
		    data:{
		    	inId
		    }
		})
	},
	add(data){
		return request({
		    url: '/manage/site/add',
		    method: 'post',
		    data
		})
	},
	update(data){
		return request({
		    url: '/manage/site/update',
		    method: 'post',
		    data
		})
	}
}

export default Site;