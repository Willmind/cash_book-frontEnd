
import Data from "../container/Data";
import Home from "../container/Home";
import User from "../container/User";
import Login from "../container/Login";
import Detail from "../container/Detail";
import UserInfo from "../container/UserInfo";
import Account from '@/container/Account'

const routes=[
    {
        path: "/",
        component: Home
    },
    {
        path: "/data",
        component: Data
    },
    {
        path: "/user",
        component: User
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/detail",
        component: Detail
    },
    {
        path: "/userInfo",
        component: UserInfo
    },
    {
        path: "/account",
        component: Account
    }
]
export default routes