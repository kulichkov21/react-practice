import {Component} from "react";
import './Quiz.css'
import {IQuizState} from "./types/quiz-state.interface";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component<any, IQuizState> {

    state = {
        currentQuestion: 0,
        answerState: null,
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
        const question = this.state.quiz[this.state.currentQuestion];
        if (question.rightAnswerId === answerId) {

            this.setState({
                answerState: {[answerId]: 'success'}
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log('finished')
                } else {
                    this.setState({currentQuestion: this.state.currentQuestion + 1,
                        answerState: null});

                }
                window.clearTimeout(timeout);
            }, 1000)

        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            });
        }

    }

    isQuizFinished() {
        return this.state.currentQuestion + 1 === this.state.quiz.length
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
                        onAnswerClick={this.onAnswerClickHandler}
                        state={this.state.answerState}
                    />
                </div>

            </div>
        )
    }
}

export default Quiz;