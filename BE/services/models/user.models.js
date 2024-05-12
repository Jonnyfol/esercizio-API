// Importiamo Schema e model dalla libreria mongoose
import { Schema, model } from "mongoose";

/*
Tipi di dato accettati:
    String
    Number
    Boolean
    Array
    Buffer
    Date
    ObjectId
    UUID

*/
const userSchema = new Schema(
  {
    // Il nome deve essere una stringa, obbligatoria
    name: {
      type: String,
      required: true,
    },

    // Il cognome deve essere una stringa, obbligatoria
    lastName: {
      type: String,
      required: true,
    },

    // La mail deve essere una stringa, obbligatoria
    email: {
      type: String,
      required: true,
    },

    // L'età deve essere un numero, obbligatorio, dal valore minimo di 1 e massimo di 80
    bornDate: {
      type: String,
      required: false,
    },

    avatar: {
      type: String,
      required: false,
    },

    username: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      required: false,
    },
  },

  // Questo ci permette di inserire i documenti che seguono questo schema nella collezione users
  {
    collection: "users",
  }
);

// Esportiamo un modello chiamato "User" che rispecchi lo schema userSchema
export default model("User", userSchema);
