// Import dei moduli necessari
import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { authorRoute } from "./services/routes/author.route.js";
import { postRoute } from "./services/routes/post.route.js";
import {
  badRequestHandler,
  genericErrorHandler,
  notfoundHandler,
  unauthorizedHandler,
} from "./errorHandlers.js";
import { loginRoute } from "./services/routes/login.route.js";
import { authMiddleware } from "./services/auth/index.js";
import passport from "passport";
import googleStrategy from "./services/config/passport.js";

config();
// Creazione della porta del server
const PORT = process.env.PORT || 3005;
const app = express();
// Middleware per consentire la comunicazione con dati JSON e CORS

app.use(cors());
app.use(express.json());
passport.use("google", googleStrategy);

// Configurazione delle route
app.use("/authors", authorRoute);
app.use("/", loginRoute);
app.use("/posts", postRoute);

// Gestione degli errori
app.use(badRequestHandler);
app.use(unauthorizedHandler);
app.use(notfoundHandler);
app.use(genericErrorHandler);

// Funzione per inizializzare il server
const initServer = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    app.listen(PORT, () => {
      console.log(`Server is listening at port: ${PORT}`);
    });
  } catch (err) {
    // Gestione degli errori durante la connessione al database
    console.error("Connessione al database fallita!", err);
  }
};

// Inizializzazione del server
initServer();
