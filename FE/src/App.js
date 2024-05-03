import React, { useEffect, useState } from "react";
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

function App() {
  const [author, setAuthor] = useState(null);

  const getAuthors = async () => {
    try {
      const response = await fetch("http://localhost:3005/authors");
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

  useEffect(() => {
    getAuthors();
  }, []);

  // Controlla se l'utente è già autenticato tramite il token nel localStorage
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Se l'utente non è autenticato, reindirizzalo alla pagina di login */}
        {!isAuthenticated && (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="/login" element={<LoginPage />} /> {/* Pagina di login */}
        {/* Rotte accessibili solo dopo l'accesso */}
        {isAuthenticated && (
          <>
            {/* Reindirizza alla pagina NewAuthor se non ci sono autori */}
            {!author && (
              <Route path="/" element={<Navigate to="/new-author" />} />
            )}
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/new" element={<NewBlogPost />} />
            <Route path="/new-author" element={<NewAuthor />} />
          </>
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
