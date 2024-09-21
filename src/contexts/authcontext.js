import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [accountType, setAccountType] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const decodedToken = jwtDecode(storedToken);
          const url =
            decodedToken.role === "admin"
              ? `https://x21-be.onrender.com/admins/${decodedToken.userId}`
              : `https://x21-be.onrender.com/users/${decodedToken.userId}`;
          const response = await axios.get(url);
          const userData = { ...response.data, role: decodedToken.role };
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const login = (userData, token) => {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const newUserData = { ...userData, role: decodedToken.role };
    setUser(newUserData);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const updateUser = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        const response = await axios.get(
          `https://x21-be.onrender.com/users/${decodedToken.userId}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        console.log(response.data);
        const userData = { ...response.data, role: decodedToken.role };
        setUser(userData);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
