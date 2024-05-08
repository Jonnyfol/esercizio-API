import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:3005/authors");
        if (response.ok) {
          const data = await response.json();
          setAuthors(data);
        } else {
          console.log("Errore durante il recupero degli autori");
        }
      } catch (error) {
        console.error("Errore durante il recupero degli autori:", error);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div>
      <Button
        as={Link}
        to="/new"
        className="blog-navbar-add-button bg-dark"
        size="lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
        </svg>
        Nuovo Articolo
      </Button>

      {authors.map((author) => (
        <Card key={author._id} className="mb-3">
          <Card.Body>
            <Row>
              <Col xs={3}>
                <img
                  src={author.avatar}
                  alt="Author"
                  style={{ width: "100%", borderRadius: "50%" }}
                />
              </Col>
              <Col xs={9}>
                <h5>
                  {author.name} {author.lastName}
                </h5>
                <p>Email: {author.email}</p>
                <p>Data di nascita: {author.bornDate}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AuthorList;
