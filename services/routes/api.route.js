import { Router } from "express";
import User from "../models/user.models.js";
// Creiamo un nuovo Router e esportiamolo per essere utilizzato altrove
export const apiRoute = Router();

// Richiesta GET all'indirizzo "/" (Esempio: http:localhost:3001/api)
apiRoute.get("/", async (req, res) => {
  // Mandiamo una risposta al client di tipo messaggio testuale
  res.send("Sei al route principale dell'api");
});

// Richiesta GET all'indirizzo "/:id" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.get("/:id", async (req, res, next) => {
  try {
    // Cerchiamo un documento utente con l'id uguale a quello passato come parametro
    let user = await User.findById(req.params.id);
    // Mandiamo in risposta al client l'utente trovato
    res.send(user);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta POST all'indirizzo "/:id" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.post("/", async (req, res, next) => {
  try {
    // Creiamo un nuovo documento utente, con i valori presi dal body della richiesta
    let user = await User.create(req.body);
    // Mandiamo in risposta l'utente creato e un status code di 400 (successo)
    res.send(user).status(400);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta PUT all'indirizzo "/" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.put("/:id", async (req, res, next) => {
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

// Richiesta DELETE all'indirizzo "/" (Esempio: http:localhost:3001/api/fhjdjh2398fdhj2)
apiRoute.delete("/:id", async (req, res, next) => {
  try {
    // Cerchiamo un documento utente usando una query specificia: deve avere l'id uguale a quello passato come parametro all'indirizzo
    await User.deleteOne({
      _id: req.params.id,
    });
    // Mandiamo un messaggio in risposta ed uno status code di 204
    res.send("L'utente è stato eliminato correttamente").status(204);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});
