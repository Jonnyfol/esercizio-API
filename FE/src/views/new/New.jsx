import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const NewBlogPost = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    cover: "",
    readTimeValue: "",
    readTimeUnit: "min",
    authorName: "",
    authorAvatar: "",
    content: "",
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3005/posts",
        formData
      );
      console.log("Dati inviati con successo:", response.data);
      setAlert({ type: "success", message: "Dati inviati con successo!" });
      setFormData({
        category: "",
        title: "",
        cover: "",
        readTimeValue: "",
        readTimeUnit: "min",
        authorName: "",
        authorAvatar: "",
        content: "",
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000); // Nascondi l'alert dopo 3 secondi
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
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTitle">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCover">
            <Form.Label>Link dell'immagine di copertina</Form.Label>
            <Form.Control
              type="url"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formReadTime">
            <Form.Label>Tempo di lettura (minuti)</Form.Label>
            <Form.Control
              type="number"
              name="readTimeValue"
              value={formData.readTimeValue}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAuthorName">
            <Form.Label>Nome dell'autore</Form.Label>
            <Form.Control
              type="text"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAuthorAvatar">
            <Form.Label>Link dell'avatar dell'autore</Form.Label>
            <Form.Control
              type="url"
              name="authorAvatar"
              value={formData.authorAvatar}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formContent">
            <Form.Label>Contenuto HTML dell'articolo</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="content"
              value={formData.content}
              onChange={handleChange}
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
                authorName: "",
                authorAvatar: "",
                content: "",
              })
            }
          >
            Cancella
          </Button>
        </Form>
        <Button variant="outline-primary" className="mt-2" href="/">
          Torna alla Home
        </Button>
      </div>
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
    </Container>
  );
};

export default NewBlogPost;
