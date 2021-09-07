import React, { useEffect, useState } from 'react';
import { Button, FilePicker, Input, Toast } from 'zarm';
import { useHistory } from 'react-router-dom';
import Header from '@/components/Header'; // 由于是内页，使用到公用头部
import axios from 'axios'; // // 由于采用 form-data 传递参数，所以直接只用 axios 进行请求
import { get, post ,imgUrlTrans} from '@/utils';
import { baseUrl } from 'config';  // 由于直接使用 axios 进行请求，统一封装了请求 baseUrl
import s from './style.module.less';



const UserInfo = ()=>{
    const history = useHistory(); // 路由实例
    const [user, setUser] = useState({}); // 用户
    const [avatar, setAvatar] = useState(''); // 头像
    const [signature, setSignature] = useState(''); // 个签
    const token = localStorage.getItem('token'); // 登录令牌
// 获取用户信息
    const getUserInfo = async () => {
        const { data } = await get('/api/user/get_userinfo');
        setUser(data);
        console.log(data);
        setAvatar(data.avatar)
        setSignature(data.signature)
    };

    useEffect(() => {
        getUserInfo(); // 初始化请求
    }, []);
    // 编辑用户信息方法
    const save = async () => {
        const { data } = await post('/api/user/edit_userinfo', {
            signature,
            avatar
        });

        Toast.show('修改成功')
        // 成功后回到个人中心页面
        history.goBack()
    }
    const handleSelect = (file) => {

        //file 属性为 File 文件类型，它是浏览器返回的原生对象
        // if (file && file.file.size > 200 * 1024) {
        //     Toast.show('上传头像不得超过 200 KB！！')
        //     return
        // }
        let formData = new FormData()
        // 生成 form-data 数据类型
        formData.append('file', file.file)
        // 通过 axios 设置  'Content-Type': 'multipart/form-data', 进行文件上传
        axios({
            method: 'post',
            url: `${baseUrl}/upload`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        }).then(res => {
            console.log(res);
            // 返回图片地址
            setAvatar(imgUrlTrans('/api'+res.data))
        })
    }
    return <>
        <Header title='用户信息' />
        <div className={s.userinfo}>
            <h1>个人资料</h1>
            <div className={s.item}>
                <div className={s.title}>头像</div>
                <div className={s.avatar}>
                    <img className={s.avatarUrl} src={avatar} alt=""/>
                    <div className={s.desc}>
                        <span>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</span>
                        <FilePicker className={s.filePicker} onChange={handleSelect} accept="image/*">
                            <Button className={s.upload} theme='primary' size='xs'>点击上传</Button>
                        </FilePicker>
                    </div>
                </div>
            </div>
            <div className={s.item}>
                <div className={s.title}>个性签名</div>
                <div className={s.signature}>
                    <Input
                        clearable
                        type="text"
                        value={signature}
                        placeholder="请输入个性签名"
                        onChange={(value) => setSignature(value)}
                    />
                </div>
            </div>
            <Button onClick={save} style={{ marginTop: 50 }} block theme='primary'>保存</Button>
        </div>
    </>

}
export default UserInfo;