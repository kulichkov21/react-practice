import React, {Component} from "react";
import './Auth.css';
import Button from "../../components/Ui/Button/Button";

export default class Auth extends Component<any, any> {

    loginHandler = () => {

    }

    registerHandler = () => {

    }

    submitHandler = (event:any) => {
        event.preventDefault();
    }

    render() {
        return (
            <div className='Auth'>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className='AuthForm'>
                        <input type="text"/>
                        <input type="text"/>
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