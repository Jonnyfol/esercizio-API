import { Schema, model } from "mongoose";
import User from "./user.models.js"; // Assicurati che il percorso del file sia corretto

const postSchema = new Schema(
  {
    // Categoria del post
    category: {
      type: String,
      required: true,
    },
    // Titolo del post
    title: {
      type: String,
      required: true,
    },
    // Link dell'immagine di copertina
    cover: {
      type: String,
      required: true,
    },
    // Tempo di lettura dell'articolo
    readTime: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        enum: ["min", "hour", "day"],
        required: true,
      },
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },

    // Contenuto HTML dell'articolo
    content: {
      type: String,
      required: true,
    },
    // Array dei commenti
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        author: {
          type: String,
          required: true,
        },
      },
    ],
  },
  // Opzioni dello schema
  {
    collection: "posts", // Specifica il nome della collezione nel database
    timestamps: true, // Aggiunge automaticamente i campi createdAt e updatedAt
  }
);

export default model("Post", postSchema);
