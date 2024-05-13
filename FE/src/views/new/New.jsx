import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/context/token";

const NewBlogPost = ({ postId }) => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    cover: "",
    readTimeValue: "",
    readTimeUnit: "min",
    content: "",
  });

  const [alert, setAlert] = useState(null);
  const { token } = useContext(AuthContext);

  const handleQuillChange = (value) => {
    setFormData({
      ...formData,
      content: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        category: formData.category,
        title: formData.title,
        cover: formData.cover,
        readTime: {
          value: formData.readTimeValue,
          unit: formData.readTimeUnit,
        },
        author: {
          name: localStorage.getItem("username"),
        },
        content: formData.content,
      };

      const response = await fetch("http://localhost:3005/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Errore durante la creazione del post");
      }

      console.log("Dati inviati con successo:", response.data);
      setAlert({ type: "success", message: "Dati inviati con successo!" });
      setFormData({
        category: "",
        title: "",
        cover: "",
        readTimeValue: "",
        readTimeUnit: "min",

        content: "",
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (error) {
      console.error("Errore durante l'invio dei dati:", error);
      setAlert({
        type: "danger",
        message: "Qualcosa è andato storto. Riprova più tardi.",
      });
    }
  };

  const handleAlertDismiss = () => {
    setAlert(null);
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`http://localhost:3005/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        console.log("Post eliminato con successo");
        // Aggiorna lo stato dell'app o esegui altre operazioni necessarie dopo l'eliminazione del post
      } else {
        console.log("Errore durante l'eliminazione del post");
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione del post:", error);
    }
  };

  return (
    <Container fluid style={{ marginTop: "100px" }}>
      <div style={{ padding: "20px", marginTop: "70px" }}>
        <h2>Crea un nuovo post</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategory">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="formTitle">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="formCover">
            <Form.Label>Link dell'immagine di copertina</Form.Label>
            <Form.Control
              type="url"
              name="cover"
              value={formData.cover}
              onChange={(e) =>
                setFormData({ ...formData, cover: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="formReadTime">
            <Form.Label>Tempo di lettura (minuti)</Form.Label>
            <Form.Control
              type="number"
              name="readTimeValue"
              value={formData.readTimeValue}
              onChange={(e) =>
                setFormData({ ...formData, readTimeValue: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group controlId="formContent">
            <Form.Label>Contenuto HTML dell'articolo</Form.Label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={handleQuillChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Invia
          </Button>
          <Button
            variant="secondary"
            className="ml-2"
            onClick={() =>
              setFormData({
                category: "",
                title: "",
                cover: "",
                readTimeValue: "",
                readTimeUnit: "min",
                content: "",
              })
            }
          >
            Cancella
          </Button>
        </Form>
        <Button variant="outline-primary" className="mt-2" as={Link} to="/">
          Torna alla Home
        </Button>

        {alert && (
          <Alert
            variant={alert.type}
            onClose={handleAlertDismiss}
            dismissible
            className="mt-3"
          >
            {alert.message}
          </Alert>
        )}
      </div>
    </Container>
  );
};

export default NewBlogPost;
