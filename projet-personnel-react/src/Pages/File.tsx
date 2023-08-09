import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {default as FileModel} from '../Models/File'
import { useEffect, useState } from 'react';
import FileService from '../Services/FileService';
import FileContents from '../Components/FileContents';
import Loading from '../Components/Loading';
import { Box, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

/**
 * Affiche le contenu d'un fichier
 * @returns JSX.Element
 */
export default function File() {
    const {id} = useParams<{id: string}>();
    const [file, setFile] = useState<FileModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(!id) return;
        FileService.get(parseInt(id)).then((file) => {
            setFile(file);
            setLoading(false);
        });
    }, [id]);

    if(loading) return <Loading />;

    return (

        <Box sx={{padding: "2em" }}>
            <Button variant="contained" startIcon={<ArrowBack />} onClick={() => navigate('/')}>Retour</Button>
            <h1>{file?.filename}</h1>
            <FileContents file={file!}/>
        </Box>
    )
}