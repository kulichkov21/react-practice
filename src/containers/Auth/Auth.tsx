import React, {Component} from "react";
import './Auth.css';
import Button from "../../components/Ui/Button/Button";
import Input from "../../components/Ui/Input/Input";
import axios from "axios";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";
import {useNavigate} from "react-router-dom";

class Auth extends Component<any, any> {

    state = {
        isFormValid: false,
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
        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, true)
    }

    registerHandler = () => {
        this.props.auth(this.state.formControls.email.value, this.state.formControls.password.value, false)
    }

    submitHandler = (event: any) => {
        event.preventDefault();
    }

    private onChangeHandler(event: any, controlName: string) {

        const formControls = {...this.state.formControls};
        // @ts-ignore
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        // @ts-ignore
        formControls[controlName] = control;

        let isFormValid: boolean = true;

        Object.keys(formControls).forEach(name => {
            // @ts-ignore
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({formControls, isFormValid});
    }

    validateEmail = (email: any) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    private validateControl(value: any, validation: any): boolean {
        if (!validation) return true;

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = (this.validateEmail(value)!) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
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

                        <Button type='success' onClick={this.loginHandler} disabled={!this.state.isFormValid}>
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


function mapDispatchToProps(dispatch: Dispatch) {
    return {
        auth: (email: string, password: string, isLogin: boolean) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)