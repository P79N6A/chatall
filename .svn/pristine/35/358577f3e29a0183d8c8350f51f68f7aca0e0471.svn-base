'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/api"',
  SOCKET_ADDRESS:'"ws://10.10.17.70:8002/ws/websocket"'
})
