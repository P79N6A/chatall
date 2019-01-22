import request from '@/utils/request'
const planName = [
	'bjsc',
	'cqssc',
	'jsks'
]

const getPlan = function (data) {
		return request({
			url: '/recommendPlan?code='+data,
		})
    }
export default getPlan