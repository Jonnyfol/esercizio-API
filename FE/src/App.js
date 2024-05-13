import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import NewAuthor from "./views/NewAuthor/NewAuthor";
import LoginPage from "./views/loginpage/LoginPage";
import Welcome from "./components/welcome/Welcome";
import { AuthContext } from "./components/context/token";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    // Recupera gli autori solo se l'utente è autenticato
    if (isAuthenticated) {
      getAuthors();
    }
  }, [isAuthenticated]);

  const getAuthors = async () => {
    try {
      const response = await fetch("http://localhost:3005/authors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const authors = await response.json();
        setAuthor(authors);
      } else {
        console.log("Errore nella richiesta degli autori");
      }
    } catch (error) {
      console.error("Errore durante il recupero degli autori:", error);
    }
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/new-author" element={<NewAuthor />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/new-author" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="/new-author" element={<NewAuthor />} />
        <Route path="/home" element={<Home />} />
        <Route path="/*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
