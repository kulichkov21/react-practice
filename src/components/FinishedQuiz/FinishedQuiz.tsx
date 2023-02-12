import React from "react";
import './FinishedQuiz.css';

const FinishedQuiz = (props: any) => {
    return (
        <div className='FinishedQuiz'>
<ul>
    <li>
        <strong>1.</strong>
        Question
        <i className={'fa fa-times error'}/>
    </li>
    <li>
        <strong>2.</strong>
        Question
        <i className={'fa fa-check success'}/>
    </li>
</ul>
            <p>Right answers: 4 of 10</p>
            <div>
                <button>Repeat</button>
            </div>
        </div>
    )
}

export default FinishedQuiz;