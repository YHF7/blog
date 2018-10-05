/*
 * @Author: yhf 
 * @Date: 2018-10-05 13:33:57 
 * @Last Modified by: yhf
 * @Last Modified time: 2018-10-05 13:39:11
 */


// 1.引入模块
const express = require('express');
const path = require('path');

// 2.创建服务
const app = express();

// 3.配置模块/公共资源
app.use('/public', express.static(path.join(__dirname, './public/')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')));

// 4.挂载路由
app.get('/', function (req, res) {
    res.send('hello wrold');
})

// 5.启动服务
app.listen(3000, function () {
    console.log('http://localhost:3000');
})