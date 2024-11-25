import React,{ FC } from "react";
import { useState } from "react";
import styles from './Common.module.scss'
import { Typography,Empty,Table,Tag,Button,Space,Modal } from "antd";
import { title } from "process";
import { render } from "@testing-library/react";
import { useTitle } from "ahooks";
import { ExclamationOutlined } from "@ant-design/icons";
import ListSearch from "../../components/ListSearch";

const { confirm } = Modal
const rawQuestionList = [
    {
        _id:'q1',
        title:'问卷1',
        isPublished: false,
        isStar: true,
        answerCount: 5,
        createAt: '2月29日 14.32'
    },
    {
        _id:'q2',
        title:'问卷2',
        isPublished: false,
        isStar: true,
        answerCount: 5,
        createAt: '2月29日 14.32'
    },
    {
        _id:'q3',
        title:'问卷3',
        isPublished: true,
        isStar: true,
        answerCount: 5,
        createAt: '2月29日 14.32'
    },
    {
        _id:'q4',
        title:'问卷4',
        isPublished: false,
        isStar: true,
        answerCount: 5,
        createAt: '2月29日 14.32'
    }
]
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
    const [questionList, setQuestionList] = useState(rawQuestionList)
    const [selectedIds,setSelectedIds] = useState<string[]>([])//记录ID
    function del() {
        confirm({
            title:'确定彻底删除该问卷',
            icon:<ExclamationOutlined />,
            content:'删除后不可撤回',
            onOk: () => {}
        })
    }
    const TableElem = <>
        <div style={{ marginBottom:'16px'}}>
            <Space>
                <Button type="primary" disabled={selectedIds.length === 0}>恢复</Button>
                <Button danger disabled={selectedIds.length === 0} onClick={del}>删除</Button>
            </Space>
        </div>
        <Table 
                dataSource={questionList} 
                columns={tableColumns} 
                pagination={false} 
                rowKey={q => q._id}
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
                {questionList.length === 0 && <Empty description='暂无数据'/>}
                {questionList.length > 0 && TableElem}
            </div>
            <div className={styles.footer}>

            </div>
        </>
    )
}

export default Trash