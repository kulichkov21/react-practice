import React, {Component} from "react";
import './Auth.css';
import Button from "../../components/Ui/Button/Button";
import Input from "../../components/Ui/Input/Input";

export default class Auth extends Component<any, any> {

    state = {
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = (event: any) => {
        event.preventDefault();
    }

    private onChangeHandler(event: any, controlName: string) {
        console.log(controlName, event.target.value)
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            // @ts-ignore
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={(event: any) => this.onChangeHandler(event, controlName)}
                />
            )
        });

    }

    render() {
        return (
            <div className='Auth'>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className='AuthForm'>

                        {this.renderInputs()}

                        <Button type='success' onClick={this.loginHandler}>
                            Войти
                        </Button>
                        <Button type='primary' onClick={this.registerHandler}>
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

}