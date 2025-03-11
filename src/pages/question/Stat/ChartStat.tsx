import { useRequest } from "ahooks";
import { Typography } from "antd";
import React,{ FC, useEffect, useState } from "react";
import { getComponentStatService } from "../../../services/stat";
import { useParams } from "react-router-dom";
import { getComponentConfByType } from "../../../components/QuestionComponents";
 
type PropsType = {
    selectedComponentId: string
    selectedComponentType: string
}
const { Title } = Typography
const ChartStat: FC<PropsType> = (props: PropsType) => {
    const [stat, setStat] = useState([])
    const { selectedComponentId, selectedComponentType } = props  
    const { id = '' } = useParams()

    const { run } = useRequest(async(questionId, componentId) => {
        const res = await getComponentStatService(questionId, componentId)
        return res
    },{
        manual: true,
        onSuccess(res) {
            setStat(res.stat)
        }
    })
    useEffect(() => {
        if(selectedComponentId) run(id ,selectedComponentId)
    }, [id, selectedComponentId])

    function genStatElem() {
        if(!selectedComponentId) return <div>未选中组件</div>
        const { StatComponent } = getComponentConfByType(selectedComponentType) || {}
        if(StatComponent == null) return <div>该组件无统计图表</div>
        return <StatComponent stat={stat}/>
    }
    return (
        <div>
            <Title level={3}>图标统计</Title>
            <div>{genStatElem()}</div>
        </div>
    )
}

export default ChartStat