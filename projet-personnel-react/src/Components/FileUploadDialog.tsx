import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";

/**
 * Affiche une boite de dialogue pour téléverser un fichier
 * @param param0 props de la boite de dialogue : open, setOpen, submit
 * @returns Element JSX de la boite de dialogue
 */
export default function FileUploadDialog({ open, setOpen, submit }: { open: boolean, setOpen: (open: boolean) => void, submit: (file: File|null) => void }) {

    const [file, setFile] = useState<File | null>(null);

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
        submit(file);
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
                <Button onClick={handleFileSumbit}>Soummettre</Button>
            </DialogActions>
        </Dialog>
    )
}