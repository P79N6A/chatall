import request from '@/utils/request'


const subPwd = function(data) {
    return request({
        url: '/userInfo/updatePassword',
        method: 'post',
        data
    })
}

export default subPwd