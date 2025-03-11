import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConf, { QuestionParagraphPropsType } from "./QuestionParagraph";
import QuestionInfoConf,{ QuestionInfoPropsType } from "./QuestionInfo";
import QuestionTextareaConf,{ QuestionTextareaPropsType } from "./QuestionTextarea";
import QuestionRadioConf, { QuestionRadioPropsType, QuestionRadioStatPropsType } from "./QuestionRadio";
import QuestionCheckboxConf, { QuestionCheckboxPropsType, QuestionCheckboxStatPropsType } from "./QuestionCheckbox";

//各个组件的 prop type
export type ComponentPropsType = 
QuestionInputPropsType & 
QuestionTitlePropsType & 
QuestionParagraphPropsType & 
QuestionInfoPropsType & 
QuestionTextareaPropsType & 
QuestionRadioPropsType & 
QuestionCheckboxPropsType 

type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType

//组件的配置
export type ComponentConfType = {
    title: string,
    type: string,
    Component: FC<ComponentPropsType>
    PropComponent: FC<ComponentPropsType>
    defaultProps: ComponentPropsType
    StatComponent?: FC<ComponentStatPropsType>
}

//全部组件配置
const componentConfList: ComponentConfType[] = 
[QuestionInfoConf,
    QuestionInputConf,
    QuestionTitleConf,
    QuestionParagraphConf,
    QuestionTextareaConf,
    QuestionRadioConf,
    QuestionCheckboxConf]

//组件分组
export const componentConfGroup = [
    {
        groupId: 'textGroup',
        groupName: '文本显示',
        components: [QuestionInfoConf,QuestionTitleConf,QuestionParagraphConf]
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf,QuestionTextareaConf]
    },
    {
        groupId: 'chooseGroup',
        groupName: '用户选择',
        components: [QuestionRadioConf,QuestionCheckboxConf]
    }
]

export function getComponentConfByType (type: string) {
    return componentConfList.find(c => c.type === type)
}