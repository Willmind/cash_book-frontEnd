// Home/index.jsx
import React, {useState, useEffect} from 'react'
import {Icon} from 'zarm'
import BillItem from "../../components/BillItem";

import s from './style.module.less'


const Home = () => {
    const [list, setList] = useState([{
        bills: [
            {
                amount: "25.00",
                date: "1623390740000",
                id: 911,
                pay_type: 1,
                remark: "",
                type_id: 1,
                type_name: "餐饮"
            }
        ],
        date: '2021-06-11'
    }])

    return <div className={s.home}>
        <div className={s.header}>
            <div className={s.dataWrap}>
                <div>
                    总支出:<b>¥ 200</b>
                </div>
                <div>
                    总收入:<b>¥ 200</b>
                </div>
            </div>
            <div className={s.typeWrap}>
                <div>
                    类型<Icon className={s.arrow} type="arrow-bottom"/>
                </div>
                <div>
                    2022-06<Icon className={s.arrow} type="arrow-bottom"/>
                </div>

            </div>

        </div>

        <div className={s.main}>
            {
                list.map((item,index)=><BillItem bill={item} key={index}/>)
            }


        </div>


    </div>
}

export default Home