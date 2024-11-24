import React, { FC } from "react";
import styles from './QuestionCard.module.scss';
import { EditOutlined, LineChartOutlined, StarOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button,Space,Divider,Tag,Popconfirm   } from "antd";
import { useNavigate,Link} from "react-router-dom";

type PropsType = {
    _id: string
    title: string
    isStar: boolean
    isPublished: boolean
    answerCount: number
    createAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
    const { _id, title, createAt, answerCount, isPublished, isStar } = props 
    const nav = useNavigate()
    function duplicate() {

    }

    return <div className={styles.container}>
        <div className={styles.title}>
            <div className={styles.left}>
                <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
                    <Space>
                        {isStar && <StarOutlined style={{color: 'red'}}/>}
                        {title}
                    </Space>
                </Link>
            </div>
            <div className={styles.right}>
                <Space>
                    { isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
                    <span>答卷：{answerCount}</span>
                    {createAt}
                </Space>
            </div>
        </div>

        <Divider style={{margin: '12px'}}></Divider>

        <div className={styles['button-container']}>
            <div className={styles.left}>
                
                <Space>
                    <Button icon = {<EditOutlined /> } type = 'text' size="small" onClick={() => nav(`/question/edit/${_id}`)}>编辑问卷</Button>
                    <Button icon = {<LineChartOutlined /> } type = 'text' size="small" onClick={() => nav(`/question/stat/${_id}`)} disabled = {!isPublished}>数据统计</Button>
                </Space>
            </div>
            <div className={styles.right}>

                <Space>
                    <Button icon={<StarOutlined />} type="text" size="small" >{ isStar ? '取消标星' : '标星'}</Button>
                    <Popconfirm title='确定复制该问卷' okText='确定' cancelText='取消' onConfirm={duplicate}>
                        <Button icon={<CopyOutlined />}type="text" size="small" >复制</Button>
                    </Popconfirm>
                    <Button icon={<DeleteOutlined />}type="text" size="small">删除</Button>
                </Space>
            </div>
        </div>
    </div>
}

export default QuestionCard