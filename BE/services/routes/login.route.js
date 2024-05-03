import bcrypt from "bcryptjs";
import { authMiddleware, generateJWT } from "../auth/index.js";
import User from "../models/user.models.js";
import { Router } from "express";

export const loginRoute = Router();

loginRoute.post("/register", async (req, res, next) => {
  try {
    // Crea nuovo utente
    let user = await User.create({
      // Crea l'utente con tutte le informazioni passate nel body
      ...req.body,
      // Escludi password, perchè verrà gestita diversamente
      password: await bcrypt.hash(req.body.password, 10),
    });

    //sendEmail(`<h1>${req.body.username} ti sei registrato correttamente</h1>`, req.body.email);

    res.send(user);
  } catch (err) {
    next(err);
  }
});

// Login Endpoint
loginRoute.post("/login", async (req, res, next) => {
  try {
    // Trova l'utente con lo username inserito nella richiesta
    let userFound = await User.findOne({
      username: req.body.username,
    });

    // L'utente è stato trovato?
    if (userFound) {
      // La password coincide?
      const isPasswordMatching = await bcrypt.compare(
        req.body.password,
        userFound.password
      );

      // La password coincide
      if (isPasswordMatching) {
        // Genera Token
        const token = await generateJWT({
          username: userFound.username,
        });

        // Mandiamo in risposta l'utente trovato e il token assegnato
        res.send({ user: userFound, token });
      } else {
        res.status(400).send("Password sbagliata");
      }
    } else {
      res.status(400).send("Utente non trovato");
    }
  } catch (err) {
    next(err);
  }
});
