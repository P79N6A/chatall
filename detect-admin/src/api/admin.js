import request from '@/utils/request'
var Admin = {
	getList(params) {
	  return request({
	    url: '/manage/system/list',
	    method: 'get',
	    params:params
	  })
	},
	delete(inId) {
		return request({
		    url: '/manage/system/del',
		    method: 'post',
		    data:{
		    	inId
		    }
		})
	},
	add(data){
		return request({
		    url: '/manage/system/add',
		    method: 'post',
		    data
		})
	},
	update(data){
		return request({
		    url: '/manage/system/update',
		    method: 'post',
		    data
		})
	}
}
export default Admin;