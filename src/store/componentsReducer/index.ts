import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components/QuestionComponents";
import { produce } from 'immer'
import { getNextSelectedId, insertNewComponent } from "./utils";
import cloneDeep from 'lodash.clonedeep'
import { arrayMove } from "@dnd-kit/sortable";


export type ComponentInfoType = {
    fe_id: string
    title: string
    type: string
    isHidden?: boolean
    isLocked?: boolean
    props: ComponentPropsType
}

export type ComponentsStateType = {
    selectedID: string
    componentList: Array<ComponentInfoType>
    copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
    selectedID: '',
    componentList: [],
    copiedComponent: null,
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
            insertNewComponent(draft, newComponent)
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
            }),

        //删除选中的组件
        removeSelectedComponent: produce(
            (draft: ComponentsStateType) => {
                const { componentList = [], selectedID: removeID } = draft

                const newSelectedID = getNextSelectedId(removeID, componentList)
                draft.selectedID = newSelectedID
                
                const index = componentList.findIndex(c => c.fe_id === removeID)
                componentList.splice(index, 1)
            }
        )   ,

        //隐藏 / 显示 组件
        changeComponentHidden: produce(
            (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string, isHidden: boolean}>) => {
                const { componentList = [] } = draft
                const { fe_id, isHidden } = action.payload

                let newSelectedID = ''
                if(isHidden) newSelectedID = getNextSelectedId(fe_id, componentList)
                else newSelectedID = fe_id
                draft.selectedID = newSelectedID
                const curComp = componentList.find(c => c.fe_id === fe_id)
                if(curComp) curComp.isHidden = isHidden
            }
        ),

        //锁定 / 解锁组件
        toggleComponentLocked: produce(
            (draft :ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
                const { fe_id } = action.payload
                const curComp = draft.componentList.find(c => c.fe_id === fe_id)
                if(curComp) curComp.isLocked = !curComp.isLocked
            }),

        // 
        copySelectedComponent: produce(
            (draft: ComponentsStateType) => {
                const { selectedID, componentList = []} = draft
                const selectedComponent = componentList.find(c => c.fe_id === selectedID)
                if(selectedComponent == null) return
                draft.copiedComponent = cloneDeep(selectedComponent)
            })  ,
         
        pasteCopiedComponent: produce(
            (draft: ComponentsStateType) => {
                const { copiedComponent } = draft
                if(copiedComponent == null) return 

                copiedComponent.fe_id = nanoid()
                insertNewComponent(draft, copiedComponent)

            }
        ),
        
        selectPreComponent: produce(
            (draft: ComponentsStateType) => {
                const { selectedID, componentList } = draft
                const selectIndex = componentList.findIndex(c => c.fe_id === selectedID)
                if(selectIndex < 0) return 
                if(selectIndex <= 0)return
                draft.selectedID = componentList[selectIndex - 1].fe_id 
            }),

        selectNextComponent: produce(
            (draft: ComponentsStateType) => {
                const { selectedID, componentList } = draft
                const selectIndex = componentList.findIndex(c => c.fe_id === selectedID)
                if(selectIndex < 0) return 
                if(selectIndex + 1 === componentList.length) return
                draft.selectedID = componentList[selectIndex + 1].fe_id 
            }
        ),    

        //修改组件标题
        changeComponentTitle: produce(
            (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string}>) => {
                const {title, fe_id} = action.payload
                const curComp = draft.componentList.find(c => c.fe_id === fe_id)
                if(curComp) curComp.title = title
            }
        ),

        //移动组件位置
        moveComponent: produce(
            (draft: ComponentsStateType, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
                const { componentList: curComponentList } = draft
                const { oldIndex, newIndex } = action.payload
                draft.componentList = arrayMove(curComponentList, oldIndex, newIndex)
            }
        ),
    }
}) 

export const { 
    resetComponents, 
    changeSelectedId, 
    addComponent, 
    changeComponentProps,
    removeSelectedComponent,
    changeComponentHidden,
    toggleComponentLocked,
    copySelectedComponent,
    pasteCopiedComponent,
    selectPreComponent,
    selectNextComponent,
    changeComponentTitle,
    moveComponent
 } = componentsSlice.actions
export default componentsSlice.reducer