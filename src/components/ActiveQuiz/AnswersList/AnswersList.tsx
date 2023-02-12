import React from "react";
import './AnswersList.css';
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props: any) => (
    <ul className='AnswersList'>
        {props.answers.map((answer: any, index: number) => {
           return (
               <AnswerItem
                   state={props.state ? props.state[answer.id] : null}
                   key={index}
                   answer={answer}
               onAnswerClick={props.onAnswerClick}></AnswerItem>
           )
        }
        )}
    </ul>
)

export default AnswersList