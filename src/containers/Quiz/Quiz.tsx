import {Component, ComponentProps} from "react";
import './Quiz.css'
import {IQuizState} from "./types/quiz-state.interface";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/Ui/Loader/Loader";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {fetchQuizById, fetchQuizes} from "../../store/actions/quiz";


class Quiz extends Component<any, any> {

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

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    render() {

        return (
            <div className='Quiz'>

                <div className='QuizWrapper'>
                    <h1>Ответьте на вопросы</h1>

                    {this.props.loading || !this.props.quiz ?
                        <Loader/>
                        :
                        this.props.finished ?
                            <FinishedQuiz
                                onRetry={this.retryHandler}
                                results={this.props.results}
                                quiz={this.props.quiz}
                            />
                            :
                            <ActiveQuiz
                                quizLength={this.props.quiz.length}
                                currentQuestion={this.props.currentQuestion + 1}
                                // @ts-ignore
                                question={this.props.quiz[this.props.currentQuestion].question}
                                // @ts-ignore
                                answers={this.props.quiz[this.props.currentQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                state={this.props.answerState}
                            />
                    }


                </div>

            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        results: state.quiz.results,
        currentQuestion: state.quiz.currentQuestion,
        answerState: state.quiz.answerState,
        finished: state.quiz.finished,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchQuizById: (id: string) => dispatch(fetchQuizById(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);