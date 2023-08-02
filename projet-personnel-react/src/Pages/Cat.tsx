import { Box } from "@mui/material";

/**
 * Easter egg d'un chat
 * @returns Element JSX de la page Cat
 */
export default function Cat() {
    return (
        <Box sx={{padding: "2em", textAlign: "center"}}>
            <img src="https://i.redd.it/k1rk1dkjw3v91.jpg" height={500}/>
        </Box>
    )
}