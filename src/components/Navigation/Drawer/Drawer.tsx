import React, {Component} from "react";
import './Drawer.css';
import Backdrop from "../../Ui/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const links = [
    {to: '/', label: 'Список'},
    {to: '/auth', label: 'Авторизация'},
    {to: '/quiz-creator', label: 'Создать тест'}
]

class Drawer extends Component<any, any> {

    clickHandler = () => {
        this.props.onClose();
    }

    renderLinks(): any {
        return links.map((link, i) => {
            return (
                <li key={i}>
                    <NavLink
                    to={link.to}
                    className={({ isActive }) => isActive ? 'active' : undefined }
                    onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls: string[] = ['Drawer'];
        if (!this.props.isOpen) cls.push('close')
        return (
            <React.Fragment>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
            </React.Fragment>

        )
    }
}

export default Drawer