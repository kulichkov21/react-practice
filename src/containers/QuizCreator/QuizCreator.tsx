import React, {Component} from "react";
import './QuizCreator.css';
import Button from "../../components/Ui/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Input from "../../components/Ui/Input/Input";
import Select from "../../components/Ui/Select/Select";
import axios from "axios";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

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

class QuizCreator extends Component<any, any> {

    state = {
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = (event: any) => event.preventDefault();
    addQuestionHandler = (event: any) => {
        event.preventDefault();

        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };

        this.props.createQuizQuestion(questionItem);

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        });


    }
    createQuizHandler = async (event: any) => {
        event.preventDefault();

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        });
        this.props.finishCreateQuiz();

    }

    changeHandler = (value: string, controlName: string) => {
        const formControls = {...this.state.formControls};
        // @ts-ignore
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation)

        // @ts-ignore
        formControls[controlName] = control;
        this.setState({formControls, isFormValid: validateForm(formControls)});

    }

    renderControls(): any {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            // @ts-ignore
            const control = this.state.formControls[controlName];

            return (
                <React.Fragment key={index}>
                    <Input
                        key={index}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={(event: any) => this.changeHandler(event.target.value, controlName)}
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

                        <Button disabled={!this.state.isFormValid}
                                type={'primary'} onClick={this.addQuestionHandler}>Добавить вопрос</Button>
                        <Button disabled={this.props.quiz.length === 0}
                                type={'success'} onClick={this.createQuizHandler}>Сохранить тест</Button>

                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        createQuizQuestion: (item: any) => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)