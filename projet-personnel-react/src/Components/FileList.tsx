import { Button, IconButton } from "@mui/material";
import { default as FileModel } from "../Models/File";
import { CopyAll, Delete, Download, UploadFile } from "@mui/icons-material";
import { getReadableSize } from "../Utils/FileUtils";
import FileService from "../Services/FileService";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import FileUploadDialog from "./FileUploadDialog";
import { useState } from "react";
import { API_URL } from "../config";

/**
 * Affiche la liste des fichiers
 * @param files Fichiers à afficher
 * @returns 
 */
export default function FileList({ files, setFiles }: { files: FileModel[], setFiles: (files: FileModel[]) => void }) {
    const [fileUploadOpen, setFileUploadOpen] = useState<boolean>(false);

    /**
     * Supprime un fichier
     * @param file Fichier à supprimer
     */
    function handleDelete(file: FileModel) {
        FileService.delete(file.id!)
            .then(() => {
                setFiles(files.filter((f) => f.id !== file.id));
            });
    }

    /**
     * Télécharge un fichier
     * @param file Fichier à télécharger
     */
    function handleDownload(file: FileModel) {
        FileService.download(file.id!)
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = file.filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
            });
    }

    /**
     * Copie le lien d'un fichier dans le presse papier 
     * @param file Fichier dont on veut copier le lien
     */
    function handleCopyLink(file: FileModel) {
        navigator.clipboard.writeText(API_URL + '/files/public/' + file.id + '/download')
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

        let uploadedFile = await FileService.upload(file)
        setFiles([...files, uploadedFile])
        return uploadedFile;
    }

    const columns: GridColDef[] = [
        { field: 'filename', headerName: 'Nom du fichier', flex: 4 },
        { field: 'filesize', headerName: 'Taille', flex: 1, renderCell(params) { return getReadableSize(params.value as number) } },
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
            field: 'actions', headerName: 'Actions', flex: .75, sortable: false, renderCell: (params) => {
                const file = params.row as FileModel;
                return (
                    <>
                        <IconButton aria-label="copyLink" onClick={() => handleCopyLink(file)}>
                            <CopyAll />
                        </IconButton>
                        <IconButton aria-label="download" onClick={() => handleDownload(file)}>
                            <Download />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => handleDelete(file)}>
                            <Delete />
                        </IconButton>
                    </>
                )
            }
        },
    ];

    function customGridToolbar() {
        return (
            <GridToolbarContainer sx={{ marginLeft: "auto" }} >
                <Button onClick={() => setFileUploadOpen(true)} startIcon={<UploadFile />}>Téléverser</Button>
            </GridToolbarContainer>
        );
    }

    return (
        <>
            <FileUploadDialog open={fileUploadOpen} setOpen={setFileUploadOpen} submit={fileUploadSumbit} />
            <DataGrid rows={files} columns={columns} rowSelection={false} disableColumnFilter={true} sx={{ minHeight: "75vh" }} slots={{ toolbar: customGridToolbar }} />
        </>
    )
}