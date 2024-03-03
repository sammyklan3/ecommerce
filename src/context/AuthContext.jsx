import { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || '');
  const [userDetails, setUserDetails] = useState({
    username: "",
    userId: "",
    role: "",
  });

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

        setUserDetails({
          ...userDetails,
          role: response.data.role,
          username: response.data.username,
          userId: response.data.userId,
        });
      } catch (error) {
        console.log(error);
      }
    };

    // Check if token is available before making the request
    if (token) {
      fetchData();
    }
  }, [token]); // Include token in dependency array to run effect when token changes

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    // Clear user details on logout
    setUserDetails({
      username: "",
      role: "",
    });
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, userDetails }}>
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
