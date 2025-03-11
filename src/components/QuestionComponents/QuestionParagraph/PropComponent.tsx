import React,{ FC, useEffect } from "react";
import { QuestionParagraphPropsType } from "./interface";
import { Form, Input, Checkbox } from "antd";

const { TextArea } = Input
const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
    const { text, isCenter, onchange, disabled } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({text, isCenter})
    },[text, isCenter])
    function handleValueChange() {
        if(onchange) {
            onchange(form.getFieldsValue())
        }
    }

    return <Form
    layout='vertical'
    initialValues={{text, isCenter}}
    disabled={disabled}
    onValuesChange={handleValueChange}
    form={form}>
        <Form.Item label='段落内容' name='text' rules={[{required: true, message: '请输入段落内容'}]}>
            <TextArea />
        </Form.Item>
        <Form.Item name='isCenter' valuePropName="checked">
            <Checkbox>居中显示</Checkbox>
        </Form.Item>
    </Form>
}

export default PropComponent