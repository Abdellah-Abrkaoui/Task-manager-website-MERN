import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATH } from "../utils/apiPaths";

// Create context
export const UserContext = createContext();

// Provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check token and fetch user on app load
  useEffect(() => {
    const accessToken = localStorage.getItem("token");

    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.log("User not authenticated", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Update user info (e.g. after login)
  const updateUser = (userData) => {
    setUser(userData.user); // Store only user object
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
  };

  // Clear user info (e.g. on logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
