import ComponentParagraph from './ComponentParagraph'
import { QuestionParagrapDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
    title: '段落',
    type: 'questionParagraph',
    Component:ComponentParagraph,
    PropComponent,
    defaultProps:QuestionParagrapDefaultProps
}