# Egg + React 全栈开发记账本---前端页面代码

前端页面使用Vite 2.0 + React + ZarmUI 搭建 H5 开发环境


## 项目启动

```bash
# 进入项目文件夹
cd react-vite-h5

# 安装依赖
cnpm install

# 项目运行
npm run dev
使用浏览器打开http://localhost:3000/

# 前端项目打包
npm run build
```
## 项目结构树
```
.
└── react-vite-h5
    ├── dist
    │   └── assets
    └── src
        ├── components  组件
        │   ├── BillItem	账单列
        │   ├── CustomIcon	图标
        │   ├── Empty	空状态
        │   ├── Header	头部烂
        │   ├── NavBar	底部栏
        │   ├── PopupAddBill	添加账单弹框
        │   ├── PopupDate	时间选择弹框
        │   └── PopupType	类型选择弹框
        ├── config
        ├── container
        │   ├── Account	个人中心
        │   ├── Data	数据
        │   ├── Detail	数据详情
        │   ├── Home	首页
        │   ├── Login	登录
        │   ├── User	用户
        │   └── UserInfo	用户信息
        ├── router	路由
        └── utils	常用状态和工具
```
## 项目知识点
- 前端构建工具 [Vite](https://cn.vitejs.dev/)
- 前端框架 [React](https://react.docschina.org/) 和路由 [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [React Hooks](https://react.docschina.org/docs/hooks-intro.html) 钩子函数
- CSS 预加载器 [Less](https://less.bootcss.com/)
- HTTP 请求库 [axios](http://www.axios-js.com/)
- 组件设计封装
- 跨域代理
- 移动端适配 lib-flexible

## React Hooks
React 早期的写法以 Class 类组件为主，附带一些纯用于展示的函数组件，但是函数组件是不能控制自身的状态的. 
引入全新的 Hooks 写法，如 useEffect、useState、useRef、useCallback、useMemo、useReducer 等等，通过这些钩子函数来管理函数组件的各自状态

## vite 构建工具
下一代前端开发与构建工具
- 快速启动，Vite 会在本地启动一个开发服务器，来管理开发环境的资源请求
- 相比 Webpack 的开发环境打包构建，它在开发环境下是无需打包的，热更新相比 Webpack 会快很多
- 原生 ES Module，要什么就当场给你什么。而 Webpack 则是先将资源构建好之后，再根据你的需要，分配给你想要的资源

## CSS 预处理器 Less
项目中采用的 Less 作为 CSS 预处理器，它能设置变量以及一些嵌套逻辑，便于项目的样式编写。

