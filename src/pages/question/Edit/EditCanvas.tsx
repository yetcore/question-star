import React,{ FC, MouseEvent } from "react";
import styles from './EditCanvas.module.scss'
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/ComponentTitle";
// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/ComponentInput";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { changeSelectedId, ComponentInfoType } from "../../../store/componentsReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import classNames from 'classnames'

type PropsType = {
    loading: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
    const { type, props } = componentInfo
    const componentConf = getComponentConfByType(type)
    if(componentConf == null) return null

    const { Component } = componentConf
    return <Component {...props} />

}
const EditCanvas:FC<PropsType> = ({ loading }) => {
    const { componentList,selectedID } = useGetComponentInfo()
    const dispatch = useDispatch()

    function handleClick(event: MouseEvent, id: string) {
        dispatch(changeSelectedId(id))
        event.stopPropagation()
    }

    if(loading) {
        return <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Spin />
        </div>
    }

    return (
        <div className={styles.canvas}>
            {componentList.map(c => {
                const { fe_id } = c

                //拼接classname
                const wrapperDefaultClassName = styles['component-wrapper']
                const selectedClassName = styles.selected
                const wrapperClassName = classNames({
                    [wrapperDefaultClassName]: true,
                    [selectedClassName]: selectedID === fe_id 
                })
                 return (
                    <div key={fe_id} className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                        <div className={styles.component}>
                            {getComponent(c)}
                        </div>
                    </div>
                 )
            })}

            {/* <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionTitle />
                </div>
            </div>
            <div className={styles['component-wrapper']}>
                <div className={styles.component}>
                    <QuestionInput />
                </div>
            </div> */}
        </div>
    )
}

export default EditCanvas