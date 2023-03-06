import React from 'react';
import './App.css';
import Layout from "./hoc/Layout/Layout";
import {BrowserRouter, Navigate, Route, Routes, useParams} from "react-router-dom";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";
import ElementWrapper from "./hoc/ElementWrapper/ElementWrapper";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {Dispatch} from "redux";
import {autoLogin} from "./store/actions/auth";

function App(props: any) {



    let routes = (
        <Routes>
            <Route path="/auth" element={<Auth/>}></Route>
            <Route path="/quiz-creator" element={<QuizCreator/>}></Route>
            <Route path="/quiz/:id" element={<ElementWrapper {...{Component: Quiz}} />}></Route>
            <Route path="/" element={<QuizList/>}></Route>
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>

    )

    if (props.isAuthentificated) {
        routes = (
            <Routes>
                <Route path="/logout" element={<Logout/>}></Route>
                <Route path="/quiz-creator" element={<QuizCreator/>}></Route>
                <Route path="/quiz/:id" element={<ElementWrapper {...{Component: Quiz}} />}></Route>
                <Route path="/" element={<QuizList/>}></Route>
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>

        )
    }


    return (
        <Layout>
            {routes}
        </Layout>
    );
}

function mapStateToProps(state: any) {
    return {
        isAuthentificated: !!state.auth.token
    }
}


function mapDispatchToProps(dispatch: Dispatch) {
    return {
       autoLogin: () => dispatch(autoLogin())
    }
}
export default connect(mapStateToProps)(App);

