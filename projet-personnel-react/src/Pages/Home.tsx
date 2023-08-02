import { Box } from "@mui/material";
import FileList from "../Components/FileList";
import { useEffect, useState } from "react";
import FileService from "../Services/FileService";
import { default as FileModel } from "../Models/File";
import Loading from "../Components/Loading";

/**
 * Affiche la page d'accueil
 * Contient la liste des fichiers
 * @returns Element JSX de la page Home
 */
export default function Home() {
    const [files, setFiles] = useState<FileModel[]>([]);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    useEffect(() => {
        FileService.getAll().then((files) => {
            setFiles(files);
            setInitialLoading(false);
        });
    }, []);

    return (
        <>
            <Box sx={{ padding: "2em" }}>
                {!initialLoading &&  <FileList files={files} setFiles={setFiles} />}
                {initialLoading &&  <Loading/>}
            </Box >
        </>

    );
}