// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentsReducer";


function useLoadQuestionData() {
    const { id = '' } = useParams()
    const dispatch = useDispatch()
    
    //ajax加载
    const { data, loading, error ,run } = useRequest(
        async (id: string) => {
            if(!id) throw new Error('没有问卷 id')
            const data = getQuestionService(id)
        return data
        },{
            manual: true
        }
    ) 

    //根据获取的 data 设置redux store
    useEffect(() => {
        if(!data) return
        const { title = '' , componentList = []} = data

        let selectedID = ''
        if(componentList.length > 0) selectedID = componentList[0].fe_id

        //把 componentList 存储到 Redux store
        dispatch(resetComponents({ componentList, selectedID }))
    },[data])

    //判断id变化加载数据
    useEffect(() => {
        run(id)
    },[id])

    return { loading , error }
}

export default useLoadQuestionData















// function useLoadQuestionData() {
//     const { id = '' } = useParams()
//     // const [loading,setLoading] = useState(true)
//     // const [questionData,setQuestionData] = useState({})
//     // useEffect(() => {
//     //     async function fn() {
//     //         const data = await getQuestionService(id)
//     //         setQuestionData(data)
//     //         setLoading(false)
//     //     }
//     //     fn()
//     // },[])
//     // return { loading, questionData}
//     async function load() {
//         const data = await getQuestionService(id)
//         return data
//     }
//     const { loading, data, error} = useRequest(load)
//     return { loading,data,error }
// }

// export default useLoadQuestionData 

