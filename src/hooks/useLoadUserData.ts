import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../services/user";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/userReducer";


function useLoadUserData() {
    const [waitingUserData,setWaitingUserData] = useState(true)
    const { username }  = useGetUserInfo()
    const dispatch = useDispatch()
    //ajax load user information
    const { run:loadUserInformation } = useRequest(getUserInfoService,{
        manual:true,
        onSuccess(result) {
            const { username, nickname } = result
            dispatch(loginReducer({ username, nickname }))
        },
        onFinally() {
            setWaitingUserData(false)
        }
    })
    useEffect(() => {
        if(username){
            setWaitingUserData(false)
            return
        }
        loadUserInformation()
    },[username])
    return { waitingUserData}
}

export default useLoadUserData