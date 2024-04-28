import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";

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
