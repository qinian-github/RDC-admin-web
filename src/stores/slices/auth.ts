import { createSlice } from '@reduxjs/toolkit'
import { globalConfig } from '@/config/globalConfig'

const initLoginInfo = JSON.parse(window.localStorage.getItem(globalConfig.SESSION_LOGIN_INFO) || '0')

const initialState = {
    username: initLoginInfo ? initLoginInfo.username : undefined,
    role: initLoginInfo ? initLoginInfo.role : undefined,
}

export const loginInfoSlice = createSlice({
    name: 'loginInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state = action.payload
            window.localStorage.setItem(globalConfig.SESSION_LOGIN_INFO, JSON.stringify(state))
        },
        removeUserInfo: () => {
            window.localStorage.removeItem(globalConfig.SESSION_LOGIN_INFO)
        },
    },
})

export const { setUserInfo } = loginInfoSlice.actions
export const { removeUserInfo } = loginInfoSlice.actions

export default loginInfoSlice.reducer
