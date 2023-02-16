import React from 'react';
import './App.css';
import Layout from "./hoc/Layout/Layout";
import {Route, Routes} from "react-router-dom";
import Quiz from "./containers/Quiz/Quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";

function App() {
    return (
        <Layout>
    <Routes>
        <Route path="/auth" element={<Auth/>}></Route>
        <Route path="/quiz-creator" element={<QuizCreator/>}></Route>
        <Route path="/quiz/:id" element={<Quiz/>}></Route>
        <Route path="/" element={<QuizList/>}></Route>

    </Routes>
        </Layout>
    );
}

export default App;
