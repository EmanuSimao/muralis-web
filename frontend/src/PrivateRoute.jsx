import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";
import { Outlet, Navigate } from "react-router";

export default function PrivateRoute() {
    const { isLoggedIn, loading} = useContext(AuthContext);
    if (loading) {
        return <p>A carregar...</p>
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/" />
}