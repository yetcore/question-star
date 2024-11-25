import React, { ChangeEvent, FC, useEffect, useState}  from "react"
import { Input } from "antd"
import { useNavigate,useLocation, useSearchParams } from "react-router-dom"
import { LIST_SEARCH_PARAM_KEY } from "../constant"

const { Search } = Input
const ListSearch: FC = () => {
    const [value,setValue] = useState('')
    const nav = useNavigate()
    const { pathname } = useLocation()

    function handleChange (event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }
    function handleSearch (value: string) {
        nav({
            pathname,
            search:`${LIST_SEARCH_PARAM_KEY}=${value}`
        })
    }

    //get URL params
    const [searchParams] = useSearchParams()
    useEffect(() => {
        const newValue = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
        setValue(newValue)
    },[searchParams])

    return <Search 
    allowClear 
    placeholder="输入关键字" 
    value={value} size='large' 
    onChange={handleChange} 
    onSearch={handleSearch}
    style={{width:'240px'}}/>
}

export default ListSearch