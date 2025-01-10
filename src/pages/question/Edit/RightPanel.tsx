import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React,{ FC } from "react";
import ComponentProp from "./ComponentProp";

const RightPanel: FC = () => {
    const tabsItem = [
        {
            key: 'prop',
            label: (
                <span>
                    <FileTextOutlined />
                    属性
                </span>
            ),
            children: <ComponentProp />
        },
        {
            key: 'setting',
            label: (
                <span>
                    <SettingOutlined />
                    页面设置
                </span>
            ),
            children: <ComponentProp />
        }
    ]

    return <Tabs defaultActiveKey="prop" items={tabsItem}></Tabs>
}

export default RightPanel 