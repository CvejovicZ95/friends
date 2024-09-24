import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const updateFriendRequests = (newRequest) => {
    setAuthUser((prevUser) => ({
      ...prevUser,
      friendRequests: [...prevUser.friendRequests, newRequest],
    }));
  };

  const login = (userData) => {
    setAuthUser(userData);
    document.cookie = `token=${userData.token}; path=/; secure; HttpOnly`;
  };

  const resetUnreadNotifications = (senderId) => {
    setAuthUser((prevUser) => ({
        ...prevUser,
        unreadNotifications: prevUser.unreadNotifications.map(notification => {
            if (notification.senderId === senderId) {
                return { ...notification, count: 0 }; // postavi count na 0 za ovu notifikaciju
            }
            return notification; // ostale notifikacije ostavi netaknute
        })
    }));
};

  const logout = () => {
    setAuthUser(null);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; HttpOnly";
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
    <AuthContext.Provider value={{ authUser, login, logout, setAuthUser, updateFriendRequests, resetUnreadNotifications }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = { children: PropTypes.any };