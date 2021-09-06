// PopupType/index.jsx
import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Popup, Icon } from 'zarm'
import cx from 'classnames'
import { get } from '@/utils'

import s from './style.module.less'

const PopupType=forwardRef(({ onSelect }, ref)=>{
    const [show, setShow] = useState(false); // 组件的显示和隐藏
    const [active, setActive] = useState('all'); // 激活的 type
    const [expense, setExpense] = useState([]); // 支出类型标签
    const [income, setIncome] = useState([]); // 收入类型标签

    useEffect(async ()=>{
        // 请求标签接口放在弹窗内，这个弹窗可能会被复用，所以请求如果放在外面，会造成代码冗余。
        const list=[
            {
                "id": 1,
                "name": "餐饮",
                "type": "1",
                "user_id": 0
            },
            {
                "id": 2,
                "name": "服饰",
                "type": "1",
                "user_id": 0
            },
            {
                "id": 3,
                "name": "交通",
                "type": "1",
                "user_id": 0
            },
            {
                "id": 4,
                "name": "日用",
                "type": "1",
                "user_id": 0
            },
            {
                "id": 5,
                "name": "购物",
                "type": "1",
                "user_id": 0
            },
            {
                "id": 6,
                "name": "学习",
                "type": "1",
                "user_id": 0
            },
            {
                "id": 7,
                "name": "医疗",
                "type": "1",
                "user_id": 0
            },
            {
                "id": 8,
                "name": "旅行",
                "type": "1",
                "user_id": 0
            },
            {
                "id": 9,
                "name": "人情",
                "type": "1",
                "user_id": 0
            },
            {
                "id": 10,
                "name": "其他",
                "type": "1",
                "user_id": 0
            },
            {
                "id": 11,
                "name": "工资",
                "type": "2",
                "user_id": 0
            },
            {
                "id": 12,
                "name": "奖金",
                "type": "2",
                "user_id": 0
            },
            {
                "id": 13,
                "name": "转账",
                "type": "2",
                "user_id": 0
            },
            {
                "id": 14,
                "name": "理财",
                "type": "2",
                "user_id": 0
            },
            {
                "id": 15,
                "name": "退款",
                "type": "2",
                "user_id": 0
            },
            {
                "id": 16,
                "name": "其他",
                "type": "2",
                "user_id": 0
            }
        ]
        setExpense(list.filter(i => i.type === '1'))
        setIncome(list.filter(i => i.type === '2'))

    },[])

    if (ref) {
        ref.current = {
            // 外部可以通过 ref.current.show 来控制组件的显示
            show: () => {
                setShow(true)
            },
            // 外部可以通过 ref.current.close 来控制组件的显示
            close: () => {
                setShow(false)
            }
        }
    };

    // 选择类型回调
    const choseType = (item) => {
        setActive(item.id)
        setShow(false)
        // 父组件传入的 onSelect，为了获取类型
        onSelect(item)
    };

    return <Popup visible={show}
                  direction="bottom"
                  onMaskClick={() => setShow(false)}
                  destroy={false}
                  mountContainer={() => document.body}>
        <div className={s.popupType}>
            <div className={s.header}>
                请选择类型
                <Icon type="wrong" className={s.cross} onClick={() => setShow(false)} />
            </div>
            <div className={s.content}>
                <div onClick={() => choseType({ id: 'all' })} className={cx({ [s.all]: true, [s.active]: active === 'all' })}>全部类型</div>
                <div className={s.title}>支出</div>
                <div className={s.expenseWrap}>
                    {
                        expense.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[s.active]: active === item.id})} >{ item.name }</p>)
                    }
                </div>
                <div className={s.title}>收入</div>
                <div className={s.incomeWrap}>
                    {
                        income.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[s.active]: active === item.id})} >{ item.name }</p>)
                    }
                </div>
            </div>
        </div>

    </Popup>

})

PopupType.propTypes = {
    onSelect: PropTypes.func
}

export default PopupType;