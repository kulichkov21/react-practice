import React from "react";
import './FinishedQuiz.css';
import Button from "../Ui/Button/Button";

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
         <Button onClick={props.onRetry} type='primary'>Repeat</Button>
                <Button onClick={props.onRetry} type='success'>Go to all tests</Button>
            </div>
        </div>
    )
}

export default FinishedQuiz;