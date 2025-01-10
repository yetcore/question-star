import ComponentTitle from './ComponentTitle'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
    title: '标题',
    type: 'questionTitle',
    Component:ComponentTitle,
    PropComponent,
    defaultProps:QuestionTitleDefaultProps
}
