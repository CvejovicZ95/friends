import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const login = (userData) => {
    setAuthUser(userData);
    document.cookie = `token=${userData.token}; path=/; secure; HttpOnly`;
  };

  const resetUnreadNotifications = (senderId) => {
    setAuthUser((prevUser) => ({
      ...prevUser,
      unreadNotifications: prevUser.unreadNotifications.map((notification) => {
        if (notification.senderId === senderId) {
          return { ...notification, count: 0 };
        }
        return notification;
      }),
    }));
  };

  const logout = () => {
    setAuthUser(null);
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; HttpOnly";
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch("/api/validateToken", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setAuthUser(data.user);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, login, logout, setAuthUser, resetUnreadNotifications }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = { children: PropTypes.any };
