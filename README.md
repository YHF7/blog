# 多人社区登录注册案例

# 一、目录结构

1. app.js 入口
2. controllers
3. models 数据模型存储(数据库)
   - user.js 数据库主体
4. node_modules 第三方包
5. package.json 包描述文件
6. package-lock.json 第三方包版本锁定文件（npm 5 以后才有）
7. public 公共静态资源
8. README.md 项目说明文件
9. routes 路由业务分类（如果业务比较多，代码量大，最好把路由按照业务分类存储）
   - 未使用路由库 单独使用 router.js 简单一点把所有大路由都放在里面
10. 页面（views 视觉存储目录）
    - 主页 index.html
    - 登陆页 login.html
    - 注册页 register.html
    - \_partials 固定页面的存放
      - 固定底部 footer.html
      - 固定导航栏 settings-nav.html
      - 固定头部 header.htms
    - \_layouts 模板页存放
      - 模板布局 home.htmls
    - settings 个人设置存放
      - 修改密码 admin.html
      - 个人简介 profile.html
    - topic 博客创建与显示
      - 创建博客 new.html
      - 显示博客 show.html

# 二、模板页面

- [art-template 子模板](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E5%AD%90%E6%A8%A1%E6%9D%BF "子模板")
- [art-template 模板继承](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF "模板继承")

# 三、路由设计

| 路径      | 方法 | get 参数 | post 参数                 | 是否需要登陆权限 | 备注         |
| --------- | ---- | -------- | ------------------------- | ---------------- | ------------ |
| /         | GET  |          |                           |                  | 渲染首页     |
| /register | GET  |          |                           |                  | 渲染注册页面 |
| /register | POST |          | email、nickname、password |                  | 处理注册请求 |
| /login    | GET  |          |                           |                  | 渲染登录页面 |
| /login    | POST |          | email、password           |                  | 处理登录请求 |
| /logout   | GET  |          |                           |                  | 处理退出请求 |

# 四、模型设计

# 五、功能实现

# 六、书写步骤

1. 创建目录结构
2. 整合静态页面-模板页
   - include
   - block
   - extend
3. 设计用户登录、退出、注册的路由
4. 用户注册
   - 先处理好客户页面的内容（表单控件的 name、收集表单数据、发起请求）
   - 服务端
     - 获取客户端表单请求的数据
     - 操作数据库
       - 如果有错，发送 500 告诉客户端服务错了
       - 其他的根据你的业务发送不同的响应数据
5. 用户登录
6. 用户退出

# 七、插件安装使用

- 模块
  - express 前端 web 模块
  - path 路径核心模块
  - art-template 模版引擎（express-art-template 的依赖所以必须安装）
  - express-art-template 模版引擎 (视觉效果模板 子模板 模板继承)
  - body-parser 中间件(解析表单 post 请求体)
  - mongoose 数据库链接
  - bootstrap css 页面开发场景
  - jquery js 框架
  - blueimp-md5 密码加密
  - npm install express-session

## 模块安装与应用

### express 前端开发框架

1. 安装

```bash
$ npm init -y //添加json初始化文件
$ npm install express --save//安装express
```

2. 引包

```JavaScript
const express = require('express');
```

3. 创建服务

```JavaScript
const app = express();
```

4. 使用

```JavaScript
app.get('/', function (req, res) {
  req.send('index.html')
})
```

## art-template 模版引擎 (配置在 express 中)

### js 使用

1. 安装

```bash
$ npm install --save art-template//express-art-templat依赖了art-template所以可以不用记载但是要安装
$ npm install --save express-art-template
```

2. 配置

```JavaScript
app.engine('art',require('express-art-template'))//art 可以替换成其他的标示 html 等
```

3. 使用

```JavaScript
app.get('/',function (req,res) {
    // 在 Express 中使用模板引擎有更好的方式：res.render('文件名， {模板对象})
  // 可以自己尝试去看 art-template 官方文档：如何让 art-template 结合 Express 来使用
    res.render('index.html',{
        title: 'hello world'
    });
});
```

4. 如果希望修改默认的 views 视图渲染存储目录， 可以如下修改

```JavaScript
// 第一个参数 views 不能写错
app.set('views', 目录路径)
```

### 视图页面输出 views

1. 安装模版引擎
   - art-template
   - express-art-template
2. 编写布局页面 layout.html

```Html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
    <!-- 留坑给页面添加css样式等链接 -->
    {{ block 'head' }}{{ /block }}
</head>

<body>
    <!-- body-固定头部-头部重用 -->
    {{ include './header.html' }}

    <!-- body-内容模块-可修改 -->
    {{ block 'content' }}
        <h1>默认内容</h1>
    {{ /block }}

    <!-- body-固定底部-底部重用 -->
    {{ include './footer.html' }}
</body>
<script src="../node_modules/jquery/dist/jquery.js"></script>
<script src="../node_modules/bootstrap/dist/js/bootstrap.js"></script>
<!-- 留坑给页面添加js等 -->
{{ block 'script' }}{{ /block }}
</html>
```

3. 调用布局模块 编写页面

```Html
<!-- 继承布局模块页 -->
{{extend './layout.html'}}

<!-- 添加css样式-通过坑 head  -->
{{block 'head'}}
<style>
    body {
        background-color: skyblue;
    }
    h1 {
        color: red;
    }
</style>
{{/block}}

<!-- 修改页面内容 -->
{{block 'content'}}
<div>
    <h1>index.html填坑</h1>
</div>
{{/block}}

<!-- 添加js 通过script -->
{{block 'script'}}
<script>
    window.alert('index 页面自己的js 脚本')
</script>
{{/block}}
```

4. 留坑内容
   - 中带‘’号的内容的自定义的名，最好是取一看就明白的
   - 坑不止可以留一个，可以留很多个

## body-parser 中间件(解析表单 post 请求体)

1. 安装

```bash
$ npm install --save body-parser
```

2. 引包

```JavaScript
const bodyParser = require('body-parser');
```

3. 配置

```JavaScript
// parse application/x-www-form-urlencoded 解析application
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 解析
app.use(bodyParser.json());
```

4. 使用

```JavaScript
app.post('/post',function (req,res) {
    var myDate = new Date();
    var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var date = myDate.getDate(); //获取当前日(1-31)
    let comment = req.body;
    comment.dateTime = year + "-" + month + "-" + date;
    comments.unshift(comment);
    res.redirect('/');
})
```

## mongoose （mongodb 数据库链接插件）

1. 安装

```bash
$ npm i -S mongoose
```

2. 引包

```JavaScript
const mongoose = require('mongoose');
```

3. 配置

```JavaScript
// 连接数据库
mongoose.connect('mongodb://localhost/test');
```

4. 使用

```JavaScript
// 创建一个模型
// 就是在设计数据库
// MongoDB 是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
// mongoose 这个包就可以让你的设计编写过程变的非常的简单
const Cat = mongoose.model('Cat', {
    name: String
});

// 实例化一个 cat
const kitty = new Cat({
    name: 'yhf'
});
// 持久化保存 kitty 实例
kitty.save().then(() => console.log('meow'));
```

## bootstrap css 样式前端架构

1. 安装 （3 版居多）

```bash
$ npm install bootstrap@3
```

2. 使用 （在视图的布局页面引入就好）
   css： <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
   js： <script src="../node_modules/bootstrap/dist/js/bootstrap.js"></script>

## jquery js 框架

1. 安装

```bash
$ npm i jquery
```

2. 使用 (在视图的布局页面引入就好)
   <script src="../node_modules/jquery/dist/jquery.js"></script>

## blueimp-md5 密码加密

1. 安装

```bash
$ npm install blueimp-md5
```

2. 引包

```JavaScript
const md5 = require('blueimp-md5');
```

3. 调用

```JavaScript
// md() 在里面填充数据就好 多加几个是多重加密，三个为三重加密
body.password = md5(md5(md5(body.password)))
```

## express-session 数据存储

1. 安装

```bash
$ npm install express-session
```

2. 配置

```JavaScript
// 引包
const session = require('express-session')

// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1. npm install express-session
// 2. 配置 (一定要在 app.use(router) 之前)
// 3. 使用
//    当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
//    添加 Session 数据：req.session.foo = 'bar'
//    访问 Session 数据：req.session.foo

app.use(session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'itcast',
    resave: false,
    saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))
```

3. 使用

```JavaScript
// 用户存在，登录成功，通过 Session 记录登录状态
req.session.user = user;

// 用户退出，退出成功，通过 Session 清除登录状态
req.session.user = null;
```
