import { useEffect, useState } from 'react';
import { default as FileModel } from '../Models/File';
import FileService from '../Services/FileService';
import Loading from './Loading';
import { getFileExtension, getLanguageFromFilename, isReadableFile } from '../Utils/FileUtils';
import TextContents from './FileContents/TextContents';
import PDFContents from './FileContents/PDFContents';
import MarkdownContents from './FileContents/MarkdownContents';

/**
 * Affiche le contenu d'un fichier
 * @param file Fichier à afficher
 * @returns JSX.Element
 * @example <FileContents file={file} />
 */
export default function FileContents({ file }: { file: FileModel }) {

    const [contents, setContents] = useState<Blob>(new Blob());
    const [loading, setLoading] = useState<boolean>(true);
    const [isValidFileType, setIsValidFileType] = useState<boolean>(true);
    const [fileExtension, setFileExtension] = useState<string>('');


    useEffect(() => {
        if (!file.id) return;

        setFileExtension(getFileExtension(file.filename));

        if (!isReadableFile(file.filename)) {
            setIsValidFileType(false);
            setLoading(false);
            return;
        }

        FileService.download(file.id).then((contents) => {
            setContents(contents);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setIsValidFileType(false);
        }).finally(() => {
            setLoading(false);
        });

    }, [file.filename, file.id]);

    if (loading) return <Loading />;

    if (!isValidFileType) return <h2>Impossible d'afficher le contenu de ce fichier</h2>;


    switch (fileExtension) {
        case 'pdf':
            return <PDFContents contents={contents} file={file} />;
        case 'md':
            return <MarkdownContents contents={contents} file={file} />;
        default:
            return (<TextContents contents={contents} file={file} />)

    }
}