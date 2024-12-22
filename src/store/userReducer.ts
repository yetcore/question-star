import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserStateType = {
    username: string,
    nickname: string
}

const INIT_SATATE: UserStateType = { username: '' , nickname: ''}

export const userSlice = createSlice({
    name:'user',
    initialState:INIT_SATATE,
    reducers: {
        loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
            return action.payload
        },
        logoutReducer: () => INIT_SATATE
    }
})

export const { loginReducer,logoutReducer } = userSlice.actions
export default userSlice.reducer