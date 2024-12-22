import { useEffect } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_PATHNAME, LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME, REGISATER_PATHNAME } from "../router";


function useNavPage(waitingUserData: boolean) {
    const { username } = useGetUserInfo()
    const { pathname } = useLocation()
    const nav = useNavigate()
    useEffect(() => {
        if(waitingUserData) {
            return
        }
        //login
        if(username) {
            if([LOGIN_PATHNAME,REGISATER_PATHNAME].includes(pathname)) {
                nav(MANAGE_INDEX_PATHNAME)
            }
            return
        }
        //logout
        if([HOME_PATHNAME,LOGIN_PATHNAME,REGISATER_PATHNAME].includes(pathname)) {
            return
        }
        else{
            nav(LOGIN_PATHNAME)
        }
    },[username,pathname,waitingUserData])
}

export default useNavPage