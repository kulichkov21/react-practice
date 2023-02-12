
import React from "react";
import './AnswerItem.css'

const AnswerItem = (props: any) => {
    return (
  <li className='AnswerItem'>
      {props.answer.text}
  </li>
    )
}

export default AnswerItem;