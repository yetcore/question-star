import React,{ FC } from "react";
import { Outlet } from "react-router-dom";
const MainLayout: FC = () => {
    return <>
    <div>
        MainLayout haeder
    </div>
    <div>
        MainLayout body
        <Outlet></Outlet>
        {/* 形同vue中的slot */}
    </div>
    <div>
        MainLayout footer
    </div>
    </>
}

export default MainLayout

