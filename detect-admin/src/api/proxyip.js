import request from '@/utils/request'

var ProxyIp = {
	getList(params) {
		return request({
		    url: '/manage/proxy/list',
		    method: 'get',
		    params
		})
	},
	delete(inId) {
		return request({
		    url: '/manage/proxy/del',
		    method: 'post',
		    data:{
		    	inId
		    }
		})
	},
	add(data){
		return request({
		    url: '/manage/proxy/add',
		    method: 'post',
		    data
		})
	},
	update(data){
		return request({
		    url: '/manage/proxy/update',
		    method: 'post',
		    data
		})
	}
}

export default ProxyIp;