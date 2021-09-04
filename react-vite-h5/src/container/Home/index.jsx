// Home/index.jsx
import React, {useState, useEffect} from 'react'
import {Icon, Pull} from 'zarm'
import BillItem from "../../components/BillItem";
import dayjs from 'dayjs'
import s from './style.module.less'
import {get, REFRESH_STATE, LOAD_STATE} from '@/utils' // Pull 组件需要的一些常量


const Home = () => {
    // const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); // 当前筛选时间
    const [currentTime, setCurrentTime] = useState('2021-05'); // 当前筛选时间
    const [page, setPage] = useState(1); // 分页
    const [list, setList] = useState([]); // 账单列表
    const [totalPage, setTotalPage] = useState(0); // 分页总数

    const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
    const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载状态


    useEffect(() => {
        getBillList()
    }, [page])

    /**
     * 获取账单的方法
     * @returns {Promise<void>}
     */
    const getBillList = async () => {
        const {data} = await get(`/api/bill/list?page=${page}&page_size=5&date=${currentTime}`);
        console.log(data);
        // 下拉刷新，重制数据
        if (page === 1) {
            setList(data.list);
        } else {
            setList(list.concat(data.list));
        }
        setTotalPage(data.totalPage);
        // 上滑加载状态
        setLoading(LOAD_STATE.success);
        setRefreshing(REFRESH_STATE.success);
    }

    // 请求列表数据
    const refreshData = () => {
        setRefreshing(REFRESH_STATE.loading);
        if (page != 1) {
            setPage(1);
        } else {
            getBillList();
        }
    };

    const loadData = () => {
        if (page < totalPage) {
            setLoading(LOAD_STATE.loading);
            setPage(page + 1);
        }
    }



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
                list.length ? <Pull
                    animationDuration={200}
                    stayTime={400}
                    refresh={{
                        state: refreshing,
                        handler: refreshData
                    }}
                    load={{
                        state: loading,
                        distance: 200,
                        handler: loadData
                    }}
                >
                    {
                        list.map((item, index) => <BillItem
                            bill={item}
                            key={index}
                        />)
                    }
                </Pull> : null
            }


        </div>


    </div>
}

export default Home