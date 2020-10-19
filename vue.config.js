// Axios跨域代理配置
// module.exports = {
//   devServer: {
//     proxy: {
//       "/api": {
//         // 使用"/api"来代替"http://f.apiplus.c"
//         // target: 'http://192.168.0.102:8080', // 源地址
//         target: "http://192.168.43.48:8080/user/regit", // 源地址
//         changeOrigin: true, // 改变源
//         pathRewrite: {
//           "^/api": ""// 路径重写
//         }
//       }
//     }
//   }
//}
module.exports = {
  lintOnSave: false
}