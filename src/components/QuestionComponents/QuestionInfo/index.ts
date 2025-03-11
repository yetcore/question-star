import ComponentInfo from "./ComponentInfo";
import PropComponent from "./PropComponent";
import { QuestionInfoDefaultProps } from "./interface";

export * from './interface'

export default {
    title: '问卷信息',
    type: 'questionInfo',
    Component:ComponentInfo,
    PropComponent,
    defaultProps:QuestionInfoDefaultProps
}