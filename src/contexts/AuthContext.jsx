import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('travel-explorer-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = (userData) => {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('travel-explorer-users') || '[]');
    
    // Check if user already exists
    const userExists = existingUsers.find(u => u.email === userData.email);
    if (userExists) {
      throw new Error('User already exists with this email');
    }

    // Add new user
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    existingUsers.push(newUser);
    localStorage.setItem('travel-explorer-users', JSON.stringify(existingUsers));
    
    return { success: true, message: 'Registration successful!' };
  };

  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('travel-explorer-users') || '[]');
    const user = existingUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Save user session
    const userSession = { ...user };
    delete userSession.password; // Don't store password in session
    
    localStorage.setItem('travel-explorer-user', JSON.stringify(userSession));
    setUser(userSession);
    
    return { success: true, user: userSession };
  };

  const logout = () => {
    localStorage.removeItem('travel-explorer-user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
