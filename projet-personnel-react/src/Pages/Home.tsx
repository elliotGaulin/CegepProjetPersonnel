import { Box } from "@mui/material";
import FileList from "../Components/FileList";
import { useEffect, useState } from "react";
import { default as FileModel } from "../Models/File";
import Loading from "../Components/Loading";
import DirectoryService from "../Services/DirectoryService";

/**
 * Affiche la page d'accueil
 * Contient la liste des fichiers
 * @returns Element JSX de la page Home
 */
export default function Home() {
    const [files, setFiles] = useState<FileModel[]>([]);
    const [currentDir, setCurrentDir] = useState<FileModel | null>(null);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    useEffect(() => {
        let storedDir = JSON.parse(localStorage.getItem('currentDir') ?? 'null') as FileModel | null;
        if (storedDir) {
            setCurrentDir(storedDir);
        }
        DirectoryService.getContents(storedDir?.id ?? currentDir?.id ?? null ).then((files) => {
            setFiles(files);
            setInitialLoading(false);
        }).catch((error) => {
            //Fallback sur le dossier racine
            DirectoryService.getContents(null).then((files) => {
                setFiles(files);
                setInitialLoading(false);
            });
        });
    }, [currentDir?.id]);

    /**
     * Change le dossier courant
     * @param dir Dossier courant
     */
    function handleDirChange(dir: FileModel | null) {
        setCurrentDir(dir);
        localStorage.setItem('currentDir', JSON.stringify(dir));
        setInitialLoading(true);
        DirectoryService.getContents(dir ? dir.id : null).then((files) => {
            setFiles(files);
            setInitialLoading(false);
        });
    }

    return (
        <>
            <Box sx={{ padding: "2em" }}>
                {!initialLoading && <FileList files={files} setFiles={setFiles} currentDirectory={currentDir} handleDirChange={handleDirChange} />}
                {initialLoading && <Loading />}
            </Box >
        </>

    );
}