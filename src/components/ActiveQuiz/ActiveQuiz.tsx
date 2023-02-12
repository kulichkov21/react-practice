import React from "react";
import './ActiveQuiz.css';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props: {answers: any}) => (
    <div className='ActiveQuiz'>
<p className='Question'>
    <span>
        <strong>1. </strong>
        &nbsp;
        Question
    </span>

    <small>4 from 12</small>
</p>
    <AnswersList answers={props.answers}></AnswersList>
    </div>
)

export default ActiveQuiz