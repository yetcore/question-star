import React, { FC } from "react";
import { QuestionInputDefaultProps, QuestionInputPropsType } from "./interface";
import { Input, Typography } from "antd";

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
    const { Paragraph } = Typography
    const {title,placeholder} = { ...QuestionInputDefaultProps , ...props}
    return (
        <div>
            <Paragraph strong>
                {title}
            </Paragraph>
            <div>
                <Input placeholder={placeholder}></Input>
            </div>
        </div>
    )
} 

export default QuestionInput