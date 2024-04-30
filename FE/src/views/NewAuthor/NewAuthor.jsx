import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Navbar } from "react-bootstrap";
import NavBar from "../../components/navbar/BlogNavbar";

const NewAuthor = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    bornDate: "",
    avatar: "",
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
        "http://localhost:3005/authors",
        formData
      );
      console.log("Dati inviati con successo:", response.data);
      setAlert({ type: "success", message: "Dati inviati con successo!" });
      setFormData({
        name: "",
        lastName: "",
        email: "",
        bornDate: "",
        avatar: "",
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
    <div>
      <Navbar />
      <Container fluid style={{ marginTop: "100px" }}>
        <div style={{ padding: "20px", marginTop: "70px" }}>
          <h2>Aggiungi un nuovo autore</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBornDate">
              <Form.Label>Data di nascita</Form.Label>
              <Form.Control
                type="text"
                name="bornDate"
                value={formData.bornDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAvatar">
              <Form.Label>URL dell'avatar</Form.Label>
              <Form.Control
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Invia
            </Button>
            <Button
              variant="secondary"
              className="ml-2, my-3, mx-3"
              onClick={() =>
                setFormData({
                  name: "",
                  lastName: "",
                  email: "",
                  bornDate: "",
                  avatar: "",
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
            className="mt-3,"
          >
            {alert.message}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default NewAuthor;
