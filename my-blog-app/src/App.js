import React from "react"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import './App.css';
import PostsPage from "./components/Postpage";

function App() {
    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/" element={<div>Startsida</div>} />
            </Routes>
        </Router>
        </AuthProvider>
    );
}

export default App;

