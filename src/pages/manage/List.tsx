import React, { FC, useEffect, useRef, useState } from "react";
import styles from './Common.module.scss'
import QuestionCard from "../../components/QuestionCard";
import { Empty, Spin, Typography } from "antd";
import ListSearch from "../../components/ListSearch";
import { getQuestionListService } from "../../services/question";
import {  useDebounceFn, useRequest } from "ahooks";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { useSearchParams } from "react-router-dom";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";

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
    const [started,setStarted] = useState(false)//优化标记是否已经开始加载
    const haveMoreData = total > list.length
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

    //search
    useEffect(() => {
        setStarted(false);
        setPage(1);
        setList([]);
        setTotal(0)
    },[keyword])
    //load
    const { run:load,loading } = useRequest(async() => {
        const data = await getQuestionListService({
            page,
            pageSize: LIST_PAGE_SIZE,
            keyword,
        }
        )
        return data
    },{
        manual: true,
        onSuccess(result) {
            const { list:l = [],total = 0 } = result
            setList(list.concat(l))
            setTotal(total)
            setPage(page + 1)
        }
    })

    //防抖
    const containerRef = useRef<HTMLDivElement>(null)
    const { run: tryLoadMore } = useDebounceFn(() => {
        const elem = containerRef.current
        if(elem == null)return 
        const domReact = elem.getBoundingClientRect()
        if(domReact == null)return
        const { bottom } = domReact
        if(bottom <= document.body.clientHeight) {
            load()
            setStarted(true)
        }
    },{
        wait:1000
    })
    
    //页面加载
    useEffect(() => {
        tryLoadMore()
    },[searchParams])

    //页面滚动
    useEffect(() => {
        if(haveMoreData){
            window.addEventListener('scroll',tryLoadMore)
        }
        return () => window.removeEventListener('scroll',tryLoadMore)
    },[searchParams,haveMoreData])

    //can use useMemo funcation to catche,rely started ,loading,haveMoreData
    const loadMoreContentElem = () => {
        if(!started || loading) {
            return <Spin />
        }
        if(total === 0) {
           return <Empty description = '暂无数据'></Empty>
        }
        if(!haveMoreData) {
            return <span>到达世界尽头</span>
        }
        return <span>开始加载下一页</span>
    }

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
        {/* { <div style={{ textAlign:'center'}}><Spin></Spin></div>} */}
        {
        list.length > 0 && list.map((q:any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q}></QuestionCard>
        })}
    </div>
    <div className={styles.footer}> 
        <div ref={containerRef}>
           {loadMoreContentElem()}
        </div>
    </div>
    </>
}

export default List