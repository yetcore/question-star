import axios, { ResDataType } from './ajax'

export async function 
getQuestionStatListService(questionId: string, opt: { page: number; pageSize: number}): Promise<ResDataType> {
    const url = `http://localhost:3001/api/stat/${questionId}`
    const data = (await axios.get(url, { params: opt })) as ResDataType
    return data
}

export async function 
getComponentStatService(questionId: string, componemtId: string) {
    const url = `http://localhost:3001/api/stat/${questionId}/:${componemtId}`
    const data = (await axios.get(url)) as ResDataType
    return data
}