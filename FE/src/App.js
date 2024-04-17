import React from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Await,
} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [author, setAuthor] = useState([]);

  const getAuthors = async () => {
    try {
      const response = await fetch("http://localhost:3005/authors");
      if (response.ok) {
        const authors = await response.json();
        console.log(authors);
        setAuthor(authors);
      } else {
        console.log("non funziona");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/new" element={<NewBlogPost />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
