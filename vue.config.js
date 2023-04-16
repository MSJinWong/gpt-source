const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:"./",
  outputDir:"dist",
  assetsDir:"static",
  devServer: {
    port: 9527,
    open: true,
    proxy: {
      '/api': {
        target: 'http://47.103.169.242:8081', // 后端接口的域名
        changeOrigin: true,
        pathRewrite:{
          '^/api':""
        },
      }
    }
  },
  lintOnSave:false,
})
