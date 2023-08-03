import { Box } from "@mui/material";

/**
 * Easter egg d'un chat
 * @returns Element JSX de la page Cat
 */
export default function Cat() {
    return (
        <Box sx={{padding: "2em", textAlign: "center"}}>
            <img src="https://source.unsplash.com/random/?kitten" height={500}/>
        </Box>
    )
}