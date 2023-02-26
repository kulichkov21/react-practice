import {Action, AnyAction} from "redux";
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "../actions/actionTypes";

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
        case QUIZ_SET_STATE:
            return {...state, answerState: action.answerState, results: action.results}
        case FINISH_QUIZ:
            return {...state, finished: true}
        case QUIZ_NEXT_QUESTION:
            return {...state, answerState: null, currentQuestion: action.questionNumber}
        case QUIZ_RETRY:
            return {...state,  answerState: null, finished: false, currentQuestion: 0, results: {}}
        default:
            return {...state}
    }
}