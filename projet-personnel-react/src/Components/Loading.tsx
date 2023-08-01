import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
    return (
        <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%", translate: "-50%", scale: "150%" }}/>
    );
}