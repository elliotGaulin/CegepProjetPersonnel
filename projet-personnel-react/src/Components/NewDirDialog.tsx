import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input } from "@mui/material";
import { useState } from "react";
import { default as FileModel } from "../Models/File";
import { LoadingButton } from "@mui/lab";
/**
 * Affiche une boite de dialogue pour téléverser un fichier
 * @param param0 props de la boite de dialogue : open, setOpen, submit
 * @returns Element JSX de la boite de dialogue
 */
export default function NewDirDialog({ open, setOpen, submit }: { open: boolean, setOpen: (open: boolean) => void, submit: (name: string) => Promise<FileModel|null> }) {

    const [name, setName] = useState<string>("");
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
    function handleSumbit() {
        setLoading(true);
        submit(name).then(() => {
            handleClose();
            setName("");
            setLoading(false);
        });
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Créer un dossier</DialogTitle>
            <DialogContent>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">Annuler</Button>
                <LoadingButton loading={loading} onClick={handleSumbit} disabled={name === ""}>Soummettre</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}