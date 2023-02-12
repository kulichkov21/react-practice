import React from "react";
import './ActiveQuiz.css';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props: {answers: any, question: string, onAnswerClick: any,
    currentQuestion: number, quizLength: number}) => (
    <div className='ActiveQuiz'>
<p className='Question'>
    <span>
        <strong>1. </strong>
        &nbsp;
        {props.question}
    </span>

    <small>
        {props.currentQuestion} from {props.quizLength}</small>
</p>
    <AnswersList
        onAnswerClick={props.onAnswerClick}
        answers={props.answers}></AnswersList>
    </div>
)

export default ActiveQuiz