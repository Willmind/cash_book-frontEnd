import Index from "@/container/Index";
import About from "../container/About";

import Data from "../container/Data";
import Home from "../container/Home";
import User from "../container/User";
import Login from "../container/Login";
import Detail from "../container/Detail";
import UserInfo from "../container/UserInfo";


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
]
export default routes