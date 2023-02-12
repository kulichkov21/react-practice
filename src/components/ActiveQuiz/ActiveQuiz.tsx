import React from "react";
import './ActiveQuiz.css';

const ActiveQuiz = (props: any) => (
    <div className='ActiveQuiz'>
<p className='Question'>
    <span>
        <strong>1. </strong>
        &nbsp;
        Question
    </span>

    <small>4 from 12</small>
</p>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
    </div>
)

export default ActiveQuiz