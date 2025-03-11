export type QuestionParagraphPropsType = {
    text?: string
    isCenter?: boolean
    disabled?: boolean
    onchange?: (newProps: QuestionParagraphPropsType) => void
}

export const QuestionParagrapDefaultProps: QuestionParagraphPropsType = {
    text: '一行段落',
    isCenter: false
}