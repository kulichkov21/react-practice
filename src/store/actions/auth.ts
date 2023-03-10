import {AnyAction, Dispatch} from "redux";
import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";
import {Navigate, redirect} from "react-router-dom";
import React from "react";

export function auth(email: string, password: string, isLogin: boolean): any {
    return async (dispatch: Dispatch) => {
        const authData = {email, password, returnSecureToken: true};

        let url: string = isLogin ?
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVYw8QD10L4gq90bmMWf-5Rlcsqbcnah4'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVYw8QD10L4gq90bmMWf-5Rlcsqbcnah4';

        const response = await axios.post(url, authData)
        const data = response.data;

        const expirationDate = new Date(new Date().getTime() + data.expiresIn*1000);

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate.toString());

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));



    }
}

export function authSuccess(token: string): AnyAction {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time: any): any {
    return (dispatch: Dispatch) => {
    setTimeout(() => {
        dispatch(logout())
    }, time * 1000)
    }
}

export function logout(): AnyAction {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin(): any {
    return async (dispatch: Dispatch) =>  {
        const token = localStorage.getItem('token');
        if (!token) dispatch(logout())
        if (token) {
            const expirationDate = new Date(localStorage.getItem('expirationDate') ?? '');

            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime())/1000))
            }

        }
    }
}