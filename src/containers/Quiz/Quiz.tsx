import {Component} from "react";
import './Quiz.css'
import {IQuizState} from "./types/quiz-state.interface";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component<any, IQuizState> {

    state = {
        currentQuestion: 0,
        quiz: [
            {
                id: 1,
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
            },
            {
                id: 2,
                question: 'Какой твой любимый цвет  ?',
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
        this.setState({currentQuestion: this.state.currentQuestion + 1});
    }

    render() {
        return (
            <div className='Quiz'>

                <div className='QuizWrapper'>
                    <h1>Ответьте на вопросы</h1>
                    <ActiveQuiz
                        quizLength={this.state.quiz.length}
                        currentQuestion={this.state.currentQuestion + 1}
                        question={this.state.quiz[this.state.currentQuestion].question}
                        answers={this.state.quiz[this.state.currentQuestion].answers}
                        onAnswerClick={this.onAnswerClickHandler}/>
                </div>

            </div>
        )
    }
}

export default Quiz;