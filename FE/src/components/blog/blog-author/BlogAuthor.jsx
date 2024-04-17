import React, { useState, useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = () => {
  const [author, setAuthor] = useState(null);

  const getAuthors = async () => {
    try {
      const response = await fetch("http://localhost:3005/api/authors");
      if (response.ok) {
        const authors = await response.json();
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
    <div>
      {author && (
        <Row>
          <Col xs={"auto"} className="pe-0">
            <Image className="blog-author" src={author.avatar} roundedCircle />
          </Col>
          <Col>
            <div>di</div>
            <h6>{`${author.name} ${author.lastName}`}</h6>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BlogAuthor;
