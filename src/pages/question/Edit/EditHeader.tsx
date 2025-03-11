import React,{ ChangeEvent, FC, useEffect, useState } from "react";
import styles from './EditHeader.module.scss'
import { Button, Input, message, Space, Typography } from "antd";
import { EditOutlined, LeftOutlined, LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import EditToolbar from "./EditToolbar";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { changePageTitle } from "../../../store/pageinfoReducer"; 
import { useDispatch } from "react-redux";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { useDebounceEffect, useKeyPress, useRequest } from "ahooks";
import { updateQuestionService } from "../../../services/question";

const { Title } = Typography 

//显示修改标题
const TitleElem:FC = () => {
    const  { title } = useGetPageInfo()
    const [editState, setEditState] = useState(false)
    const dispatch = useDispatch()

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value.trim()
        if(!newTitle) return
        dispatch(changePageTitle(newTitle))
    }
    
    if(editState) {
        return <Input 
        value={title} 
        onPressEnter={() => setEditState(false)} 
        onBlur={() => setEditState(false)}
        onChange={handleChange}/>
    }

   
    return (
        <Space>
            <Title>{title}</Title>
            <Button icon={<EditOutlined/>} type="text" onClick={() => setEditState(true)} />
        </Space>
    )
}

//保存按钮
const SaveButton: FC = () => {
    const { id } = useParams()
    const { componentList = [] } = useGetComponentInfo()
    const pageInfo = useGetPageInfo()


    const { loading, run: save } = useRequest(async() => {
        if(!id) return 
        await updateQuestionService(id, { ...pageInfo, componentList})
    }, { manual: true })

    //快捷键
    useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
        event.preventDefault()
        if(!loading) save()
    })

    //自动保存
    useDebounceEffect(() => {
        save()
    }, [componentList, pageInfo],
    {wait: 1000})

    return (
        <Button 
        onClick={save} 
        disabled={loading}
        icon={loading ? <LoadingOutlined /> : null}> 
            保存
        </Button>
    )
}

//发布按钮
const PublisheButton: FC = () => {
    const { id } = useParams()
    const { componentList = [] } = useGetComponentInfo()
    const pageInfo = useGetPageInfo()
    const nav = useNavigate()

    const { loading, run: pub } = useRequest(async() => {
        if(!id) return 
        await updateQuestionService(id, { ...pageInfo, componentList, isPublished: true})
    }, { 
        manual: true ,
        onSuccess() {
            message.success('发布成功')
            nav('/question/stat/' + id)
        }
    })

    return (
    <Button 
    type="primary" 
    onClick={pub} 
    disabled={loading} 
    >
        发布
    </Button>
    )
}
const EditHeader: FC = () => {
    const nav = useNavigate()

    return <div className={styles['header-wrapper']}>
        <div className={styles.header}>
            <div className={styles.left}>
               <Space>
                    <Button type = "link" icon = {<LeftOutlined />} onClick={() => nav(-1)}>返回</Button>
                    <TitleElem />
               </Space>
            </div>
            <div className={styles.main}>
                <EditToolbar />
            </div>
            <div className={styles.right}>
                <Space>
                    <SaveButton />
                    <PublisheButton />
                </Space>
            </div>
        </div>
    </div>
}

export default EditHeader