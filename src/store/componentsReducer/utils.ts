import { ComponentInfoType, ComponentsStateType } from "./index";


export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
    const curComponent = componentList.filter(c => !c.isHidden)
    const index = curComponent.findIndex(c => c.fe_id === fe_id)
    if(index < 0) return ''

    let newSelectedID = ''
    const length = curComponent.length
    if(length <= 1) newSelectedID = ''
    else {
        if(index + 1 === length) {
            newSelectedID = curComponent[index - 1].fe_id
        }else {
            newSelectedID = curComponent[index + 1].fe_id
        }
    }

    return newSelectedID
}

export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
    const { selectedID, componentList } = draft
    const index = componentList.findIndex(c => c.fe_id === selectedID)

    if(index < 0) {
        draft.componentList.push(newComponent)
    }else {
        draft.componentList.splice(index + 1, 0, newComponent)
    }
    draft.selectedID = newComponent.fe_id
}