import { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || '');
  const [currentUsername, setCurrentUsername] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Only run once when the component mounts
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/currentUser", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        setRole(response.data.role);
        setCurrentUsername(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    // Check if token is available before making the request
    if (token) {
      fetchData();
    }
  }, []); // Empty dependency array ensures this effect runs only once

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, currentUsername, role }}>
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
