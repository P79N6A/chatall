import request from '@/utils/request'
import Constants from '@/utils/constants'

const kj = {
    bjsckj() {
        return request({
            url: Constants.kjjlApi[0],
            method: 'get'
        })
    },
    cqssc() {
        return request({
            url: Constants.kjjlApi[1],
            method: 'get'
        })
    },
}

export default kj