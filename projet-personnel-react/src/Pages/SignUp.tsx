import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Form, Link } from "react-router-dom";
import useAuth from "../Context/useAuth";
import Loading from "../Components/Loading";
export default function SignUp() {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { error, signUp, loading } = useAuth();

    function handleSubmit() {
        signUp(email, name, password);
    }

    if(loading) return <Loading/>;

    return (
        <Box sx={{ padding: "2em", maxWidth: "50%", margin: "auto" }}>
            {/* Login form */}
            <h1>Se créer un compte</h1>
            <Form onSubmit={handleSubmit}>
                <TextField sx={{ marginBottom: "1em" }}
                    label="Adresse courriel"
                    value={email}
                    fullWidth
                    required
                    type="email"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value);
                    }}
                />
                <TextField sx={{ marginBottom: "1em" }}
                    label="Nom"
                    value={name}
                    fullWidth
                    required
                    type="text"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setName(event.target.value);
                    }}
                />
                <TextField
                    label="Mot de passe"
                    value={password}
                    type="password"
                    fullWidth
                    required
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setPassword(event.target.value);
                    }}
                />
                <FormHelperText error>{error?.message}</FormHelperText>
                Vous avez déjà compte ? <Link to="/login">Se connecter</Link><br/>
                <Button variant="contained" sx={{ marginLeft: "auto" }} type="submit">
                    Connexion
                </Button>
            </Form>
        </Box>
    );
}
