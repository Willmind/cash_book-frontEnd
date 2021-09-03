import React, {useState,useCallback} from 'react'
import {Cell, Input, Button, Checkbox,Toast} from 'zarm'
import CustomIcon from '@/components/CustomIcon'
import s from './style.module.less'
import Captcha from "react-captcha-code"
import { post } from '@/utils'
import cx from 'classnames'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verify, setVerify] = useState('')

    const [type, setType] = useState('login'); // 登录注册类型

    const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值

    //  验证码变化，回调方法
    const handleChange = useCallback((captcha) => {

        setCaptcha(captcha)
    }, []);

    const onSubmit=async ()=>{
        console.log(123);
        console.log(type);
        if (!username) {
            Toast.show('请输入账号')
            return
        }
        if (!password) {
            Toast.show('请输入密码')
            return
        }

        /**
         * 判断登录状态
         */
        try{
            if(type==='login'){
                const { data } = await post('/api/user/login', {
                    username,
                    password
                }).then(res=>{
                    Toast.show(res.message);
                    // 将 token 写入 localStorage
                    localStorage.setItem('token', data.token);
                })
            }else{
                /**
                 * 判断注册状态
                 */
                if (!verify) {
                    Toast.show('请输入验证码')
                    return
                }
                if (verify !== captcha) {
                    Toast.show('验证码错误')
                    return
                }
                const { data } = await post('/api/user/register', {
                    username,
                    password
                });

                Toast.show('注册成功');
                // 注册成功，自动将 tab 切换到 login 状态
                setType('login');
            }
        }catch (error){
            // Toast.show(error.msg);
        }



    }

    return (
        <div>

            <div className={s.tab}>
                <span className={cx({[s.active]:type==='login'})} onClick={()=>setType('login')}>登录</span>
                <span className={cx({[s.active]:type==='register'})} onClick={()=>setType('register')}>注册</span>
            </div>
            <Cell icon={<CustomIcon type="zhanghao"/>}>
                <Input
                    clearable
                    type="text"
                    placeholder="请输入账号"
                    onChange={(value)=>setUsername(value)}
                />
            </Cell>
            <Cell icon={<CustomIcon type="mima"/>}>
                <Input
                    clearable
                    type="password"
                    placeholder="请输入密码"
                    onChange={(value) => setPassword(value)}
                />
            </Cell>
            {
                type==='register'?<Cell icon={<CustomIcon type="mima"/>}>
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入验证码"
                        onChange={(value) => setVerify(value)}
                    />
                    <Captcha charNum={4} onChange={handleChange}/>
                </Cell>:null
            }

            <Button onClick={onSubmit} block theme="primary">
                {type==='register'?'注册':'登录'}
            </Button>
        </div>
    )
}
export default Login