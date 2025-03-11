import ComponentCheckbox from "./ComponentCheckbox";
import { QuestionCheckboxDefaultProps } from "./interface";
import PropComponent from "./PropComponent";
import StatComponentCheckbox from "./StatComponentCheckbox";

export * from './interface'

export default {
    title: '多选',
    type: 'questionCheckbox',
    Component: ComponentCheckbox,
    PropComponent,
    defaultProps: QuestionCheckboxDefaultProps,
    StatComponent: StatComponentCheckbox
}