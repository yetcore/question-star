import React, { FC, useState } from "react";
import styles from './Common.module.scss'
import QuestionCard from "../../components/QuestionCard";
import { Typography } from "antd";


const rawQuestionList = [
    {
        _id:'q1',
        title:'问卷1',
        isPublished: false,
        isStar: false,
        answerCount: 5,
        createAt: '2月29日 14.32'
    },
    {
        _id:'q2',
        title:'问卷2',
        isPublished: false,
        isStar: false,
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
        isStar: false,
        answerCount: 5,
        createAt: '2月29日 14.32'
    }
]
const { Title } = Typography
const List: FC = () => {
    const [questionList, setQuestionList] = useState(rawQuestionList)
    return <>
    <div className={styles.header}>
        <div className={styles.left}>
            <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
    </div>
    <div className={styles.content}>
        {questionList.length > 0 && 
        questionList.map(q => {
            const { _id } = q
            return <QuestionCard key={_id} {...q}></QuestionCard>
        })}
    </div>
    <div className={styles.footer}> 
        footer
    </div>
    </>
}

export default List