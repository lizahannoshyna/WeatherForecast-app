import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("weather_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const openModal = () => {
    console.log("Контекст: відкриваю модалку");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Контекст: закриваю модалку");
    setIsModalOpen(false);
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("weather_user", JSON.stringify(userData));
    closeModal();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("weather_user");
  };

  const value = {
    user,
    isSignIn: !!user,
    isModalOpen,
    openModal, 
    closeModal,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);