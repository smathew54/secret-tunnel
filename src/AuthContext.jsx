import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";
const SIGNUP_URL = `${API}/signup`;
const AUTHENTICATE_URL = `${API}/authenticate`;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO: signup
  const signup = async (username) => {
    console.log("Signing up...");
    setLoading(true);
    setError(null);
    try {
      const result = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: "super-secret-999",
        }),
      });
      const data = await result.json();
      setToken(data.token);
      console.log(`here is the token ${data.token}`);
      setLocation("TABLET");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // TODO: authenticate
  const authenticate = async () => {
    try {
      const result = await fetch(AUTHENTICATE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await result.json();
      console.log(data);
      setLocation("TUNNEL");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
