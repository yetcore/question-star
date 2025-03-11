import React,{ FC } from "react";
import { QuestionParagrapDefaultProps, QuestionParagraphPropsType } from "./interface";
import { Typography } from "antd";

const { Paragraph } = Typography
const ComponentParagraph: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
    const { text = '', isCenter = false } = { ...QuestionParagrapDefaultProps, ...props}
    const textList = text.split('\n')
    return <div>
        <Paragraph style={{textAlign: isCenter ? 'center' : 'start', marginBottom: 0}}>
            {textList.map((t, index) => (
                <span key={index}>
                    {index > 0 && <br />}
                    {t}
                </span>
            )
            )}
        </Paragraph>
    </div>
}

export default ComponentParagraph