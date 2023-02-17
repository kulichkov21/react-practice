import React, {Component} from "react";
import './Auth.css';
import Button from "../../components/Ui/Button/Button";
import Input from "../../components/Ui/Input/Input";

export default class Auth extends Component<any, any> {

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = (event: any) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className='Auth'>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className='AuthForm'>
                        <Input label="Email"

                        />
                        <Input label="Password"
                        errorMessage="Test"
                        />
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