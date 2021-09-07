// Account/index.jsx
import React from 'react';
import { Cell, Input, Button, Toast } from 'zarm';
import { createForm  } from 'rc-form';
import Header from '@/components/Header'
import { post } from '@/utils'

import s from './style.module.less'

const Account = (props) => {
    // Account 通过 createForm 高阶组件包裹之后，可以在 props 中获取到 form 属性
    const { getFieldProps, getFieldError } = props.form;

    // 提交修改方法
    const submit = () => {
        // validateFields 获取表单属性元素
        props.form.validateFields(async (error, value) => {
            // error 表单验证全部通过，为 false，否则为 true
            if (!error) {

                if (value.newpass !== value.newpass2) {
                    Toast.show('新密码输入不一致');
                    return
                }
                await post('/api/user/modify_pass', {
                    old_pass: value.oldpass,
                    new_pass: value.newpass,
                    new_pass2: value.newpass2
                })
                Toast.show('修改成功')
                window.location.href = '/user'

            }
        });
    }

    return <>
        <Header title="重置密码" />
        <div className={s.account}>
            <div className={s.form}>
                <Cell title="原密码">
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入原密码"
                        {...getFieldProps('oldpass', { rules: [{ required: true }] })}
                    />
                </Cell>
                <Cell title="新密码">
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入新密码"
                        {...getFieldProps('newpass', { rules: [{ required: true }] })}
                    />
                </Cell>
                <Cell title="确认密码">
                    <Input
                        clearable
                        type="text"
                        placeholder="请再此输入新密码确认"
                        {...getFieldProps('newpass2', { rules: [{ required: true }] })}
                    />
                </Cell>
            </div>
            <Button className={s.btn} block theme="primary" onClick={submit}>提交</Button>
        </div>
    </>
};

/**
 * Account 在抛出去的时候，需要用 createForm() 高阶组件进行包裹，这样在 Account 的内部能接收到 form 属性，
 * 它的内部提供了 getFieldProps 方法，对 Input 组件进行表单设置，
 * Input 的 onChange 方法会被代理，最终可以通过 form.validateFields 以回到函数的形式拿到 Input 内的值，并且可以加以验证
 */

export default createForm()(Account);