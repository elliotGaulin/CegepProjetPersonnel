import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Form, Link } from "react-router-dom";
import useAuth from "../Context/useAuth";
export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { error, login } = useAuth();

    function handleSubmit() {
        login(email, password);
    }

    return (
        <Box sx={{ padding: "2em", maxWidth: "50%", margin: "auto" }}>
            {/* Login form */}
            <h1>Connexion</h1>
            <Form onSubmit={handleSubmit}>
                <TextField sx={{marginBottom: "1em"}}
                    label="Adresse courriel"
                    value={email}
                    fullWidth
                    required
                    type="email"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value);
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
                Vous n'avez pas de compte ? <Link to="/signup">Se créer un compte</Link><br/>
                <Button variant="contained" sx={{ marginLeft: "auto" }} type="submit">
                    Connexion
                </Button>
            </Form>
        </Box>
    );
}
