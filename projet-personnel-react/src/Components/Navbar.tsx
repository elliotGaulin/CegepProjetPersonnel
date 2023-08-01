import { AppBar, Switch, Toolbar, Typography, Button } from "@mui/material";
import useAuth from "../Context/useAuth";
import { useNavigate } from "react-router-dom";
export default function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar>
                <>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Projet personnel
                    </Typography>
                    {user != null && <Button color="inherit" onClick={() => { logout() }}>Déconnexion</Button>}
                    {user == null && <Button color="inherit" onClick={() => { navigate('/login') }}>Connexion</Button>}
                </>
            </Toolbar>
        </AppBar>
    )
}