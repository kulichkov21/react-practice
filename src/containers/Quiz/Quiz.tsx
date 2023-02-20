import {Component, ComponentProps} from "react";
import './Quiz.css'
import {IQuizState} from "./types/quiz-state.interface";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/Ui/Loader/Loader";


class Quiz extends Component<any, any> {

    state = {
        results: {},
        currentQuestion: 0,
        answerState: null,
        finished: false,
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = (answerId: number) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') return;
        }
        const question = this.state.quiz[this.state.currentQuestion];
        const results = this.state.results;
        // @ts-ignore
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
            answerState: null, finished: false, currentQuestion: 0, results: {}
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`quizes/${this.props.match.params.id}.json`);
            const quiz = response.data;

            this.setState({quiz, loading: false})
        } catch (error) {
            console.log(error)
        }
    }

    render() {

        return (
            <div className='Quiz'>

                <div className='QuizWrapper'>
                    <h1>Ответьте на вопросы</h1>

                    {this.state.loading ?
                    <Loader/>
                        :
                        this.state.finished ?
                        <FinishedQuiz
                            onRetry={this.retryHandler}
                            results={this.state.results}
                            quiz={this.state.quiz}
                        />
                        :
                        <ActiveQuiz
                            quizLength={this.state.quiz.length}
                            currentQuestion={this.state.currentQuestion + 1}
                            // @ts-ignore
                            question={this.state.quiz[this.state.currentQuestion].question}
                            // @ts-ignore
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