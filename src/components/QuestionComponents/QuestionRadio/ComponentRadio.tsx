import { Typography, Radio, Space } from "antd";
import React,{ Component, FC } from "react";
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from "./interface";

const { Paragraph } = Typography 
const ComponentRadio: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
    const { title, options = [], value, isVertical } = { ...QuestionRadioDefaultProps, ...props}

    return (
        <div>
            <Paragraph strong>{title}</Paragraph>
            <Radio.Group value={value}>
                 <Space direction={isVertical ? 'vertical' : 'horizontal'}>
                    { options.map(opt => {
                        const {value, text} = opt
                        return <Radio value={value} key={value}>
                            {text}
                        </Radio>
                    })}
                 </Space>
            </Radio.Group>
           
        </div>
    )
}
export default ComponentRadio