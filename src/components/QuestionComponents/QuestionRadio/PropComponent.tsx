import React,{ FC, useEffect } from "react";
import { OptionType, QuestionRadioPropsType } from "./interface";
import { Button, Checkbox, Form, Input, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { FormContext } from "antd/es/form/context";
import { nanoid } from "@reduxjs/toolkit";

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
    const { title, value, isVertical, options = [], onchange, disabled } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ title, value, isVertical, options })
    },[title, value, isVertical, options])

    function handleValuesChange() {
        if(onchange == null) return
        const newValues = form.getFieldsValue() as QuestionRadioPropsType
        if(newValues.options) {
            newValues.options = newValues.options.filter(opt => !(opt.text == null))
        }
        const { options = [] } = newValues
        options.forEach(opt => {
            if(opt.value) return 
            opt.value = nanoid(5)
        });
        onchange(newValues)
    }
    return (
        <Form
        layout="vertical"
        initialValues={{ title, value, isVertical, options }}
        onValuesChange={handleValuesChange}
        disabled={disabled}
        form={form}>
            <Form.Item label='标题' name='title' rules={[{required: true, message: '请输入'}]}>
                <Input />
            </Form.Item>
            <Form.Item label='选项'>
                <Form.List name='options'>
                    {(fileds, { add ,remove }) => (
                        <>
                            {fileds.map(({key, name}, index) => {
                                return <Space key={key} align="baseline">
                                    <Form.Item name={[name, 'text']} 
                                    rules={[{required: true, message:'请输入选项文字'}
                                    ,{ 
                                        validator: (_, text) => {
                                            const {options = []} = form.getFieldsValue()
                                            let num = 0
                                            options.forEach((opt: OptionType) => {
                                                if(opt.text === text) num++
                                            });
                                            if(num === 1) return Promise.resolve()
                                            return Promise.reject(new Error('和其他选项重复了'))
                                        } 
                                    }]}>
                                        <Input placeholder="请输入选项文字..."/>
                                    </Form.Item>
                                    <Form.Item>
                                        {index > 1 && <MinusCircleOutlined onClick={() => remove(name)}/>}
                                    </Form.Item>
                                </Space> 
                            })}
                            <Form.Item>
                                <Button 
                                type='link' 
                                onClick={() => add({text: '',value: ''})} 
                                icon={<PlusOutlined />}
                                block>
                                    添加选项
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
            <Form.Item label='默认选中' name='value'>
                <Select value={value} options={ options.map( ({ value, text}) => ({ value, label: text || '' })) }></Select>
            </Form.Item>
            <Form.Item name='isVertical' valuePropName="checked">
                <Checkbox>竖向排列</Checkbox>
            </Form.Item>
        </Form>
    )
}

export default PropComponent