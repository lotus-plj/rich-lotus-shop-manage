// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave:false
// })
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}



module.exports = {

  productionSourceMap: false,// 生产环境是否要生成 sourceMap

  publicPath: './',  //   部署应用包时的基本 URL

  outputDir: 'dist',  //   打包时输出的文件目录

  assetsDir: 'assets',  //   放置静态文件夹目录

// dev环境下，webpack-dev-server 相关配置
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: "localhost",
    port: 81, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置后自动启动浏览器
    hotOnly: true, // 热更新
    proxy: 'http://localhost:9999'   // 配置跨域处理,只有一个代理
    // proxy: { //配置多个代理
    //   "/testIp": {
    //     target: "http://192.168.1.88:666",
    //     changeOrigin: true,
    //     ws: true,//websocket支持
    //     secure: false,
    //     pathRewrite: {
    //       "^/testIp": "/"
    //     }
    //   },
    //   // "/elseIp": {
    //   //   target: "http://197.0.0.2:8088",
    //   //   changeOrigin: true,
    //   //   //ws: true,//websocket支持
    //   //   secure: false,
    //   //   pathRewrite: {
    //   //     "^/elseIp": "/"
    //   //   }
    //   // },
    // }
  },

  lintOnSave: false,//是否在开发环境下每次保存代码时都启用 eslint验证

  css:{},// css的处理

  chainWebpack:config=>{}, //vue-cli内部的webpack配置

  pluginOptions:{},// 可以用来传递任何第三方插件选项

}
