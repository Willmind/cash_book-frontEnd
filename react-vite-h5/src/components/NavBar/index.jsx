import React, {useState} from 'react';
import PropTypes from 'prop-types'
import {TabBar} from 'zarm';
import {useHistory} from 'react-router-dom';
import s from './style.module.less';
import CustomIcon from '../CustomIcon'

const NavBar = ({showNav,pathname}) => {
    const [activeKey, setActiveKey] = useState('/');

    /**
     * 通过 useHistory 钩子方法，拿到路由实例 history，它内部含有很多路由的方法
     * 我们使用到的是 history.push 进行路由跳转。
     * @type {History<LocationState>}
     */
    const history = useHistory()

    const changeTab = (path) => {
        setActiveKey(path)
        history.push(path)
    }

    /**
     * 声明 NavBar 函数组件，它接收一个外部传入的 showNav 属性，用于控制导航栏的显示隐藏
     */
    return (
        <TabBar visible={showNav} activeKey={pathname} onChange={changeTab}>
            <TabBar.Item
                itemKey="/"
                title="账单"
                icon={<CustomIcon type="zhangdan" />}
            />
            <TabBar.Item
                itemKey="/data"
                title="统计"
                icon={<CustomIcon type="tongji" />}
            />
            <TabBar.Item
                itemKey="/user"
                title="我的"
                icon={<CustomIcon type="wode" />}
            />
        </TabBar>
    )
}
export default NavBar;