import { createSlice } from '@reduxjs/toolkit'
import { globalConfig } from '@/config/globalConfig'

const initLoginInfo = JSON.parse(window.localStorage.getItem(globalConfig.SESSION_LOGIN_INFO) || '0')

const initialState = {
    info: initLoginInfo ? initLoginInfo.info : {},
    token: initLoginInfo ? initLoginInfo.token : ''
}

export const loginInfoSlice = createSlice({
    name: 'loginInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state = action.payload
            window.localStorage.setItem(globalConfig.SESSION_LOGIN_INFO, JSON.stringify(state))
            return action.payload
        },
        removeUserInfo: (state,action) => {
            state = action.payload
            window.localStorage.removeItem(globalConfig.SESSION_LOGIN_INFO)
            return action.payload
        },
    },
})

export const { setUserInfo } = loginInfoSlice.actions
export const { removeUserInfo } = loginInfoSlice.actions

export default loginInfoSlice.reducer
