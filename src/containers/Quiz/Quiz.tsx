import {Component} from "react";
import './Quiz.css'
import {IQuizState} from "./types/quiz-state.interface";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component<any, IQuizState> {

    state = {
        quiz: [
            {
                answers: [
                    {
                        text: 'Answer1'
                    },
                    {
                        text: 'Answer2'
                    },
                    {
                        text: 'Answer3'
                    },
                    {
                        text: 'Answer4'
                    }
                ]
            }
        ]
    }

    render() {
return (
    <div className='Quiz'>

        <div className='QuizWrapper'>
            <h1>Ответьте на вопросы</h1>
            <ActiveQuiz answers={this.state.quiz[0].answers}/>
        </div>

    </div>
)
    }
}

export default Quiz;