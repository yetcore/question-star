export type QuestionInputPropsType = {
    title?: string,
    placeholder?: string

    onchange?: (newProps: QuestionInputPropsType) => void
}

export const QuestionInputDefaultProps:QuestionInputPropsType = {
    title: '输入框标题',
    placeholder: '请输入...'
}