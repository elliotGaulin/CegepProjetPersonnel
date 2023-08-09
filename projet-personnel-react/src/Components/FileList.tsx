import { Alert, Button, IconButton, Snackbar, Switch, styled } from "@mui/material";
import { default as FileModel } from "../Models/File";
import { CopyAll, CreateNewFolder, Delete, Download, FileOpen, Folder, FolderOpen, KeyboardReturn, UploadFile } from "@mui/icons-material";
import { getReadableSize } from "../Utils/FileUtils";
import FileService from "../Services/FileService";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import FileUploadDialog from "./FileUploadDialog";
import { useState } from "react";
import { API_URL } from "../config";
import DirectoryService from "../Services/DirectoryService";
import NewDirDialog from "./NewDirDialog";
import { useNavigate } from "react-router-dom";

/**
 * Affiche la liste des fichiers
 * @param files Fichiers à afficher
 * @returns 
 */
export default function FileList({ files, setFiles, currentDirectory, handleDirChange }: { files: FileModel[], setFiles: (files: FileModel[]) => void, currentDirectory: FileModel | null, handleDirChange: (dir: FileModel | null) => void }) {
    const [fileUploadOpen, setFileUploadOpen] = useState<boolean>(false);
    const [newDirOpen, setNewDirOpen] = useState<boolean>(false);
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");

    const navigate = useNavigate();

    /**
     * Supprime un fichier
     * @param file Fichier à supprimer
     */
    function handleDelete(file: FileModel) {
        FileService.delete(file.id!)
            .then(() => {
                setFiles(files.filter((f) => f.id !== file.id));
                setSnackBarMessage("Fichier supprimé");
                setSnackBarOpen(true);
            });
    }

    /**
     * Télécharge un fichier
     * @param file Fichier à télécharger
     */
    function handleDownload(file: FileModel) {
        setSnackBarMessage("Téléchargement en cours");
        setSnackBarOpen(true);
        FileService.download(file.id!)
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = file.filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
                setSnackBarOpen(false);
            });
    }

    /**
     * Copie le lien d'un fichier dans le presse papier 
     * @param file Fichier dont on veut copier le lien
     */
    function handleCopyLink(file: FileModel) {
        navigator.clipboard.writeText(API_URL + '/files/public/' + file.id + '/download');
        setSnackBarMessage("Lien copié dans le presse papier");
        setSnackBarOpen(true);
    }

    /**
     * Soummet le fichier à téléverser
     * @param file Fichier à téléverser
     */
    async function fileUploadSumbit(file: File | null) {
        if (!file) {
            setFileUploadOpen(false);
            return null;
        }

        let uploadedFile = await FileService.upload(file, currentDirectory ? currentDirectory.id : null)
        setFiles([...files, uploadedFile])
        return uploadedFile;
    }

    /**
     * Change la visibilité d'un fichier
     * @param file Fichier dont on veut changer la visibilité
     */
    async function handlePublicChange(file: FileModel) {
        setFiles(files.map((f) => f.id === file.id ? { ...f, public: !f.public } : f))
        FileService.setPublic(file.id!, !file.public)
    }

    /**
     * Change le dossier courant pour le dossier parent
     */ 
    async function handlePreviousDir() {
        if (currentDirectory?.parent_id) {
            const parent = await FileService.get(currentDirectory.parent_id)
            handleDirChange(parent)
        } else {
            handleDirChange(null)
        }
    }

    /**
     * Crée un nouveau dossier
     * @param name Nom du dossier à créer
     * @returns Nouveau dossier
     */
    async function handleNewDir(name: string) {
        const newDir = await DirectoryService.createDirectory(name, currentDirectory?.id ?? null)
        setFiles([...files, newDir]);
        return newDir;
    }

    /**
     * Colonnes du tableau
     */
    const columns: GridColDef[] = [
        { field: 'filename', headerName: 'Nom du fichier', flex: 4 },
        { field: 'filesize', headerName: 'Taille', flex: 1, renderCell(params) { return getReadableSize(params.value as number) } },
        {
            field: 'public', headerName: 'Public', flex: 1, renderCell(params) {
                const file = params.row;
                if (file.is_directory) return null;
                return (
                    <Switch checked={file.public ? true : false} onChange={() => handlePublicChange(file)} />
                )
            }
        },
        {
            field: 'created_at', headerName: 'Créé le', flex: 1, renderCell(params) {
                return (new Date(params.value as string).toLocaleString());
            },
        },
        {
            field: 'updated_at', headerName: 'Mise à jour le', flex: 1, renderCell(params) {
                return (new Date(params.value as string).toLocaleString());
            },
        },
        {
            field: 'actions', headerName: 'Actions', flex: 1, sortable: false, align: "right", renderCell: (params) => {
                const file = params.row as FileModel;
                return (
                    <>
                        {file.is_directory == true &&
                            <IconButton aria-label="open" onClick={() => handleDirChange(file)}>
                                <FolderOpen />
                            </IconButton>
                        }
                        {file.is_directory == false &&
                            <>
                                <IconButton onClick={() => {
                                    //Navigate to the file page
                                    navigate('/files/' + file.id)
                                }}>
                                    <FileOpen />
                                </IconButton>
                                <IconButton aria-label="copyLink" disabled={!file.public} onClick={() => handleCopyLink(file)}>
                                    <CopyAll />
                                </IconButton>
                                <IconButton aria-label="download" onClick={() => handleDownload(file)}>
                                    <Download />
                                </IconButton>
                            </>
                        }
                        <IconButton aria-label="delete" onClick={() => handleDelete(file)}>
                            <Delete />
                        </IconButton>
                    </>
                )
            }
        },
    ];

    /**
     * Style du nom du dossier
     */
    const FolderDisplay = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        fontWeight: "bold",
        flex: 1,
        color: theme.palette.primary.main,
      }));

    /**
     * Barre d'outils du tableau
     */
    function customGridToolbar() {
        return (
            <>
            <GridToolbarContainer sx={{ width: "100%" }} >
                {/* Folder name with the same stye as the buttons */}
                <Folder color="primary"/><FolderDisplay>: {currentDirectory?.filename ?? "Racine"}</FolderDisplay>
                {currentDirectory != null && <Button startIcon={<KeyboardReturn />} onClick={handlePreviousDir}>Dossier précédent</Button>}
                <Button startIcon={<CreateNewFolder />} onClick={() => setNewDirOpen(true)}>Dossier</Button>
                <Button onClick={() => setFileUploadOpen(true)} startIcon={<UploadFile />}>Téléverser</Button>
            </GridToolbarContainer>
            </>
        );
    }

    return (
        <>
            <FileUploadDialog open={fileUploadOpen} setOpen={setFileUploadOpen} submit={fileUploadSumbit} />
            <NewDirDialog open={newDirOpen} setOpen={setNewDirOpen} submit={handleNewDir} />
            <DataGrid rows={files} columns={columns} rowSelection={false} disableColumnFilter={true} sx={{ minHeight: "75vh" }} slots={{ toolbar: customGridToolbar }} />
            <Snackbar
                open={snackBarOpen}
                onClose={() => setSnackBarOpen(false)}
                message={snackBarMessage}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackBarOpen(false)}
                    severity="success"
                >
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}