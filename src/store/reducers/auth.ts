import {AnyAction} from "redux";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

export interface IAuthState {
    token: string | null
}

const initialState: IAuthState = {
    token: null
}

export default function authReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null
            }
        default:
            return state
    }
}