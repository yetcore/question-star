import React,{ FC, MouseEvent } from "react";
import styles from './EditCanvas.module.scss'
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/ComponentTitle";
// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/ComponentInput";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { changeSelectedId, ComponentInfoType, moveComponent } from "../../../store/componentsReducer";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import classNames from 'classnames'
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

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

    useBindCanvasKeyPress()
    
    if(loading) {
        return <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Spin />
        </div>
    }

    //SortableContainer add items id props
    const componentListWithID = componentList.map(c => {
        return {...c, id: c.fe_id}
    })

    //onDragEnd function
    function handleDragEnd(oldIndex: number, newIndex: number) {
        dispatch(moveComponent({ oldIndex, newIndex }))
    }

    return (
     <SortableContainer items={componentListWithID} onDragEnd={handleDragEnd}>  
        <div className={styles.canvas}>
            {componentList.filter(c => !c.isHidden).map(c => {
                const { fe_id, isLocked} = c

                //拼接classname
                const wrapperDefaultClassName = styles['component-wrapper']
                const selectedClassName = styles.selected
                const lockdeClassName = styles.locked
                const wrapperClassName = classNames({
                    [wrapperDefaultClassName]: true,
                    [selectedClassName]: selectedID === fe_id ,
                    [lockdeClassName]: isLocked
                })
                 return (
                   <SortableItem key={fe_id} id={fe_id}>  
                    <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                        <div className={styles.component}>
                            {getComponent(c)}
                        </div>
                    </div>
                    </SortableItem>  
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
      </SortableContainer>
    )
}

export default EditCanvas