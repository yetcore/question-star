import ComponentInput from './ComponentInput'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
    title: '输入框',
    type: 'questionInput',
    Component:ComponentInput,
    PropComponent,
    defaultProps:QuestionInputDefaultProps
}
