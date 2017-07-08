var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  proxy: {
    '/api': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      },
    "/_ah" : {
      "target": "http://localhost:8080",
      "secure": false,
      "loglevel": "debug",
      "changeOrigin": true
      }
    }
})
