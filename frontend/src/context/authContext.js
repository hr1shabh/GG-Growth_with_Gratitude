import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

const login = (user) => {

    //for now, just dummy login
    setCurrentUser({id: 1, name: "John Doe", profilePicture: "https://i.pinimg.com/originals/f8/30/0c/f8300c3f731205781b05902b505bedc6.jpg"});
};

// const logout = () => {
//     setCurrentUser(null);
// };

useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
}, [currentUser]);

return (
    <AuthContext.Provider value={{ currentUser, login }}>
        {children}
    </AuthContext.Provider>
)

};

export const useAuth = () => useContext(AuthContext);

