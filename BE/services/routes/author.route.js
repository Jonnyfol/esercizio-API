import { Router } from "express";
import User from "../models/user.models.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "ddsgne1cx",
  api_key: "238131585247738",
  api_secret: "AJtDAO9FcvEX8xFUWbGFrhNjnHM",
});

// Creiamo un nuovo Router e esportiamolo per essere utilizzato altrove
export const authorRoute = Router();

// Richiesta POST all'indirizzo "/authors"
authorRoute.post("/", async (req, res, next) => {
  try {
    // Creiamo un nuovo documento utente, con i valori presi dal body della richiesta
    let user = await User.create(req.body);
    // Mandiamo in risposta l'utente creato e uno status code di 201 (Created)
    res.status(201).send(user);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta PUT all'indirizzo "/:id"
authorRoute.put("/:id", async (req, res, next) => {
  try {
    // Cerchiamo un documento utente dal suo id e modifichiamolo con i valori presi dal body della richiesta
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // L'oggetto restituito deve essere quello aggiornato
    });
    res.send(user);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta DELETE all'indirizzo "/:id"
authorRoute.delete("/:id", async (req, res, next) => {
  try {
    // Cerchiamo un documento utente usando una query specificia: deve avere l'id uguale a quello passato come parametro all'indirizzo
    await User.deleteOne({
      _id: req.params.id,
    });
    // Mandiamo un messaggio in risposta ed uno status code di 204
    res.status(204).send("L'utente è stato eliminato correttamente");
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta GET per gli autori
authorRoute.get("/", async (req, res, next) => {
  try {
    // Cerchiamo tutti i documenti utente
    let users = await User.find();
    // Mandiamo in risposta gli utenti trovati e uno status code di 200 (OK)
    res.status(200).send(users);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta PATCH all'indirizzo "/:authorId/avatar"
authorRoute.patch("/:id/avatar", async (req, res, next) => {
  try {
    // Upload dell'immagine su Cloudinary
    const result = await cloudinary.uploader.upload(req.body.avatar);

    // Salvataggio dell'URL dell'immagine nel database
    let user = await User.findByIdAndUpdate(
      req.params.authorId,
      { avatar: result.secure_url },
      {
        new: true, // L'oggetto restituito deve essere quello aggiornato
      }
    );
    res.send(user);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});
