import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { authorRoute } from "./services/routes/author.route.js";
import { postRoute } from "./services/routes/post.route.js";

// Inizializza la gestione dei file .env
config();

// Crea una porta
const PORT = process.env.PORT || 3005;

// Crea il server
const app = express();

// Abilita la comunicazione con dati JSON
app.use(express.json());

// cors

app.use(cors());

// http/localhost:3001/api
app.use("/api", authorRoute);

app.use("/api", postRoute);

// Funzione per inizializzare il server
const initServer = async () => {
  try {
    // Aspettiamo di connetterci al database
    await mongoose.connect(process.env.DBURL);

    // Connessi al database
    console.log("Connesso al database");

    // Abilita server
    app.listen(PORT, () => {
      console.log(`Il nostro server sta ascoltando alla porta ${PORT}`);
    });
  } catch (err) {
    console.error("Connessione al database fallita!", err);
  }
};

// Invochiamo la funzione per inizializzare il server
initServer();
