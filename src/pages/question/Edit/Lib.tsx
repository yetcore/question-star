import React,{ FC } from "react";
import { componentConfGroup, ComponentConfType } from "../../../components/QuestionComponents";
import { Typography } from "antd";
import styles from './Lib.module.scss'
import { addComponent } from "../../../store/componentsReducer";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

const { Title } = Typography

function GetComponent(c: ComponentConfType) {
    const { title, type ,Component, defaultProps } = c
    const dispatch = useDispatch()

    function handleClick() {
        dispatch(addComponent({
            fe_id: nanoid(),
            title,
            type,
            props: defaultProps
        }))
    }
    return <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
            <Component />
        </div>
    </div>
}
const Lib: FC = () => {
    return (
        <div>
            {componentConfGroup.map((group, index) => {
                const { groupId, groupName, components } = group
                return (
                <div key={groupId}>
                    <Title level={3} style={{fontSize: '16px', marginTop: index > 0 ? '20px' : '0px'}}>{groupName}</Title>
                    <div>{components.map(c => GetComponent(c))}</div>
                </div>
                
                )
        })}
        </div>
    )
} 

export default Lib