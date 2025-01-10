import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { produce } from 'immer'

export type ComponentInfoType = {
    fe_id: string,
    title: string,
    type: string,
    props: ComponentPropsType
}

export type ComponentsStateType = {
    selectedID: string
    componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
    selectedID: '',
    componentList: []
} 

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        //重置组件
        resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
            return action.payload
        } ,

        //修改ID
        changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
            draft.selectedID = action.payload
        } ) ,
 
        //添加新组件
        addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload 
            const { selectedID, componentList } = draft
            const index = componentList.findIndex(c => c.fe_id === selectedID)

            if(index < 0) {
                draft.componentList.push(newComponent)
            }else {
                draft.componentList.splice(index + 1, 0, newComponent)
            }
            draft.selectedID = newComponent.fe_id
        }),

        //
        changeComponentProps: produce((draft: ComponentsStateType, 
            action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType}>) => {
                const { fe_id, newProps } = action.payload
                const curComp = draft.componentList.find(c => c.fe_id === fe_id)
                if(curComp) {
                    curComp.props = {
                        ...curComp.props,
                        ...newProps
                    }
                }
            })
    }
}) 

export const { resetComponents, changeSelectedId, addComponent, changeComponentProps } = componentsSlice.actions
export default componentsSlice.reducer