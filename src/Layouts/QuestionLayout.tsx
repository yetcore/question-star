import React,{ FC } from "react";
import { Outlet } from "react-router-dom";
const QuestionLayout: FC = () => {
    return <>
        <div>
            QuestionLayout haeder
        </div>
        <div>
            <Outlet></Outlet>
            {/* 形同vue中的slot */}
        </div>
        <div>
            QuestionLayout footer
        </div>
    </>
}

export default QuestionLayout

