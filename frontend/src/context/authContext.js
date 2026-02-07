import { createContext, useContext, useState, useEffect } from "react";
import API_BASE_URL from "../apiConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [loading, setLoading] = useState(false); // For tracking login state
    const [error, setError] = useState(null); // For handling login errors

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            // Call the backend `/api/token/` endpoint to get JWT tokens
            const response = await fetch(`${API_BASE_URL}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                // Handle login errors (e.g., invalid credentials)
                const errorData = await response.json();
                throw new Error(errorData.detail || "Login failed");
            }

            const data = await response.json();

            // Store tokens in localStorage
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);

            // Fetch user profile using the access token
            const profileResponse = await fetch(`${API_BASE_URL}/api/users/profile/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${data.access}`,
                },
            });

            if (!profileResponse.ok) {
                throw new Error("Failed to fetch user profile");
            }

            const userData = await profileResponse.json();

            // Update currentUser state with the fetched profile
            setCurrentUser(userData);

            // Store user data in localStorage
            localStorage.setItem("user", JSON.stringify(userData));

            return true; // Indicate success
        } catch (err) {
            setError(err.message); // Set error message for display
            console.error("Login error:", err);
            return false; // Indicate failure
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const register = async (email, password, profile) => {
        setLoading(true);
        setError(null);

        try {
            // Call the backend `/api/register/` endpoint to create a new user
            const response = await fetch(`${API_BASE_URL}/api/users/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, profile }),
            });

            if (!response.ok) {
                // Handle registration errors (e.g., email already exists)
                const errorData = await response.json();
                throw new Error(errorData.detail || "Registration failed");
            }

            const data = await response.json();

            // Optionally, you can automatically log in the user after registration
            // by calling the login function here
            const loginSuccess = await login(email, password);

            return loginSuccess; // Indicate success
        } catch (err) {
            setError(err.message); // Set error message for display
            console.error("Registration error:", err);
            return false; // Indicate failure
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const logout = () => {
        // Clear tokens and user data from localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        // Reset currentUser state
        setCurrentUser(null);
    };

    useEffect(() => {
        // Optionally, you can check for an existing token on app load
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            // Fetch user profile if a token exists
            fetch(`${API_BASE_URL}/api/users/profile/`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Failed to fetch user profile");
                })
                .then((userData) => {
                    setCurrentUser(userData);
                })
                .catch((err) => {
                    console.error("Profile fetch error:", err);
                    logout(); // Logout if the token is invalid
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, register, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);