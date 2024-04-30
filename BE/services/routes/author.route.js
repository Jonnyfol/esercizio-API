import { Router } from "express";
import User from "../models/user.models.js";
import { v2 as cloudinary } from "cloudinary";
import { avatarmulter } from "../middlewares/multer.js";

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

// Richiesta PATCH all'indirizzo "/:id/avatar"
authorRoute.patch(
  "/:id/avatar",
  avatarmulter.single("avatar"),
  async (req, res, next) => {
    try {
      // Upload dell'immagine su Cloudinary
      // const result = await cloudinary.uploader.upload(req.body.avatar);

      // Salvataggio dell'URL dell'immagine nel database
      let user = await User.findByIdAndUpdate(
        req.params.id,
        { avatar: req.file.path },
        {
          new: true, // L'oggetto restituito deve essere quello aggiornato
        }
      );
      res.send(user);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
  }
);

// Richiesta GET per ottenere un singolo autore con un determinato ID
authorRoute.get("/:id", async (req, res, next) => {
  try {
    // Cerchiamo un singolo autore usando l'ID passato come parametro nell'URL
    let user = await User.findById(req.params.id);
    // Se non viene trovato l'autore, restituiamo uno status 404 (Not Found)
    if (!user) {
      return res.status(404).send("Post non trovato");
    }
    // Mandiamo in risposta l'autore trovato e uno status code di 200 (OK)
    res.status(200).send(user);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

authorRoute.post("/", async (req, res, next) => {
  try {
    let user = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });
    // const msg = {
    //   to: req.body.email, // Change to your recipient
    //   from: "...", // Change to your verified sender
    //   subject: "Benvenuto su Strive Blog",
    //   html: `Hai creato un account su Strive Blog`,
    // }
    // await sgMail.send(msg)
    res.send(user);
  } catch (error) {
    next(error);
  }
});
