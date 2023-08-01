import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import useAuth from "../Context/useAuth";
import Loading from "./Loading";

export default function Layout() {
    const { loading } = useAuth();
    return (
        <>
            <Navbar />
            {!loading && <Outlet />}
            {loading && <Loading />}
        </>
    )
}
