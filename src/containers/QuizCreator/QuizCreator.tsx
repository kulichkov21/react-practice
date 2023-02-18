import React, {Component} from "react";
import './QuizCreator.css';
import Button from "../../components/Ui/Button/Button";
import {createControl} from "../../form/formFramework";
import Input from "../../components/Ui/Input/Input";
import Select from "../../components/Ui/Select/Select";

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
        rightAnswerId: 1,
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

    selectChangeHandler = (event: any) => {
      this.setState({rightAnswerId: +event.target.value});
    }

    render() {
const select = <Select
label='Выберите правильный ответ'
value={this.state.rightAnswerId}
onChange={this.selectChangeHandler}
options={[{text: 1, value: 1}, {text: 2, value: 2}, {text: 3, value: 3}, {text: 4, value: 4}]}
/>

        return (
            <div className='QuizCreator'>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        {select}

                        <Button type={'primary'} onClick={this.addQuestionHandler}>Добавить вопрос</Button>
                        <Button type={'success'} onClick={this.createQuizHandler}>Сохранить тест</Button>

                    </form>
                </div>
            </div>
        )
    }
}