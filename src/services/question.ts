import axios,{ ResDataType } from './ajax'


type SearchOption = {
    keyword: string ,
    isStar: boolean,
    isDeleted: boolean,
    page: number,
    pageSize: number
}
//获取单个问卷信息
export async function getQuestionService(id:string): Promise<ResDataType>{
    const url = `http://localhost:3001/api/question/${id}`
    const data = (await axios.get(url)) as ResDataType
    return data
}

//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
    const url = 'http://localhost:3001/api/question'
    const data = (await axios.post(url)) as ResDataType
    return data 
}

//获取查询列表
export async function  getQuestionListService(opt:Partial<SearchOption> = {}): Promise<ResDataType> {
    const url = 'http://localhost:3001/api/question'
    const data = (await axios.get(url,{ params: opt}) as ResDataType)
    return data
    
}

//更新问卷
export async function updateQuestionService(id: string,opt: {[key: string] :any}):Promise<ResDataType> {
    const url = `http://localhost:3001/api/question/${id} `
    const data = (await axios.patch(url,opt)) as ResDataType
    return data
}

//复制问卷
export async function duplicateQuestionService(id: string) {
    const url = `http://localhost:3001/api/question/duplicate/${id}`
    const data = (await axios.post(url)) as ResDataType
    return data
}

export async function deleteQuestionService(ids: string[]):Promise<ResDataType>{
    const url = 'http://localhost:3001/api/question'
    const data = (await axios.delete(url,{ data: { ids }})) as ResDataType
    return data
}