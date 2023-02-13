import React, {Component} from "react";
import './Drawer.css';
import Backdrop from "../../Ui/Backdrop/Backdrop";

const links = [1, 2, 3]

class Drawer extends Component<any, any> {

    renderLinks(): any {
        return links.map((link, i) => {
            return (
                <li key={i}>
                    <a>Link {link}</a>
                </li>
            )
        })
    }

    render() {
        const cls: string[] = ['Drawer'];
        if (!this.props.isOpen) cls.push('close')
        return (
            <React.Fragment>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null }
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