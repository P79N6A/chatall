import request from '@/utils/request'
import Constants from '@/utils/constants'

const getList = function(item) {
    return request({
        url: Constants.lskjapi[item]
    })
}

export default getList