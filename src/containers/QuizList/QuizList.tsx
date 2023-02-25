import React, {Component} from "react";
import './QuizList.css';
import {NavLink} from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/Ui/Loader/Loader";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {fetchQuizes} from "../../store/actions/quiz";

class QuizList extends Component<any, any> {

    renderQuizes() {
        return this.props.quizes.map((quiz: any) => {

            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes();
    }


    render() {
        return (
            <div className='QuizList'>
                <div>

                    <h1>Список тестов</h1>
                    {this.props.loading && this.props.quizes.length !== 0 ?
                        <Loader/>
                        :
                        <ul>
                            {
                                this.renderQuizes()
                            }
                        </ul>
                    }
                </div>

            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizList)