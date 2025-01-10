import React,{ FC } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
import { Spin } from "antd";

const QuestionLayout: FC = () => {
    const { waitingUserData } = useLoadUserData()
    useNavPage(waitingUserData)
    
    return (
        <div style={{ height: '100vh'}}> 
            <div>
                { waitingUserData ? (
                    <div style={{ textAlign: 'center' ,marginTop: '60px'}}>
                        <Spin />
                    </div>
                ) : <Outlet></Outlet>}
                {/* 形同vue中的slot */}
            </div>
        </div>
    )
  
}

export default QuestionLayout

