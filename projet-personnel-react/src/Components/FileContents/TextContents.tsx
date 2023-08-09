import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { getLanguageFromFilename } from "../../Utils/FileUtils";
import { useEffect, useState } from "react";
import { default as FileModel } from "../../Models/File";

/**
 * Affiche le contenu d'un fichier texte
 * @param contents Le contenu du fichier
 * @param file Le modèle du fichier 
 * @returns JSX.Element
 */
export default function TextContents({ contents, file }: { contents: Blob, file: FileModel }) {

    const [language, setLanguage] = useState<string>('text');
    const [textContents, setTextContents] = useState<string>('');

    useEffect(() => {
        setLanguage(getLanguageFromFilename(file.filename));
        contents.text().then((text) => {
            setTextContents(text);
        });
    }, [contents, file.filename]);    

    return (
        <div>
            <SyntaxHighlighter language={language} style={atomOneDarkReasonable}>
                {textContents}
            </SyntaxHighlighter>
        </div>
    );
}