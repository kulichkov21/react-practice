import React, {Component} from "react";
import './Layout.css';
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import {connect} from "react-redux";

class Layout extends Component<any, any> {

    state: any = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({menu: false});
    }

    render() {
        console.log(this.props)
        return (
            <div className='Layout'>
                <Drawer onClose={this.menuCloseHandler} isAuthentificated={this.props.isAuthentificated} isOpen={this.state.menu}/>
                <MenuToggle onToggle={this.toggleMenuHandler} isOpen={this.state.menu}></MenuToggle>

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
return {
    isAuthentificated: !!state.auth.token
}
}

export default connect(mapStateToProps)(Layout);