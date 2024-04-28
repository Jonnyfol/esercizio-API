import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import AuthorList from "../../components/blog/blog-author/AuthorList";
import "./styles.css";

const Home = (props) => {
  return (
    <Container fluid="sm">
      <h1 className="blog-main-title mb-3">Benvenuto sullo Strive Blog!</h1>
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
