// src/AuthContext.js

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || '');
  const [currentUsername, setCurrentUsername] = useState(null);

  useEffect(() => {
    const API_URL = "http://localhost:3000/currentUser";

    const fetchData = async () => {
      try {

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': ` Bearer ${token}`,
          },
        });

        const result = await response.json();

        setCurrentUsername(result.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, currentUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
