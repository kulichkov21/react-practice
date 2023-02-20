import React, {Component} from "react";
import './QuizList.css';
import {NavLink} from "react-router-dom";
import axios from "axios";

export default class QuizList extends Component<any, any> {

    state = {
        quizes: []
    }

    renderQuizes() {
        return this.state.quizes.map((quiz: any, index) => {

            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://react-quiz-5eab9-default-rtdb.firebaseio.com/quizes.json');
            const quizes: any = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({id: key, name: `test n ${index + 1}`})
            })
            this.setState({quizes});
        } catch (error) {
            console.log(error)
        }

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