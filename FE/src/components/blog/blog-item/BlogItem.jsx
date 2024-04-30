import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import CommentSection from "../comment-section/CommentSection";

const BlogItem = ({ post }) => {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div>
      <Link to={`/blog/${post._id}`} className="blog-link">
        <Card className="blog-card">
          <Card.Img variant="top" src={post.cover} className="blog-cover" />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <div>
              di <span>{post.author && post.author.name}</span>
            </div>
          </Card.Footer>
        </Card>
      </Link>
      {showComments && <CommentSection postId={post._id} />}
      <Button
        variant="primary"
        size="sm"
        onClick={toggleComments}
        style={{ marginTop: "10px" }}
      >
        {showComments ? "Nascondi Commenti" : "Vedi Commenti"}
      </Button>
    </div>
  );
};

export default BlogItem;
