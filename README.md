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
- [React Hooks](https://react.docschina.org/docs/hooks-intro.html)钩子函数
- CSS 预加载器 [Less](https://less.bootcss.com/)
- HTTP 请求库 [axios](http://www.axios-js.com/)
- 组件设计封装
- 跨域代理
- 移动端适配 lib-flexible
