// Home/index.jsx
import React, {useState, useEffect, useRef} from 'react'
import {Icon, Pull,Drag,Button} from 'zarm'
import BillItem from "../../components/BillItem";
import dayjs from 'dayjs'
import s from './style.module.less'
import {get, REFRESH_STATE, LOAD_STATE} from '@/utils' // Pull 组件需要的一些常量
import PopupType from '../../components/PopupType'
import PopupDate from '@/components/PopupDate'
import CustomIcon from '@/components/CustomIcon'
import PopupAddBill from "../../components/PopupAddBill";
import Empty from '@/components/Empty'

let currentPoint = [300, 400];
const Home = () => {

    const containerRef = useRef();
    const boxRef = useRef();
    const [point, setPoint] = useState([300, 400]);
    const [drag, setDrag] = useState(false);

    useEffect(() => {
        const { width, height } = boxRef.current.getBoundingClientRect();
        const {
            width: containerWidth,
            height: containerHeight,
        } = containerRef.current.getBoundingClientRect();

        currentPoint[0] = 300;
        currentPoint[1] = 400;
        setPoint(currentPoint);

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const onDragStart = (event, dragState) => {
        setDrag(true);
    };

    const onDragMove = (event, dragState) => {
        const { width, height } = boxRef.current.getBoundingClientRect();
        const {
            width: containerWidth,
            height: containerHeight,
        } = containerRef.current.getBoundingClientRect();

        let newX = currentPoint[0] + dragState.offsetX;
        let newY = currentPoint[1] + dragState.offsetY;

        if (newX < 0) {
            newX = 0;
        }
        if (newX > containerWidth - width) {
            newX = containerWidth - width;
        }
        if (newY < 0) {
            newY = 0;
        }
        if (newY > containerHeight - height) {
            newY = containerHeight - height;
        }

        setPoint([newX, newY]);
        return true;
    };

    const onDragEnd = (event, dragState) => {
        currentPoint = point;
        setDrag(false);
    };



    const addToggle = () => {
        addRef.current && addRef.current.show()
        // do something
    }
    const addRef = useRef(); // 添加账单 ref
    const typeRef = useRef(); // 账单类型 ref
    const monthRef = useRef(); // 月份筛选 ref
    const [currentSelect, setCurrentSelect] = useState({}); // 当前筛选类型


    // const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); // 当前筛选时间
    const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); // 当前筛选时间
    const [page, setPage] = useState(1); // 分页
    const [list, setList] = useState([]); // 账单列表
    const [totalPage, setTotalPage] = useState(0); // 分页总数

    const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
    const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载状态

    const [totalExpense, setTotalExpense] = useState(0); // 总支出
    const [totalIncome, setTotalIncome] = useState(0); // 总收入


    useEffect(() => {
        getBillList()
    }, [page, currentSelect, currentTime])

    /**
     * 获取账单的方法
     * @returns {Promise<void>}
     */
    const getBillList = async () => {
        const {data} = await get(`/api/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${currentSelect.id || 'all'}`);
        // 下拉刷新，重制数据
        if (page === 1) {
            setList(data.list);
        } else {
            setList(list.concat(data.list));
        }
        setTotalExpense(data.totalExpense.toFixed(2));
        setTotalIncome(data.totalIncome.toFixed(2));
        setTotalPage(data.totalPage);
        // 上滑加载状态
        setLoading(LOAD_STATE.success);
        setRefreshing(REFRESH_STATE.success);
    }

    // 添加账单弹窗
    const toggle = () => {
        typeRef.current && typeRef.current.show()
    };

    // 筛选类型
    const select = (item) => {
        setRefreshing(REFRESH_STATE.loading);
        // 触发刷新列表，将分页重制为 1
        setPage(1);
        setCurrentSelect(item)
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

    // 选择月份弹窗
    const monthToggle = () => {
        monthRef.current && monthRef.current.show()
    };

    // 筛选月份
    const selectMonth = (item) => {
        setRefreshing(REFRESH_STATE.loading);
        setPage(1);
        setCurrentTime(item)
    }


    return <div className={s.home} style={{position: 'relative'}} ref={containerRef}>
        <div className={s.header}>
            <div className={s.dataWrap}>
                <span className={s.expense}>总支出：<b>¥ { totalExpense }</b></span>
                <span className={s.income}>总收入：<b>¥ { totalIncome }</b></span>
            </div>
            <div className={s.typeWrap}>
                <div className={s.left} onClick={toggle}>
                    <span className={s.title}>{ currentSelect.name || '全部类型' } <Icon className={s.arrow} type="arrow-bottom" /></span>
                </div>
                <div className={s.right}>
                    <span className={s.time} onClick={monthToggle}>{ currentTime }<Icon className={s.arrow} type="arrow-bottom" /></span>
                </div>
            </div>
        </div>
        <div className={s.contentWrap}>
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
                </Pull> : <Empty />
            }
        </div>

        <Drag  onDragStart={onDragStart} onDragMove={onDragMove} onDragEnd={onDragEnd}>
            <div
                ref={boxRef}
                style={{
                    display: 'inline-block',
                    position:'fixed',
                    transform: `translate3d(${point[0]}px, ${point[1]}px, 0)`,
                }}
            >
                <div className={s.add} onClick={addToggle}><CustomIcon type='tianjia'/></div>
            </div>
        </Drag>
        <PopupType ref={typeRef} onSelect={select} />
        <PopupDate ref={monthRef} mode="month" onSelect={selectMonth} />
        <PopupAddBill ref={addRef} onReload={refreshData} />
    </div>
}

export default Home