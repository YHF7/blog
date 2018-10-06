/*
 * @Author: yhf 
 * @Date: 2018-10-06 10:35:08 
 * @Last Modified by: yhf
 * @Last Modified time: 2018-10-06 15:20:17
 */
/**
 * user.js 模型设计
 * 职责：
 *   创建模型
 *   做一些服务相关配置
 *   mongoose 插件
 *   配置数据结构类型
 *   导出模型
 */

// 1. 引入模块
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 2.连接数据库
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
});

// 3. new Schema 在里面配置数据结构类型
let userSchema = new Schema({
    email: {// 邮箱
        type: String,//字符串类型
        required: true//必须填写
    },
    nickname: {// 名称
        type: String,
        required: true
    },
    password: {// 密码
        type: String,
        required: true
    },
    created_time: {// 创建时间
        type: Date,//Date数据
        // 注意： 这里不要写 Date.now()因为会即刻调用
        // 这里直接给了一个方法： Date.now 
        // 当你去new Model 的时候，如果没有传递 create_time ，则 mongoose 就会调用 default 指定的 Date.now 方法作为返回值
        default: Date.now
    },
    last_modified_time: {// 最后修改的时间
        type: Date,
        default: Date.now
    },
    avatar: {// 头像
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {// 个人简介
        type: String,
        default: ''
    },
    gender: {// 性别
        type: Number,//数字类型
        enum: [-1,0,1],
        default: -1
    },
    birthday: {// 生日
        type: Date//Date数据
    },
    status: {
        type: Number,
        // 0没有权限限制
        // 1 不可以评论
        // 2 不可以登录
        enum: [0,1,2],
        default: 0
    }
})

// 4. 直接导出model
module.exports = mongoose.model('User', userSchema);