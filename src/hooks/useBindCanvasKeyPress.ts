import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { copySelectedComponent, pasteCopiedComponent, removeSelectedComponent, selectNextComponent, selectPreComponent } from '../store/componentsReducer'
import { ActionCreators } from "redux-undo";

function isActiveElement() {
    const activeElem = document.activeElement
    //没有加dnd-kit
    //if(activeElem === document.body) return true

    //add after
    if(activeElem === document.body) return true
    if(activeElem?.matches('div[role="button"]')) return true
    return false
}

function useBindCanvasKeyPress() {
    const dispatch = useDispatch()

    useKeyPress(['backspace','delete'], () => {
        if(!isActiveElement()) return 
        dispatch(removeSelectedComponent())
    })

    useKeyPress(['ctrl.c','meta.c'],() => {
        if(!isActiveElement()) return 
        dispatch(copySelectedComponent())
    })

    useKeyPress(['ctrl.v','meta.v'], () => {
        if(!isActiveElement()) return 
        dispatch(pasteCopiedComponent())
    })

    useKeyPress(['uparrow'], () => {
        if(!isActiveElement()) return 
        dispatch(selectPreComponent())
    })

    useKeyPress(['downarrow'], () => {
        if(!isActiveElement()) return 
        dispatch(selectNextComponent())
    })

    useKeyPress(['ctrl.z','meta.z'],() => {
        if(!isActiveElement()) return
        dispatch(ActionCreators.undo())
    },{
        exactMatch: true
    })

    useKeyPress(['ctrl.shift.z','meta.shift.z'],() => {
        if(!isActiveElement()) return
        dispatch(ActionCreators.redo())
    },{
        exactMatch: true
    })
}

export default useBindCanvasKeyPress