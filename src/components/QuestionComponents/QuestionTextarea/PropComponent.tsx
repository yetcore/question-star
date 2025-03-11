import React,{ FC, useEffect } from "react";
import { QuestionTextareaPropsType } from "./interface";
import { Form, Input } from "antd";

const PropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
    const { title, placeholder, onchange, disabled } = props
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
    form={form}
    disabled={disabled}>
        <Form.Item label = '标题' name = 'title' rules={[{ required: true ,message: '请输入标题'}]}>
            <Input />
        </Form.Item>
        <Form.Item label = 'Placeholder' name='placeholder'>
            <Input />
        </Form.Item>
    </Form>
}

export default PropComponent