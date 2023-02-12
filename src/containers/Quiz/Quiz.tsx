import {Component} from "react";
import './Quiz.css'
import {IQuizState} from "./types/quiz-state.interface";

class Quiz extends Component<IQuizState, any> {

    state: IQuizState = {
        quiz: []
    }

    render() {
return (
    <div className='Quiz'>
<h1>Quiz</h1>
    </div>
)
    }
}

export default Quiz;