'use client'
import { useContext, createContext, useReducer } from "react";
import AuthService from "@/services/AuthService";
import React from "react";
type AuthStateType = any

const AuthState = createContext<AuthStateType>(null)

type AuthDispatchType = {
    onLoginFormChange: (event: React.ChangeEvent) => void;
    onLogin: () => Promise<boolean>;
    onLogout: () => void;
} | null

const AuthDispatch = createContext<AuthDispatchType>(null)

const ACTION_TYPES = {
    LOGIN_FORM_CHANGE: 'login_form_change',
    LOGIN_SUCCESS: 'login_success',
    LOGIN_ERROR: 'login_error',
    LOGOUT: 'logout',
    ERROR: 'error',
}

type Action = {
    type: string;
    payload?: any;
    error?: any;
}

const ACTIONS: Record<string, (state: AuthStateType, action: Action) => any> = {
    [ACTION_TYPES.LOGIN_FORM_CHANGE]: (state, action) => {
        const { name, value } = action.payload
        return { ...state, loginForm: { ...state["loginForm"], [name]: value } }
    },
    [ACTION_TYPES.LOGIN_SUCCESS]: (state, action) => {
        return { ...state, isLogin: true }
    },
    [ACTION_TYPES.LOGIN_ERROR]: (state, action)=> {
        return {...state, isLogin: false, error: action.error }
    },
    [ACTION_TYPES.LOGOUT]: (state, action)=> {
        return {...state, isLogin: false }
    }
}

const INITIAL_STATE = {
    isLogin: AuthService._isLogin(),
    loginForm: {},
    error: ''
}

function AuthReducer(state: AuthStateType, action: Action) {
    return ACTIONS[action.type](state, action) || state;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispath] = useReducer(AuthReducer, INITIAL_STATE)

    const handleLoginFormUpdate = (event: React.ChangeEvent) => {
        // @ts-ignore
        const { name, value } = event.target;
        dispath({
            type: ACTION_TYPES.LOGIN_FORM_CHANGE,
            payload: { name, value }
        })
    }

    const handleLogin = () => {
        const { email, password } = state.loginForm
        return AuthService.login(email, password).then(() => {
            dispath({
                type: ACTION_TYPES.LOGIN_SUCCESS,
            })
            return true
        }).catch(error => {
            dispath({
                type: ACTION_TYPES.LOGIN_ERROR,
                error,
            })
            return false
        })
    }

    const handleLogout = () => {
        AuthService.logout().then(() => {
            dispath({
                type: ACTION_TYPES.LOGOUT,
            })
        }).catch(error => {
            dispath({
                type: ACTION_TYPES.ERROR,
                error,
            })
        })
    }    

    const actions = {
        onLoginFormChange: handleLoginFormUpdate,
        onLogin: handleLogin,
        onLogout: handleLogout,
    }

    return <AuthState.Provider value={state}>
        <AuthDispatch.Provider value={actions}>
            {children}
        </AuthDispatch.Provider>
    </AuthState.Provider>
}

const useAuthState = () => {
    const authState = useContext(AuthState)
    if (authState == undefined) {
        throw new Error("useAuthState() must be used within a AuthProvider");
    }
    return authState;
}

const useAuthDispatch = () => {
    const authDispatch = useContext(AuthDispatch)
    if (authDispatch == undefined) {
        throw new Error("useAuthDispatch() must be used within a AuthProvider");
    }
    return authDispatch;
}
export { AuthProvider, useAuthState, useAuthDispatch }
