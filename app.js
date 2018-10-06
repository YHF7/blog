/*
 * @Author: yhf 
 * @Date: 2018-10-05 13:33:57 
 * @Last Modified by: yhf
 * @Last Modified time: 2018-10-06 10:38:05
 */

/**
 * app.js 入门模块
 * 职责：
 *   创建服务
 *   做一些服务相关配置
 *     前端开发模块
 *     模板引擎
 *     body-parser 解析表单 post 请求体
 *     提供静态资源服务
 *   挂载路由
 *   监听端口启动服务
 */

// 1.引入模块
// 前端开发模块
const express = require('express');
// 中间件 解析 post 请求体
const bodyParser = require('body-parser');
// 路径处理
const path = require('path');
// 路由处理
const router = require('./router')

// 2.创建服务
const app = express();

// 3.配置模块/公共资源
// 公共资源
app.use('/public', express.static(path.join(__dirname, './public/')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')));

// 在 node 中，有很多第三方模版引擎都可以使用，不是只有 art-templat
// ejs \ jade(pug) \ handlebars \ nunjucks
// 模版引擎
app.engine('html', require('express-art-template'));
// 模版引擎默认地址 ./views
app.set('views', path.join(__dirname, './views/'));

// 配置解析表单 POST 请求体插件 （注意：一定要在 app.use(router) 之前）
// parse application/x-www-form-urlencoded 解析application
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json 解析
app.use(bodyParser.json());


// 4.挂载路由 (把路由挂载到 app 中)
app.use(router);


// 5.启动服务
app.listen(3000, function () {
    console.log('http://localhost:3000');
})