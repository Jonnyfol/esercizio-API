import { Router } from "express";
import Post from "../models/post.models.js";
import { v2 as cloudinary } from "cloudinary";
import { avatarmulter } from "../middlewares/multer.js";

// Creiamo un nuovo Router e esportiamolo per essere utilizzato altrove
export const postRoute = Router();

// Richiesta POST per creare un nuovo post
postRoute.post("/", async (req, res, next) => {
  try {
    // Creiamo un nuovo documento post, con i valori presi dal body della richiesta
    let post = await Post.create(req.body);
    // Mandiamo in risposta il post creato e uno status code di 201 (Created)
    res.status(201).send(post);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta PUT all'indirizzo "/:id"
postRoute.put("/:id", async (req, res, next) => {
  try {
    // Cerchiamo un documento post dal suo id e modifichiamolo con i valori presi dal body della richiesta
    let post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // L'oggetto restituito deve essere quello aggiornato
    });
    res.send(post);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta DELETE all'indirizzo "/:id"
postRoute.delete("/:id", async (req, res, next) => {
  try {
    // Cerchiamo un documento post usando una query specifica: deve avere l'id uguale a quello passato come parametro all'indirizzo
    await Post.deleteOne({
      _id: req.params.id,
    });
    // Mandiamo un messaggio in risposta ed uno status code di 204
    res.status(204).send("Il post è stato eliminato correttamente");
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta GET per ottenere tutti i post
postRoute.get("/", async (req, res, next) => {
  try {
    // Cerchiamo tutti i documenti post
    let posts = await Post.find();
    // Mandiamo in risposta i post trovati e uno status code di 200 (OK)
    res.status(200).send(posts);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});

// Richiesta PATCH all'indirizzo "/:id/cover"
postRoute.patch(
  "/:id/cover",
  avatarmulter.single("cover"),
  async (req, res, next) => {
    try {
      // Salvataggio dell'URL dell'immagine nel database
      let post = await Post.findByIdAndUpdate(
        req.params.id,
        { cover: req.file.path },
        {
          new: true, // L'oggetto restituito deve essere quello aggiornato
        }
      );
      res.send(post);
    } catch (err) {
      // In caso di errore, procediamo
      next(err);
    }
  }
);

// Richiesta GET per ottenere un singolo post con un determinato ID
postRoute.get("/:id", async (req, res, next) => {
  try {
    // Cerchiamo un singolo documento post usando l'ID passato come parametro nell'URL
    let post = await Post.findById(req.params.id);
    // Se non viene trovato il post, restituiamo uno status 404 (Not Found)
    if (!post) {
      return res.status(404).send("Post non trovato");
    }
    // Mandiamo in risposta il post trovato e uno status code di 200 (OK)
    res.status(200).send(post);
  } catch (err) {
    // In caso di errore, procediamo
    next(err);
  }
});
