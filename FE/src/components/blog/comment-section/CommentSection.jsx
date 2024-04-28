import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Row, Col } from "react-bootstrap";

const CommentSection = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/posts/${postId}/comments`
      );
      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData);
      } else {
        console.log("Errore durante il recupero dei commenti");
      }
    } catch (error) {
      console.error("Errore durante il recupero dei commenti:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: commentText, author: "Nome Autore" }),
        }
      );
      if (response.ok) {
        console.log("Commento inviato con successo");
        fetchComments();
        setCommentText("");
      } else {
        console.log("Errore durante l'invio del commento");
      }
    } catch (error) {
      console.error("Errore durante l'invio del commento:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:3005/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Commento eliminato con successo");
        fetchComments();
      } else {
        console.log("Errore durante l'eliminazione del commento");
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del commento:", error);
    }
  };

  return (
    <div>
      <Form.Group controlId="commentText">
        <Form.Control
          as="textarea"
          rows={3}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Inserisci il tuo commento qui"
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>
        Invia
      </Button>
      <ListGroup className="mt-3">
        {comments.map((comment) => (
          <ListGroup.Item key={comment._id}>
            <Row>
              <Col>{comment.text}</Col>
              <Col xs="auto">
                <Button
                  variant="danger"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Elimina
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CommentSection;
