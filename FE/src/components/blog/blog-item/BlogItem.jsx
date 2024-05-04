import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";
import CommentSection from "../comment-section/CommentSection";

const BlogItem = ({ post, onDelete }) => {
  const [showComments, setShowComments] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1]));
      setUserData(userData);
    }
  }, []);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3005/posts/${post._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        console.log("Post eliminato con successo");
        onDelete(post._id);
      } else {
        console.log("Errore durante l'eliminazione del post");
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del post:", error);
    }
  };

  const isAuthor =
    post.author && post.author.name === localStorage.getItem("username");

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
      {isAuthor && (
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          Elimina
        </Button>
      )}
    </div>
  );
};

export default BlogItem;
