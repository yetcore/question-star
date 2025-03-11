import ComponentTextarea from './ComponentTextarea'
import { QuestionTextareaDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
    title: '多行输入',
    type: 'questionTextarea',
    Component:ComponentTextarea,
    PropComponent,
    defaultProps:QuestionTextareaDefaultProps
}
