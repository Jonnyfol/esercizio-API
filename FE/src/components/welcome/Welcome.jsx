import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/token";
export default function Welcome() {
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    const handleGoogleLoginResponse = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenValue = urlParams.get("accessToken");

      if (tokenValue) {
        localStorage.setItem("token", tokenValue);
        setToken(tokenValue);
        // Aggiungi qui il codice per navigare alla pagina successiva
      } else {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          // Aggiungi qui il codice per navigare alla pagina successiva
        }
      }
    };

    handleGoogleLoginResponse();
  }, [setToken]); // Aggiungo setToken come dipendenza dell'effetto

  return <div>Caricando....</div>;
}
