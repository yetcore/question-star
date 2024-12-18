import React,{ FC } from "react";
import { useState } from "react";
import styles from './Common.module.scss'
import { Typography,Empty,Table,Tag,Button,Space,Modal, message } from "antd";
import { title } from "process";
import { render } from "@testing-library/react";
import { useRequest, useTitle } from "ahooks";
import { ExclamationOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import {Spin} from "antd";
import ListPage from "../../components/ListPage";
import { deleteQuestionService, updateQuestionService } from "../../services/question";

const { confirm } = Modal
// const rawQuestionList = [
//     {
//         _id:'q1',
//         title:'问卷1',
//         isPublished: false,
//         isStar: true,
//         answerCount: 5,
//         createAt: '2月29日 14.32'
//     },
//     {
//         _id:'q2',
//         title:'问卷2',
//         isPublished: false,
//         isStar: true,
//         answerCount: 5,
//         createAt: '2月29日 14.32'
//     },
//     {
//         _id:'q3',
//         title:'问卷3',
//         isPublished: true,
//         isStar: true,
//         answerCount: 5,
//         createAt: '2月29日 14.32'
//     },
//     {
//         _id:'q4',
//         title:'问卷4',
//         isPublished: false,
//         isStar: true,
//         answerCount: 5,
//         createAt: '2月29日 14.32'
//     }
// ]
const tableColumns = [
    {
        title:'标题',
        dataIndex:'title',
        // key

    },
    {
        title:'是否发布',
        dataIndex:'isPublished',
        // key:''
        render:(isPublished: boolean) => {
            return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
        }
    },
    {
        title:'答卷',
        dataIndex:'answerCount',
        // key

    },
    {
        title:'创建时间',
        dataIndex:'createAt',
        // key

    }
]
const { Title } = Typography
const Trash: FC = () => {
    useTitle('yetcore问卷 -- 回收站')
    // const [questionList, setQuestionList] = useState(rawQuestionList)

    const [selectedIds,setSelectedIds] = useState<string[]>([])//记录ID
    const { data = {}, loading, refresh } = useLoadQuestionListData({isDeleted: true})
    const { list = [], total = 0 } = data

    

    //recover
    const { run:recover} = useRequest(async() => {
        for await (const id of selectedIds) {
            await updateQuestionService(id,{ idDeleted: false })
        } 
    },{
        manual: true,
        debounceMaxWait:1000,
        onSuccess() {
            message.success('恢复成功')
            refresh()
            setSelectedIds([])
        }
    })

    //delete
    const { run: deleteFN } = useRequest(async() => await deleteQuestionService(selectedIds),{
        manual:true,
        onSuccess() {
            message.success('删除成功')
            refresh()
            setSelectedIds([])
        }
    })

    function del() {
        confirm({
            title:'确定彻底删除该问卷',
            icon:<ExclamationOutlined />,
            content:'删除后不可撤回',
            onOk: deleteFN
        })
    }
    const TableElem = <>
        <div style={{ marginBottom:'16px'}}>
            <Space>
                <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>恢复</Button>
                <Button danger disabled={selectedIds.length === 0} onClick={del}>删除</Button>
            </Space>
        </div>
        <Table 
                dataSource={list} 
                columns={tableColumns} 
                pagination={false} 
                rowKey={(q:any) => q._id}
                rowSelection={{
                    type:'checkbox',
                    onChange: selectedRowKeys => {
                        setSelectedIds(selectedRowKeys as string[])
                    }
                }}
                />
    </>
    return (
        <>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Title level={3}>回收站</Title>
                </div>
                <div className={styles.right}>
                    <ListSearch />
                </div>
            </div>
            <div className={styles.content}>
                {loading && <div style={{ textAlign:'center'}}><Spin></Spin></div>}
                {!loading && list.length === 0 && <Empty description='暂无数据'/>}
                {list.length > 0 && TableElem}
            </div>
            <div className={styles.footer}>
                <ListPage total={total}></ListPage>
            </div>
        </>
    )
}

export default Trash