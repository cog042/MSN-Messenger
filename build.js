// set env first
process.env.NODE_ENV = 'production'

// then import webpack
var webpack = require('webpack')
var config = require('./webpack.config').default
var fs = require('fs')

// console.log(server)
let tasks = [config].map((x,i) => new Promise((res, rej) => {
  webpack(x).run((err,stats) =>
    err ? rej(err) : [
      fs.writeFileSync(`./assets/build/stats-${i}.json`, JSON.stringify(stats.toJson())),
      res()
    ])
}))

Promise
  .all(tasks)
  .catch(e => console.log(e))