import {Component} from "react";
import './Quiz.css'
import {IQuizState} from "./types/quiz-state.interface";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component<any, IQuizState> {

    state = {
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {
                        id: 1,
                        text: 'Черный'
                    },
                    {
                        id: 2,
                        text: 'Голубой'
                    },
                    {
                        id: 3,
                        text: 'Зеленый'
                    },
                    {
                        id: 4,
                        text: 'Красный'
                    }
                ]
            }
        ]
    }

     onAnswerClickHandler = (answerId: number) => {
        console.log(answerId)
    }

    render() {
        return (
            <div className='Quiz'>

                <div className='QuizWrapper'>
                    <h1>Ответьте на вопросы</h1>
                    <ActiveQuiz
                        question={this.state.quiz[0].question}
                        answers={this.state.quiz[0].answers}
                        onAnswerClick={this.onAnswerClickHandler}/>
                </div>

            </div>
        )
    }
}

export default Quiz;