import { Pagination } from "antd";
import React,{ FC, useEffect, useState } from "react";
import { LIST_PAGE_SIZE,LIST_PAGE_PARAM_KEY,LIST_PAGE_SIZE_PARAM_KEY } from "../constant";
import {  useLocation, useNavigate, useSearchParams } from "react-router-dom";

type Propstype = {
    total: number
}
const ListPage:FC<Propstype> = (props: Propstype) => {
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
    const [searchParams] = useSearchParams()
    useEffect(() => {
        const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
        setCurrent(page)
        const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
        setPageSize(pageSize)
    },[searchParams])
    const total = props

    const nav = useNavigate()
    const {pathname} = useLocation()
    function handlePagechange(page: number, pageSize: number) {
        searchParams.set(LIST_PAGE_PARAM_KEY,page.toString())
        searchParams.set(LIST_PAGE_SIZE_PARAM_KEY,pageSize.toString())
        nav({
            pathname,
            search: searchParams.toString()
        })
    }
    return (
        <Pagination current={current} total={100} pageSize={pageSize} onChange={handlePagechange}/>
    )
}

export default ListPage