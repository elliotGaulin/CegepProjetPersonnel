import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import { default as FileModel } from "../Models/File";
import { LoadingButton } from "@mui/lab";
/**
 * Affiche une boite de dialogue pour téléverser un fichier
 * @param param0 props de la boite de dialogue : open, setOpen, submit
 * @returns Element JSX de la boite de dialogue
 */
export default function FileUploadDialog({ open, setOpen, submit }: { open: boolean, setOpen: (open: boolean) => void, submit: (file: File|null) => Promise<FileModel|null> }) {

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Ferme la boite de dialogue
     */
    function handleClose() {
        setOpen(false);
    }

    /**
     * Soummet le fichier à téléverser
     */
    function handleFileSumbit() {
        setLoading(true);
        submit(file).then(() => {
            handleClose();
            setFile(null);
            setLoading(false);
        });
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Téléverser un fichier</DialogTitle>
            <DialogContent>
                <MuiFileInput value={file} onChange={setFile} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">Annuler</Button>
                <LoadingButton loading={loading} onClick={handleFileSumbit} disabled={file == null}>Soummettre</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}