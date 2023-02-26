import {Action, AnyAction} from "redux";
import {FETCH_QUIZ_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "../actions/actionTypes";

export interface IQuizState {
    loading: boolean
    quizes: Array<any>
    error: string | null;
    results: any;
    currentQuestion: number;
    answerState: any;
    finished: boolean;
    quiz: Array<any> | null;

}

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    currentQuestion: 0,
    answerState: null,
    finished: false,
    quiz: null
}

export default function quizReducer(state: IQuizState = initialState, action: AnyAction) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {...state, loading: true};
        case FETCH_QUIZES_SUCCESS:
            return {...state, loading: false, quizes: action.quizes};
        case FETCH_QUIZES_ERROR:
            return {...state, loading: false};
        case FETCH_QUIZ_SUCCESS:
            return {...state, loading: false, quiz: action.quiz}
        default:
            return {...state}
    }
}