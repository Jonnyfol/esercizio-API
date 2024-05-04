import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verifica che entrambi i campi username e password siano compilati
      if (!credentials.username || !credentials.password) {
        setError("Username e password sono richiesti.");
        return;
      }

      // Esegui la richiesta di login al backend
      const response = await fetch("http://localhost:3005/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Errore durante il login.");
      }

      // Salva il token nel localStorage dopo il login
      localStorage.setItem("token", data.token);
      localStorage.setItem("avatar", data.user.avatar);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("userId", data.user.userId);
      console.log(data);

      // Reindirizza alla pagina Home dopo il login
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container style={{ marginTop: "200px" }}>
      <h2>Effettua il login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="outline-primary" className="mt-2" href="/new-author">
          Iscriviti
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
