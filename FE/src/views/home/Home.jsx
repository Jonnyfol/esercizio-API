import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogList from "../../components/blog/blog-list/BlogList";
import AuthorList from "../../components/blog/blog-author/AuthorList";
import "./styles.css";

const Home = (props) => {
  const handleLogout = () => {
    // Rimuovi il token dal localStorage
    localStorage.removeItem("token");
    // localStorage.removeItem("username");
    // localStorage.removeItem("avatar");
    // localStorage.removeItem("authorId");
  };

  return (
    <Container fluid="sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="blog-main-title">Benvenuto sullo Strive Blog!</h1>
        <Button variant="danger" as={Link} to="/login" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Row>
        <Col xs={9}>
          <BlogList />
        </Col>
        <Col xs={3}>
          <AuthorList />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
