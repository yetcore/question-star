import React,{ FC, useEffect } from "react";
import { QuestionInfoPropsType } from "./interface";
import { Form, Input } from "antd";

const { TextArea } = Input
const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
    const { title, desc, onchange, disabled } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({title, desc})
    },[title, desc])

    function handleValueChange() {
        if(onchange) {
            onchange(form.getFieldsValue())
        }
    }

    return <Form
    layout='vertical'
    initialValues={{title, desc}}
    disabled={disabled}
    onValuesChange={handleValueChange}
    form={form}>
        <Form.Item label='标题' name='title' rules={[{required: true, message: '请输入标题内容'}]}>
            <Input />
        </Form.Item>
        <Form.Item label='描述' name='desc'>
            <TextArea />
        </Form.Item>
    </Form>
}

export default PropComponent