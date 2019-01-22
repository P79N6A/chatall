'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/api"',
  SOCKET_ADDRESS:'"ws://api.9935333.com/ws/websocket"'
})
