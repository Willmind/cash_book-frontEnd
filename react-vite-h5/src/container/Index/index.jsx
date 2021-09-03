import React from "react";
import { Button } from 'zarm'
import s from './style.module.less'

export default function Index() {
    return <div className={s.index}>
        <span>123</span>
        <Button theme='primary'>按钮123</Button>
    </div>
}