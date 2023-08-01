import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useAuth, { AuthProvider } from "../Context/useAuth";
import Loading from "./Loading";

export default function Layout() {
    return (
        <AuthProvider>
            <Navbar />
            <Outlet />
        </AuthProvider>
    )
}
