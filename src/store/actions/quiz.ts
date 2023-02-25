import {AnyAction, Dispatch} from "redux";
import axios from "../../axios/axios-quiz";
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "./actionTypes";

export function fetchQuizes(): any {
    return async (dispatch: Dispatch) => {
    dispatch(fetchQuizesStart())
    try {
        const response = await axios.get('/quizes.json');
        const quizes: any = [];
        Object.keys(response.data).forEach((key, index) => {
            quizes.push({id: key, name: `test n ${index + 1}`})
        });
        dispatch(fetchQuizesSuccess(quizes))
    } catch (error) {
        dispatch(fetchQuizesError(error))
    }
}
}

export function fetchQuizesStart(): AnyAction {
return {
    type: FETCH_QUIZES_START
}
}

export function fetchQuizesSuccess(quizes: Array<any>): AnyAction {
return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
}
}

function fetchQuizesError(error: any): AnyAction {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}