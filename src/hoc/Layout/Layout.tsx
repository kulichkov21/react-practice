import React, {Component} from "react";

class Layout extends Component<any, any> {
    render() {
        return (
            <div>


                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;