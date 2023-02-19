import React, {Component} from "react";
import './QuizList.css';
import {NavLink} from "react-router-dom";
import axios from "axios";

export default class QuizList extends Component<any, any> {

    renderQuizes() {
        return [1, 2, 3].map((quiz, index) => {
            return (
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz}>Test {quiz}</NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        axios.get('https://react-quiz-5eab9-default-rtdb.firebaseio.com/quiz.json').then(r => console.log(r))
    }

    render() {
        return (
            <div className='QuizList'>
                <div>
                    <h1>Список тестов</h1>

                    <ul>
                        {
                            this.renderQuizes()
                        }
                    </ul>
                </div>

            </div>
        )
    }
}