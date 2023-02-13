import React from "react";
import './FinishedQuiz.css';

const FinishedQuiz = (props: any) => {
    const successCount = Object.keys(props.results).reduce((total: any, key: any) => {
        if (props.results[key] === 'success') {
            total++;
        }
        return total
    }, 0)
    return (
        <div className='FinishedQuiz'>
<ul>
    {props.quiz.map((quizItem: any, index: number) => {
        const classes: string[] = ['fa', props.results[quizItem.id] === 'error' ?
        'fa-times' : 'fa-check', props.results[quizItem.id]];
        return (
            <li key={index}>
                <strong>{index + 1 }</strong> &nbsp
                {quizItem.question}
                <i className={classes.join(' ')}></i>
            </li>
        )
    })}

</ul>
            <p>Right answers: {successCount} of {props.quiz.length}</p>
            <div>
                <button onClick={props.onRetry}>Repeat</button>
            </div>
        </div>
    )
}

export default FinishedQuiz;