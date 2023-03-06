import React, {Component} from "react";
import './Drawer.css';
import Backdrop from "../../Ui/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";


class Drawer extends Component<any, any> {

    clickHandler = () => {
        this.props.onClose();
    }

    renderLinks(links: Array<any>): any {
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

        const links = [
            {to: '/', label: 'Список'}
        ]

        if (this.props.isAuthentificated) {
            links.push( {to: '/quiz-creator', label: 'Создать тест'});
            links.push( {to: '/logout', label: 'Выйти'});
        } else {
            links.push( {to: '/auth', label: 'Авторизация'});
        }

        return (
            <React.Fragment>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
            </React.Fragment>

        )
    }
}

export default Drawer