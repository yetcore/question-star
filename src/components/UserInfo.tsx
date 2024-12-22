import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import {LOGIN_PATHNAME} from '../router/index'
import { useRequest } from "ahooks";
import { getUserInfoService } from "../services/user";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { removeToken } from "../utils/userToken";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../store/userReducer";
 const UserInfo: FC = () => {
    // const { data } = useRequest(getUserInfoService)
    // const {username, nickname} = data || {}

    const { username, nickname } = useGetUserInfo()

    const nav = useNavigate()
    //login out
    const dispatch = useDispatch()
    function loginout() {
        dispatch(logoutReducer())
        removeToken()
        nav(LOGIN_PATHNAME)
        message.success('退出成功')
    }

    const UserInfo = (
        <>
            <span style={{ color: '#e8e8e8'}}>
                <UserOutlined />
                {nickname}
            </span>
            <Button type="link" onClick={loginout}>退出</Button>
        </>
    )

    const login = (
        <>
        <Link to={LOGIN_PATHNAME}>登录</Link>
        </>
    )
    return (
        <div>
            {username ? UserInfo : login}
        </div>
        
    )
 }

 export default UserInfo