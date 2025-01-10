import { useSelector } from "react-redux";
import { StateType } from "../store";
import { ComponentsStateType } from "../store/componentsReducer";

function useGetComponentInfo () {
    const components = useSelector <StateType> (state => state.components) as ComponentsStateType
    const { componentList = [], selectedID } = components
    const selectedComponent = componentList.find(c => c.fe_id === selectedID)

    return {
        componentList,
        selectedID,
        selectedComponent
    }
}

export default useGetComponentInfo