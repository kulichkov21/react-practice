import React from "react";
import './AnswersList.css';
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props: any) => (
    <ul className='AnswersList'>
        {props.answers.map((answer: any, index: number) => {
           return (
               <AnswerItem key={index} answer={answer}></AnswerItem>
           )
        }
        )}
    </ul>
)

export default AnswersList