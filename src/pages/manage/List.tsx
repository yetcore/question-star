import React, { FC, useEffect, useState } from "react";
import styles from './Common.module.scss'
import QuestionCard from "../../components/QuestionCard";
import { Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import { getQuestionListService } from "../../services/question";
import { useRequest } from "ahooks";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";

// const rawQuestionList = [
//     {
//         _id:'q1',
//         title:'问卷1',
//         isPublished: false,
//         isStar: false,
//         answerCount: 5,
//         createAt: '2月29日 14.32'
//     },
//     {
//         _id:'q2',
//         title:'问卷2',
//         isPublished: false,
//         isStar: false,
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
//         isStar: false,
//         answerCount: 5,
//         createAt: '2月29日 14.32'
//     }
// ]


const { Title } = Typography
const List: FC = () => {
    // const [questionList, setQuestionList] = useState(rawQuestionList)
    // const { data = {}, loading } = useLoadQuestionListData()
    // const { list = [], total = 0 } = data
    // const [list,setList] = useState()
    // const [total,setTotal] = useState()
    // useEffect(() => {
    //     async function load() {
    //         const data = await getQuestionListService()  
    //         const { list = [], total = 0 } = data
    //         setList(list)
    //         setTotal(total)
    //     }
    //     load()
    // },[])
    const [list,setList] = useState([])
    const [page,setPage] = useState(1)
    const [total,setTotal] = useState(0)
    const haveMoreData = total > list.length
    return <>
    <div className={styles.header}> 
        <div className={styles.left}>
            <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
            <ListSearch />
        </div>
    </div>
    <div className={styles.content}>
        {loading && <div style={{ textAlign:'center'}}><Spin></Spin></div>}
        {!loading && (list.length > 0) && 
        list.map((q:any) => {
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