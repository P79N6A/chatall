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
            // responseType: 'arraybuffer',
            // transformResponse(data) {
            //     return new Uint8Array(data)
            // }
        })
    }
}

export default reg