import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useLocation } from "wouter";
import apiService from './apiService.js';

// Create Context
const AuthContext = React.createContext();

// AuthProvider Component that wraps your app in App.js
const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState(null);

  const getUsername = (token) => {
    if (token) {
      const base64Url = token.split('.')[1]; // We get the payload part of the JWT
      const base64 = base64Url.replace('-', '+').replace('_', '/'); // Convert Base64Url to Base64
      const payload = JSON.parse(window.atob(base64)); // Decode Base64 and parse the JSON result
      return payload.username;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const username = getUsername(token);
      apiService.setToken(token);
      apiService.setOnUnauthorizedCallback(logout);
      setUser({username});
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [token]);

  const login = (data) => {
    apiService.setToken(data.token);
    setToken(data.token);
    setLocation("/auth");
  };

  const logout = () => {
    setToken(null);
    setLocation("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
