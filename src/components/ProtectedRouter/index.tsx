import { Navigate } from "react-router-dom";

export function ProtectedRouter({children}: any) {
    const login = window.localStorage.getItem("token")
    return login ? children : <Navigate to="/"/>
}