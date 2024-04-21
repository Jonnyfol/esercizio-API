import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const BlogItem = ({ post }) => {
  return (
    <Link to={`/blog/${post._id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img variant="top" src={post.cover} className="blog-cover" />{" "}
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <div>
            di <span>{post.author.name}</span>
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
