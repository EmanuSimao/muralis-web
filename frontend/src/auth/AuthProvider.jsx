import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import userService from "../services/user.service";

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const checkSession = async () => {
            // ← verifica o localStorage primeiro
            const cached = localStorage.getItem('user');
            if (cached) {
                setUser(JSON.parse(cached));
                // setLoading(false);
                // return; // ← não faz o pedido ao backend
            }

            try {
                const response = await userService.currentUser();
                if (isMounted) {
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
            } catch {
                if (isMounted) {
                    setUser(null);
                    localStorage.removeItem('user')
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        checkSession();
        return () => { isMounted = false; };
    }, []);

    const login = async (credentials) => {
        const response = await userService.login(credentials);
        const userData = response.data.user;
        // console.log(response);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return userData;
    };

    const logout = async () => {
        await userService.logout();
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading, isLoggedIn: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}