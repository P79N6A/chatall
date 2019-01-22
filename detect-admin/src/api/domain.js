import request from '@/utils/request'

var Domain = {
	getList(params) {
		return request({
		    url: '/manage/domain/list',
		    method: 'get',
		    params:params
		})
	},
	getSiteList(){// 获取站点列表
		return request({
		    url: '/manage/domain/site/list',
		    method: 'get'
		})
	},
	getDetectList(params){// 获取域名检测数据
		return request({
		    url: '/manage/domain/detect/list',
		    method: 'get',
		    params
		})
	},
	delete(inId) {
		return request({
		    url: '/manage/domain/del',
		    method: 'post',
		    data:{
		    	inId
		    }
		})
	},
	add(data){
		return request({
		    url: '/manage/domain/add',
		    method: 'post',
		    data
		})
	},
	addBatch(data){
		return request({
		    url: '/manage/domain/batch/add',
		    method: 'post',
		    data
		})
	},
	update(data){
		return request({
		    url: '/manage/domain/update',
		    method: 'post',
		    data
		})
	}
}

export default Domain;