import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check localStorage on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Login function
    const login = (userData) => {
        setCurrentUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Logout function
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("user");
    };

    const value = {
        currentUser,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
