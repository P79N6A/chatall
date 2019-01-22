import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/ibasic/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/ibasic/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/ibasic/logout',
    method: 'post'
  })
}
