import {Component} from "react";
import './Quiz.css'
import {IQuizState} from "./types/quiz-state.interface";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/Ui/Loader/Loader";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";


class Quiz extends Component<any, any> {


    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuiz();
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
                                onRetry={this.props.retryQuiz}
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
                                onAnswerClick={this.props.quizAnswerClick}
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
        quizAnswerClick: (answerId: number) => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);