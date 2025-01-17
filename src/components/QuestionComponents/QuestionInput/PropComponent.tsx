import React,{ FC, useEffect } from "react";
import { QuestionInputPropsType } from "./interface";
import { Form, Input } from "antd";

const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
    const { title, placeholder, onchange } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ title, placeholder })
    },[title,placeholder])

    function handleValueChange() {
        if(onchange) onchange(form.getFieldsValue())
    }
    return <Form
    layout="vertical"
    initialValues={{ title, placeholder }}
    onValuesChange={handleValueChange}
    form={form}>
        <Form.Item label = '标题' name = 'title' rules={[{ required: true ,message: '请输入标题'}]}>
            <Input></Input>
        </Form.Item>
        <Form.Item label = 'Placeholder' name='placeholder'>
            <Input></Input>
        </Form.Item>
    </Form>
}

export default PropComponent