import React, { useEffect, useState, createContext } from "react";
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

// Crea il contesto per il token di autenticazione
export const AuthContext = createContext();

function App() {
  const [author, setAuthor] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

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

  // Funzione per il login
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Funzione per il logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {isAuthenticated ? (
            <>
              {!author && (
                <Route path="/" element={<Navigate to="/new-author" />} />
              )}
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/new" element={<NewBlogPost />} />
              <Route path="/new-author" element={<NewAuthor />} />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
