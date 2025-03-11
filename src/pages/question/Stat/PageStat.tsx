import { useRequest } from "ahooks";
import React, { FC, useState } from "react";
import { getQuestionStatListService } from "../../../services/stat";
import { useParams } from "react-router-dom";
import { Pagination, Spin, Table, Typography } from "antd";
import { divide } from "lodash";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { Color } from "antd/es/color-picker";
import { STAT_PAGE_SIZE } from "../../../constant";

type PropsType = {
    selectedComponentId: string
    setSelectedComponentId: (id: string) => void
    setSelectedComponentType: (type: string) => void
  }

  const { Title } = Typography
const PageStat: FC<PropsType> = (props: PropsType) => {
    const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
    const { id = '' } = useParams()
    const [total, setTotal] = useState(0)
    const [list, setList] = useState([])
    const { componentList } = useGetComponentInfo()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)
    const { loading } = useRequest(async() => {
        const res = await getQuestionStatListService(id, { page, pageSize })
        return res
    },{
        refreshDeps: [page, pageSize, id],
        onSuccess(res) {
            const { total, list = [] } = res
            setTotal(total)
            setList(list)
        }
    })

    const columns = componentList.map(c => {
        const { fe_id, title, props = {}, type } = c
        const colTitle = props.title || title
        return {
            title: 
            <div style={{ cursor: 'pointer' }} 
             onClick={() => {
                setSelectedComponentId(fe_id)
                setSelectedComponentType(type)
             }}>
                <span style={{ color: fe_id === selectedComponentId ? '#1890ff': 'inherit'}}>{colTitle}</span>
            </div>,
            dataIndex: fe_id
        }
    })
    const dataSource = list.map((i: any) => ({ ...i, key: i._id }))
    const TableElem = (<>
    <Table 
    columns={columns}
    dataSource={dataSource}
    pagination={false}
    ></Table>
    <div style={{ textAlign: "center", marginTop: '18px' }}>
    <Pagination 
    total={total} 
    pageSize={pageSize}
    current={page}
    onChange={page => setPage(page)}
    onShowSizeChange={(page, pageSize) => {
        setPage(page)
        setPageSize(pageSize)
    }}
    />
    </div>
    </>)
    return (
        <div>
            <Title level={3}>答卷数量: {!loading && total}</Title>
            {loading && <div style={{ textAlign: 'center' }}><Spin /></div>}
            {!loading && TableElem}
        </div>
    )
}

export default PageStat