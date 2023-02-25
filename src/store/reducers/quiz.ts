import {Action, AnyAction} from "redux";
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "../actions/actionTypes";

export interface IQuizState {
    loading: boolean
    quizes: Array<any>
    error: string | null
}

const initialState = {
    quizes: [],
    loading: false,
    error: null
}

export default function quizReducer(state: IQuizState = initialState, action: AnyAction) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {...state, loading: true};
        case FETCH_QUIZES_SUCCESS:
            return {...state, loading: false, quizes: action.quizes};
        case FETCH_QUIZES_ERROR:
            return {...state, loading: false};
        default:
            return {...state}
    }
}