import React from 'react';
import './App.css';
import Layout from "./hoc/Layout/Layout";
import {Route, Routes, useParams} from "react-router-dom";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";
import ElementWrapper from "./hoc/ElementWrapper/ElementWrapper";

function App() {

    return (
        <Layout>
    <Routes>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/quiz-creator" element={<QuizCreator/>}></Route>
        <Route path="/quiz/:id" element={<ElementWrapper {...{Component: Quiz}} />} ></Route>
        <Route path="/" element={<QuizList/>}></Route>

    </Routes>
        </Layout>
    );
}

export default App;
