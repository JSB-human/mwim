// const {createProxyMiddleware} = require('http-proxy-middleware')

// module.exports = function(app){
//     app.use(
//         createProxyMiddleware('/naver_book',{
//             target : 'https://openapi.naver.com/v1/search/book.json',
//             changeOrigin : true
//         })
//     )

//     app.use(
//         createProxyMiddleware('/spring',{
//             target : "http://localhost:8080/",
//             changeOrigin : true
//         })
//     )
// }