import {AnyAction, Dispatch} from "redux";
import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./actionTypes";
import {IQuizState} from "../../containers/Quiz/types/quiz-state.interface";

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

export function fetchQuizById(quizId: string): any {
    return async (dispatch: any) => {
        dispatch(fetchQuizesStart());

        try {
            const response = await axios.get(`quizes/${quizId}.json`);
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz));
        } catch (error) {
            dispatch(fetchQuizesError(error));
        }

    }
}

export function fetchQuizSuccess(quiz: any): AnyAction {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function quizAnswerClick(answerId: number): any {
    return (dispatch: any, getState: any) => {
        const state = getState().quiz;
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') return;
        }
        const question = state.quiz[state.currentQuestion];
        const results = state.results;
        // @ts-ignore
        if (question.rightAnswerId === answerId) {
            // @ts-ignore
            if (!results[question.id]) {
                // @ts-ignore
                results[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, results));

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(quizNextQuestion(state.currentQuestion + 1));
                }
                window.clearTimeout(timeout);
            }, 1000)

        } else {
            // @ts-ignore
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results));
        }
    }
}

function isQuizFinished(state: any): boolean {
    return state.currentQuestion + 1 === state.quiz.length
}

export function quizSetState(answerState: any, results: any): AnyAction {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }

}

export function finishQuiz(): AnyAction {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(questionNumber: number): AnyAction {
    return {
        type: QUIZ_NEXT_QUESTION,
        questionNumber
    }
}

export function retryQuiz(): AnyAction {
    return {
        type: QUIZ_RETRY
    }

}


