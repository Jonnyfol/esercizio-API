import React from "react";
import { Button, Container } from "react-bootstrap";

export default function GoogleAuth() {
  const handleGoogleAuth = (e) => {
    // URL per l'accesso con Google
    const googleLoginUrl = "http://localhost:3005/authors/googleLogin";
    window.open(googleLoginUrl, "_self");
  };
  return (
    <Container className="mt-2">
      <Button onClick={handleGoogleAuth} variant="secondary">
        Accedi con Google
      </Button>
    </Container>
  );
}
