import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Row, Col } from "react-bootstrap";

const CommentSection = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  useEffect(() => {
    fetchComments();
    setUser(JSON.parse(atob(localStorage.getItem("token").split(".")[1])));
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ text: commentText, author: user.username }), // Inserisci il nome dell'autore del commento
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

  const handleDeleteComment = async (commentId, commentAuthor) => {
    try {
      if (user.username === commentAuthor) {
        const response = await fetch(
          `http://localhost:3005/posts/${postId}/comments/${commentId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.ok) {
          console.log("Commento eliminato con successo");
          fetchComments();
        } else {
          console.log("Errore durante l'eliminazione del commento");
        }
      } else {
        console.log("Non sei autorizzato a eliminare questo commento");
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del commento:", error);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:3005/posts/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ text: editedCommentText }), // Aggiorna il testo del commento
        }
      );
      if (response.ok) {
        console.log("Commento modificato con successo");
        fetchComments();
        setEditingCommentId(null);
        setEditedCommentText("");
      } else {
        console.log("Errore durante la modifica del commento");
      }
    } catch (error) {
      console.error("Errore durante la modifica del commento:", error);
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
            {editingCommentId === comment._id ? (
              <Row>
                <Col>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button
                    variant="success"
                    onClick={() => handleEditComment(comment._id)}
                  >
                    Salva
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col>{comment.text}</Col>
                <Col>{comment.author}</Col>{" "}
                {/* Visualizza il nome dell'autore */}
                <Col xs="auto">
                  {user.username === comment.author && (
                    <>
                      <Button
                        variant="danger"
                        className="mr-2"
                        onClick={() =>
                          handleDeleteComment(comment._id, comment.author)
                        }
                      >
                        Elimina
                      </Button>
                      <Button
                        variant="info"
                        onClick={() => {
                          setEditingCommentId(comment._id);
                          setEditedCommentText(comment.text);
                        }}
                      >
                        Modifica
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CommentSection;
