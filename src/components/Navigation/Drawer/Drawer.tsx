import React, {Component} from "react";
import './Drawer.css';

const links = [1, 2, 3 ]

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
  <nav className={cls.join(' ')}>
      <ul>
          {this.renderLinks()}
      </ul>
  </nav>
)
    }
}

export default Drawer