export type QuestionTextareaPropsType = {
    title?: string,
    placeholder?: string
    disabled?: boolean
    onchange?: (newProps: QuestionTextareaPropsType) => void
}

export const QuestionTextareaDefaultProps:QuestionTextareaPropsType = {
    title: '输入框标题',
    placeholder: '请输入...'
}