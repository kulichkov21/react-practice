import {Component, ComponentProps} from "react";
import './Quiz.css'
import {IQuizState} from "./types/quiz-state.interface";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import {useLocation, useNavigate, useParams} from "react-router-dom";


class Quiz extends Component<any, any> {

    state = {
        results: {},
        currentQuestion: 0,
        answerState: null,
        finished: false ,
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
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') return;
        }
        const question = this.state.quiz[this.state.currentQuestion];
        const results = this.state.results;
        if (question.rightAnswerId === answerId) {
            // @ts-ignore
            if (!results[question.id]) {
                // @ts-ignore
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState((prevState: IQuizState) => {
                        return {finished: true}
                    })
                } else {
                    this.setState({
                        currentQuestion: this.state.currentQuestion + 1,
                        answerState: null
                    });

                }
                window.clearTimeout(timeout);
            }, 1000)

        } else {
            // @ts-ignore
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            });
        }

    }

    isQuizFinished() {
        return this.state.currentQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            answerState: null, finished: false,currentQuestion: 0, results: {}
        })
    }

    componentDidMount() {
        console.log('quiz id', this)
    }

    render() {
        return (
            <div className='Quiz'>

                <div className='QuizWrapper'>
                    <h1>Ответьте на вопросы</h1>
                    {this.state.finished ?
                        <FinishedQuiz
                            onRetry={this.retryHandler}
                            results={this.state.results}
                            quiz={this.state.quiz}
                        />
                        :
                        <ActiveQuiz
                            quizLength={this.state.quiz.length}
                            currentQuestion={this.state.currentQuestion + 1}
                            question={this.state.quiz[this.state.currentQuestion].question}
                            answers={this.state.quiz[this.state.currentQuestion].answers}
                            onAnswerClick={this.onAnswerClickHandler}
                            state={this.state.answerState}
                        />
                    }

                </div>

            </div>
        )
    }
}

export default Quiz;