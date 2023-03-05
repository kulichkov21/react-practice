import {AnyAction, Dispatch} from "redux";
import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes";
import axios from "axios";

export function createQuizQuestion(item: any): AnyAction {
    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }
}

export function resetQuizCreation(): AnyAction {
    return {
        type: RESET_QUIZ_CREATION
    }
}

export function finishCreateQuiz(): any {
    return async (dispatch: Dispatch, getState: any) => {
        const state = getState().create;
        await axios.post('https://react-quiz-5eab9-default-rtdb.firebaseio.com/quizes.json', state.quiz);
        dispatch(resetQuizCreation())
    }
}