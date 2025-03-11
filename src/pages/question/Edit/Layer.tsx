import React,{ ChangeEvent, FC, useState } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { useDispatch } from "react-redux";
import { Button, Input, message, Space } from "antd";
import { changeComponentHidden, changeComponentTitle, changeSelectedId, moveComponent, toggleComponentLocked } from "../../../store/componentsReducer";
import styles from './Layer.module.scss'
import classNames from "classnames";
import { EyeInvisibleOutlined, LockOutlined } from "@ant-design/icons";
import SortableContainer from "../../../components/DragSortable/SortableContainer";
import SortableItem from "../../../components/DragSortable/SortableItem";

const Layer: FC = () => {
    const { componentList, selectedID} = useGetComponentInfo()
    const dispatch = useDispatch()

    //记录当前正在修改标题的组件
    const [changeTitleId, setChangeTitleId] = useState('')

    //点击选中的组件
    function handleTitleClick(fe_id: string) {
        const curComp = componentList.find(c => c.fe_id === fe_id)
        if(curComp && curComp.isHidden) {
            message.info('不能选中隐藏的组件')
            return
        }
        if(fe_id !== selectedID) {
            dispatch(changeSelectedId(fe_id))
            setChangeTitleId('')
            return
        }

        setChangeTitleId(fe_id)
    }

    function changeTitle(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value.trim()
        if(!newTitle) return
        if(!selectedID) return
        dispatch(changeComponentTitle({ fe_id: selectedID, title: newTitle}))
    }

    //SortableContainer add items id props
    const componentListWithID = componentList.map(c => {
        return {...c, id: c.fe_id}
    })

    //onDragEnd function
    function handleDragEnd(oldIndex: number, newIndex: number) {
        console.log(oldIndex,newIndex);
        
        dispatch(moveComponent({ oldIndex, newIndex }))
    }

    return(
    <SortableContainer items={componentListWithID} onDragEnd={handleDragEnd}>
    {componentList.map(c => {
        const {fe_id, isHidden, isLocked, title} = c

        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
            [titleDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedID
        })

        function changeHidden(fe_id: string, isHidden: boolean) {
            dispatch(changeComponentHidden({ fe_id, isHidden}))
        }

        function changeLocked(fe_id: string) {
            dispatch(toggleComponentLocked({ fe_id }))
        }
        return (
            <SortableItem key={fe_id} id={fe_id}>
                <div className={styles.wrapper}>
                    <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                        {fe_id === changeTitleId && 
                        <Input 
                        value={title} 
                        onPressEnter={() => setChangeTitleId('')}
                           onBlur={() => setChangeTitleId('')}
                        onChange={changeTitle}/>}
                        {fe_id !== changeTitleId && title}
                    </div>
                <div className={styles.handler}>
                <Space>
                    <Button 
                    icon={<EyeInvisibleOutlined />} 
                    type={isHidden ? 'primary' : 'text'}
                    className={ !isHidden ? styles.btn : ''}
                    size="small"
                    shape="circle"
                    onClick={() => changeHidden(fe_id, !isHidden)}/>
                    <Button 
                    icon={<LockOutlined />} 
                    type={isLocked ? 'primary' : 'text'}
                    className={ !isLocked ? styles.btn : ''}
                    size="small"
                    shape="circle"
                    onClick={() => changeLocked(fe_id)}/>
                </Space>
            </div>
        </div>
            </SortableItem>
        )
    })}

  
    </ SortableContainer>)
}


export default Layer