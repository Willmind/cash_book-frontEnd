// src/utils/axios.js
import axios from 'axios'
import { Toast } from 'zarm'
/**
 * MODE 是一个环境变量，通过 Vite 构建的项目中，环境变量在项目中
 * 可以通过 import.meta.env.MODE 获取，环境变量的作用就是判断当前代码运行在开发环境还是生产环境。
 * @type {string}
 */
const MODE = import.meta.env.MODE // 环境变量

/**
 * baseURL 是 axios 的配置项，它的作用就是设置请求的基础路径，后续我们会在项目实战中有所体现。
 * 配置基础路径的好处就是，当请求地址修改的时候，可以在此统一配置。
 * @type {string}
 */
axios.defaults.baseURL = MODE === 'development' ? '/api' : 'http://api.chennick.wang'

/**
 * Authorization 是我们在服务端鉴权的时候用到的，我们在前端设置好 token，服务端通过获取请求头中的 token 去验证每一次请求是否合法
 * @type {boolean}
 */
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * 拦截器
 */
axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        Toast.show('服务端异常！')
        return Promise.reject(res)
    }
    console.log(localStorage.getItem('token'));
    console.log(res);
    if (res.data.code !== 200) {
        if (res.data.msg) Toast.show(res.data.msg)

        /**
         * 没有登录的用户，默认跳到 /login 页面
         */
        if (res.data.code === 401) {
            // window.location.href = '/login'
        }
        return Promise.reject(res.data)
    }

    return res.data
})

export default axios