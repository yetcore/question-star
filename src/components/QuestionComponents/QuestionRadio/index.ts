import ComponentRadio from './ComponentRadio'
import { QuestionRadioDefaultProps } from './interface'
import PropComponent from './PropComponent'
import StatComponentRadio from './StatComponentRadio'

export * from './interface'

export default {
    title: '单选',
    type: 'questionRadio',
    Component: ComponentRadio,
    defaultProps: QuestionRadioDefaultProps,
    PropComponent,
    StatComponent: StatComponentRadio
}