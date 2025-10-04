/* eslint-disable react-refresh/only-export-components */
// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Safe localStorage functions with error handling
  const getStoredItem = (key) => {
    try {
      if (typeof window === 'undefined') return null;
      const item = localStorage.getItem(key);
      return item && item !== 'undefined' && item !== 'null' ? item : null;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  };

  const setStoredItem = (key, value) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error storing ${key} in localStorage:`, error);
    }
  };

  const removeStoredItem = (key) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  };

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = getStoredItem('token');
        const userData = getStoredItem('user');
        
        console.log('Initializing auth:', { token, userData }); // Debug log
        
        if (token && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          console.log('User restored from storage:', parsedUser); // Debug log
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        removeStoredItem('token');
        removeStoredItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    try {
      console.log('Login function called with:', { userData, token }); // Debug log
      
      // Ensure userData has required properties
      const userWithEmail = {
        ...userData,
        email: userData.email || userData.userEmail || '',
        status: userData.status || userData.role || 'user',
        lastLogin: new Date().toISOString()
      };

      console.log('Processed user data for storage:', userWithEmail); // Debug log

      setUser(userWithEmail);
      setStoredItem('token', token);
      setStoredItem('user', JSON.stringify(userWithEmail));
      
      if (userWithEmail.email) {
        setStoredItem('userEmail', userWithEmail.email);
      }

      console.log('Login completed successfully'); // Debug log
      
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    try {
      console.log('Logging out user'); // Debug log
      setUser(null);
      removeStoredItem('token');
      removeStoredItem('user');
      removeStoredItem('userEmail');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      setStoredItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('User update failed');
    }
  };

  const getStoredEmail = () => {
    return getStoredItem('userEmail');
  };

  const clearStoredEmail = () => {
    removeStoredItem('userEmail');
  };

  // Check if token exists and is valid
  const isTokenValid = () => {
    const token = getStoredItem('token');
    return !!token;
  };

  // Get authentication headers for API calls
  const getAuthHeaders = () => {
    const token = getStoredItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    getStoredEmail,
    clearStoredEmail,
    getAuthHeaders,
    isTokenValid,
    loading,
    isAuthenticated: !!user && isTokenValid(),
    isAdmin: user?.status === 'admin' || user?.role === 'admin',
    isUser: user?.status === 'user' || user?.role === 'user',
    isManager: user?.status === 'manager' || user?.role === 'manager',
    userEmail: user?.email || getStoredEmail()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};