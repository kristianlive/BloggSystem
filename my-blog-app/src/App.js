import React from "react"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import {AuthContext, AuthProvider} from "./context/AuthContext";
import './App.css';
import PostsPage from "./components/Postpage";
import PostDetail from "./components/PostDetail";

function App() {
    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/posts" element={<PostsPage />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/" element={<div>Startsida</div>} />
            </Routes>
        </Router>
        </AuthProvider>
    );
}
//INSTRUKTIONERNA TILL LÄRAREN för att köra pplikationen.
// 1. Starta Backend BloggSystemApplication
// 2. Starta Frontend i Frontend mappen "my-blogg-app" cd my-blogg-app .
// 3. Logga in på http://localhost:3000/login på webben användarnamn: kristian lös: 123
// 4. Efter inloggingen du får token samt omderigeras till ttp://localhost:3000/posts
// 5. Sök med namn vilken post du vill, sedan tryck på titeln för att se detaljerna på post.
export default App;

