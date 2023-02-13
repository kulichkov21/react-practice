import React, {Component} from "react";
import './Layout.css';
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";

class Layout extends Component<any, any> {

    state: any = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    render() {
        return (
            <div className='Layout'>

<MenuToggle onToggle={this.toggleMenuHandler} isOpen={this.state.menu}></MenuToggle>

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;