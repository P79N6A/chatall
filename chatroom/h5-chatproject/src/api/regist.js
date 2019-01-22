import request from '@/utils/request'

const reg = {
    registUser(data) {
        return request({
            url: '/register',
            method: 'post',
            data
        })
    },
    getRegistCode() {
        return request({
            url: '/getCode',
            method: 'get',
        })
    }
}

export default reg