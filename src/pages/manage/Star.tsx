import React,{ FC } from "react";
import styles from './Common.module.scss'
import { Typography,Empty,Spin} from "antd";
import QuestionCard from "../../components/QuestionCard";
import { useTitle } from "ahooks";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";

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
const { Title } = Typography
const Star: FC = () => {
    useTitle('yetcore问卷 -- 标星')
    // const [questionList, setQuestionList] = useState(rawQuestionList)
    const { data = {},loading } = useLoadQuestionListData({ isStar: true })
    const { list = [],total = 0 } = data
    return <>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>星标问卷</Title>
            </div>
            <div className={styles.right}>
                <ListSearch />
            </div>
        </div>
        <div className={styles.content}>
        {loading && <div style={{ textAlign:'center'}}><Spin></Spin></div>}
            {!loading && list.length === 0 && <Empty description='暂无数据'/>}
        {list.length > 0 && 
          list.map((q:any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q}></QuestionCard>
        })}
        </div>
        <div className={styles.footer}>
            <ListPage total={total}/>
        </div>
    </>
}
export default Star