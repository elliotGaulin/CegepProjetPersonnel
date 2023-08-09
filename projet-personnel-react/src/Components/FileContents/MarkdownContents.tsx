import { useEffect, useState } from "react";
import { default as FileModel } from "../../Models/File";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

/**
 * Affiche le contenu d'un fichier markdown
 * @param contents Le contenu du fichier
 * @param file Le modèle du fichier 
 * @returns JSX.Element
 */
export default function MarkdownContents({ contents, file }: { contents: Blob, file: FileModel }) {

    const [textContents, setTextContents] = useState<string>('');

    useEffect(() => {
        contents.text().then((text) => {
            setTextContents(text);
        });
    }, [contents]);    

    return (
        <div>
            <ReactMarkdown>
                {textContents}
            </ReactMarkdown>
        </div>
    );
}