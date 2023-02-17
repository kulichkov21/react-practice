import React from "react";
import './Input.css';

function isInvalid({valid, touched, shouldValidate}: any): boolean {
    return !valid && shouldValidate && touched
}

const Input = (props: any) => {

    const inputType: string = props.type || 'text';
    const cls = ['Input'];
    const htmlFor: string = `${inputType}-${Math.random()}`

    if (isInvalid(props)) {
        cls.push('invalid');
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input type={inputType}
                   id={htmlFor}
                   value={props.value}
                   onChange={props.onChange}
            />

            {
                isInvalid(props) ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null
            }

        </div>
    )
}

export default Input;