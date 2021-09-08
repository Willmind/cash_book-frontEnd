# Egg + React 全栈开发记账本---前端页面代码



前端页面使用Vite 2.0 + React + ZarmUI 搭建 H5 开发环境

## [后台服务代码https://github.com/Willmind/cash_book-server](https://github.com/Willmind/cash_book-server)

## 项目启动

```bash
# 进入项目文件夹
cd react-vite-h5

# 安装依赖
cnpm install

# 项目运行
npm run dev
使用浏览器打开http://localhost:3000/,默认账号密码是nick/1

# 前端项目打包
npm run build
```
## 项目预览
![image](https://raw.githubusercontent.com/Willmind/cash_book-frontEnd/master/images/WechatIMG92.jpeg)
![image](https://raw.githubusercontent.com/Willmind/cash_book-frontEnd/master/images/WechatIMG96.jpeg)
![image](https://raw.githubusercontent.com/Willmind/cash_book-frontEnd/master/images/WechatIMG93.jpeg)
![image](https://raw.githubusercontent.com/Willmind/cash_book-frontEnd/master/images/WechatIMG94.jpeg)
![image](https://raw.githubusercontent.com/Willmind/cash_book-frontEnd/master/images/WechatIMG95.jpeg)

## 项目结构树
```bash
└── react-vite-h5
    ├── dist
    │   └── assets
    └── src
        ├── components  # 组件
        │   ├── BillItem  # 账单列
        │   ├── CustomIcon	# 图标
        │   ├── Empty	# 空状态
        │   ├── Header	# 头部烂
        │   ├── NavBar	# 底部栏
        │   ├── PopupAddBill	# 添加账单弹框
        │   ├── PopupDate	# 时间选择弹框
        │   └── PopupType	# 类型选择弹框
        ├── config
        ├── container
        │   ├── Account  # 个人中心
        │   ├── Data	# 数据
        │   ├── Detail	# 数据详情
        │   ├── Home	# 首页
        │   ├── Login	# 登录
        │   ├── User	# 用户
        │   └── UserInfo	# 用户信息
        ├── router	# 路由
        └── utils	 # 常用状态和工具
```
## 项目知识点
- 单页面应用实践
- 前端构建工具 [Vite](https://cn.vitejs.dev/)
- 前端框架 [React](https://react.docschina.org/) 和路由 [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [React Hooks](https://react.docschina.org/docs/hooks-intro.html) 钩子函数
- CSS 预加载器 [Less](https://less.bootcss.com/)
- HTTP 请求库 [axios](http://www.axios-js.com/)
- 组件设计封装
- 跨域代理
- 移动端适配 lib-flexible、postcss-pxtorem

### React Hooks
React 早期的写法以 Class 类组件为主，附带一些纯用于展示的函数组件，但是函数组件是不能控制自身的状态的. 
引入全新的 Hooks 写法，如 useEffect、useState、useRef、useCallback、useMemo、useReducer 等等，通过这些钩子函数来管理函数组件的各自状态

### vite 构建工具
下一代前端开发与构建工具
- 快速启动，`Vite` 会在本地启动一个开发服务器，来管理开发环境的资源请求
- 相比 `Webpack` 的开发环境打包构建，它在开发环境下是无需打包的，热更新相比 Webpack 会快很多
- 原生 `ES Module`，要什么就当场给你什么。而 Webpack 则是先将资源构建好之后，再根据你的需要，分配给你想要的资源

### CSS 预处理器 Less
项目中采用的 Less 作为 CSS 预处理器，它能设置变量以及一些嵌套逻辑，便于项目的样式编写。

### 移动端项目适配 rem
使用`lib-flexible`，当我们手机变成其他尺寸的时候，这个 font-size 的值也会变化，这是 flexible 起到的作用  
然后再安装一个 `postcss-pxtorem`，它的作用是在你编写完 css 后，将你的单位自动转化为 rem 单位。  
动态的变化 html 的 font-size 的值，从而让 1rem 所对应的 px 值一直都是动态适应变化的。

#### 跨域代理配置 

#### resolve.alias 别名设置

#### 二次封装 axios
- 配置环境变量，判断当前代码运行在开发环境还是生产环境
- 配置基础路径
- 配置请求头，配置`Authorization`和`token`来让我们在服务端鉴权的时候使用
- 配置`get/post`请求体
- 设置拦截器，统一判断请求内容

#### 引入 Zarm UI 组件库并按需加载



