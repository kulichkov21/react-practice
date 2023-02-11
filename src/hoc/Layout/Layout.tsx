import React, {Component} from "react";
import './Layout.css';

class Layout extends Component<any, any> {
    render() {
        return (
            <div className='Layout'>


                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;