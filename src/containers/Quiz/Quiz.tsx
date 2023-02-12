import {Component} from "react";
import './Quiz.css'
import {IQuizState} from "./types/quiz-state.interface";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component<any, IQuizState> {

    state = {
        quiz: []
    }

    render() {
return (
    <div className='Quiz'>

        <div className='QuizWrapper'>
            <h1>Quiz</h1>
            <ActiveQuiz/>
        </div>

    </div>
)
    }
}

export default Quiz;