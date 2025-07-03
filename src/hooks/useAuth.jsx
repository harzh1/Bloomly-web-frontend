import { useState, useEffect, createContext, useContext } from "react";
import { createGuest, loginWithPhone } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem("bloomlyUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (type, data = {}) => {
    setIsLoading(true);
    try {
      let response;

      if (type === "guest") {
        response = await createGuest();
      } else if (type === "phone") {
        response = await loginWithPhone(data.phone);
      }

      if (response && response.userId) {
        const userData = {
          userId: response.userId,
          isGuest: type === "guest",
          isProfileComplete: response.isProfileComplete || false,
          ...data,
        };

        setUser(userData);
        localStorage.setItem("bloomlyUser", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("bloomlyUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
