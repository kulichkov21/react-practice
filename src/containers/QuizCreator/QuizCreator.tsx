import React, {Component} from "react";
import './QuizCreator.css';
import Button from "../../components/Ui/Button/Button";
import {createControl} from "../../form/formFramework";
import Input from "../../components/Ui/Input/Input";

function createOptionControl(number: number) {
    return createControl({
        label: `Вариант ${number}`, errorMessage: 'Значение не может быть пустым', id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос', errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

export default class QuizCreator extends Component<any, any> {

    state = {
       quiz: [],
        formControls: createFormControls()
    }

    submitHandler = (event: any) => event.preventDefault();
    addQuestionHandler = () => {

    }
    createQuizHandler = () => {

    }

    changeHandler = (value: string, controlName: string) => {

    }

    renderControls(): any {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            // @ts-ignore
            const control = this.state.formControls[controlName];

            return (
                <React.Fragment>
                <Input
                label={control.label}
                value={control.value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                errorMessage={control.errorMessage}
                onChange={(event: any) => this.changeHandler(event.target.value, control)}
                />

            {index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    }


    render() {
        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        <select></select>

                        <Button type={'primary'} onClick={this.addQuestionHandler}>Добавить вопрос</Button>
                        <Button type={'success'} onClick={this.createQuizHandler}>Сохранить тест</Button>

                    </form>
                </div>
            </div>
        )
    }
}