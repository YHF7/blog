/*
 * @Author: yhf 
 * @Date: 2018-10-06 10:05:16 
 * @Last Modified by: yhf
 * @Last Modified time: 2018-10-06 15:29:17
 */

// 1.引入模块
// 前端开发模块
const express = require('express');
// 连接数据库进行数据操作
let User = require('./models/user');
// 密码加密插件
const md5 = require('blueimp-md5');

// 2.路由存储
const router = express.Router();

// 3.路由处理
// 主页
router.get('/', function (req, res) {
    res.render('index.html');
})

// 渲染登录页面
router.get('/login', function (req, res) {
    res.render('login.html');
})

// 登录业务处理
router.post('/login', function (req, res) {
    // res.render('index.html');
})

// 渲染注册页面
router.get('/register', function (req, res) {
    res.render('register.html');
})

// 注册业务处理
router.post('/register', function (req, res) {
    // 1. 获取表单提交的数据
    //      req.body
    // 2. 操作数据库
    //      判断用户是否存在
    //      如果存在，不允许注册
    //      不存在，注册新建
    // 3. 发送响应

    let body = req.body;
    User.findOne({
        $or: [{
            email: body.email
        }, {
            nickname: body.nickname
        }]
    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                err_code: 500,//状态码
                message: 'Internal error.'//状态错误解释
            });
        }
        if (data) {
            // 邮箱或者昵称已存在
            return res.status(200).json({
                err_code: 1,
                message: 'email or nickname aleady exists.'
            });
        }

        // 对密码进行 md5 重复加密
        body.password = md5(md5(md5(body.password)));
        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error.'
                });
            }
            // Express 提供了一个响应方法：json
            // 该方法接收一个对象作为参数，他会自动帮你把对象转为字符串在发送给浏览器
            res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        })
    })
})

// 4.导出路由处理
module.exports = router;