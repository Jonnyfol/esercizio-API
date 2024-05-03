import React, { useState } from "react";
import { Container, Form, Button, Alert, Navbar } from "react-bootstrap";
import NavBar from "../../components/navbar/BlogNavbar";

const NewAuthor = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    bornDate: "",
    avatar: "",
    username: "",
    password: "",
    confirmPassword: "",
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
      // Controllo che le password coincidano
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Le password non coincidono");
      }

      const response = await fetch("http://localhost:3005/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Errore durante la creazione dell'autore");
      }
      console.log("Dati inviati con successo:", response.data);
      setAlert({ type: "success", message: "Dati inviati con successo!" });
      setFormData({
        name: "",
        lastName: "",
        email: "",
        bornDate: "",
        avatar: "",
        username: "",
        password: "",
        confirmPassword: "", // Resetta il campo per confermare la password
      });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (error) {
      console.error("Errore durante l'invio dei dati:", error);
      setAlert({
        type: "danger",
        message:
          error.message || "Qualcosa è andato storto. Riprova più tardi.",
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
          <h2>Iscriviti</h2>
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

            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formAvatar">
              <Form.Label>Link dell'immagine di profilo</Form.Label>
              <Form.Control
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Iscriviti
            </Button>
            <Button
              variant="secondary"
              className="ml-2 my-3 mx-3"
              onClick={() =>
                setFormData({
                  name: "",
                  lastName: "",
                  email: "",
                  bornDate: "",
                  avatar: "",
                  password: "",
                  confirmPassword: "",
                })
              }
            >
              Cancella
            </Button>
          </Form>
          <Button variant="outline-primary" className="mt-2" href="/login">
            Accedi
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
    </div>
  );
};

export default NewAuthor;
