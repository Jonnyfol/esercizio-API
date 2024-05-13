import React, { createContext, useState, useEffect } from "react";
//

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  // Inizializza lo stato del token e dell'ID dell'autore dal localStorage
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [authorId, setAuthorId] = useState(
    localStorage.getItem("authorId") || ""
  );

  // Verifica se l'utente è autenticato in base alla presenza del token
  const isAuthenticated = !!token;

  // Effetto per salvare il token e l'ID dell'autore nel localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("authorId", authorId);
  }, [authorId]);

  // Crea l'oggetto di valore del contesto
  const value = { token, setToken, authorId, setAuthorId, isAuthenticated };

  // Fornisce il contesto ai componenti figli
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
