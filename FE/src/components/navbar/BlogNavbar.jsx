import React, { useState } from "react";
import { Button, Container, Navbar, Form, FormControl } from "react-bootstrap";

import logo from "../../assets/logo.png";
import "./styles.css";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand>
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
