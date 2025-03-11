import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React,{ FC, useEffect, useState } from "react";
import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

enum TAB_KEY {
    PROP_KEY = 'prop',
    SETTING_KEY = 'setting'
}
const RightPanel: FC = () => {
    const [activeKey,setActiveKey] = useState(TAB_KEY.PROP_KEY)
    const { selectedID } = useGetComponentInfo()
     useEffect(() => {
        if(selectedID) setActiveKey(TAB_KEY.PROP_KEY)
        else setActiveKey(TAB_KEY.SETTING_KEY)
     },[selectedID])
    const tabsItem = [
        {
            key: TAB_KEY.PROP_KEY,
            label: (
                <span>
                    <FileTextOutlined />
                    属性
                </span>
            ),
            children: <ComponentProp />
        },
        {
            key: TAB_KEY.SETTING_KEY,
            label: (
                <span>
                    <SettingOutlined />
                    页面设置
                </span>
            ),
            children: <PageSetting />
        }
    ]

    return <Tabs activeKey={activeKey} items={tabsItem}></Tabs>
}

export default RightPanel 