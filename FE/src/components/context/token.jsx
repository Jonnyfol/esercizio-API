import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  // Inizializza lo stato del token, dell'ID dell'autore, del nome dell'autore e dell'avatar
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [authorId, setAuthorId] = useState(
    localStorage.getItem("authorId") || ""
  );
  const [username, setusername] = useState(
    localStorage.getItem("username") || ""
  );
  const [avatar, setavatar] = useState(localStorage.getItem("avatar") || "");

  const isAuthenticated = !!token;

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("authorId", authorId);
  }, [authorId]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem("avatar", avatar);
  }, [avatar]);

  const value = {
    token,
    setToken,
    authorId,
    setAuthorId,
    username,
    setusername,
    avatar,
    setavatar,
    isAuthenticated,
  };

  // Fornisce il contesto ai componenti figli
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
