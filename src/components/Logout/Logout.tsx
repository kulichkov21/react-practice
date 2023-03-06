import {connect} from "react-redux";
import {Dispatch} from "redux";
import {auth, logout} from "../../store/actions/auth";
import React from "react";
import {Navigate, NavLink, redirect} from "react-router-dom";

class Logout extends React.Component<any, any> {

    componentDidMount() {
        this.props.logout();
        <Navigate to="/" replace={true}/>

    }

    render() {
        return undefined
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)