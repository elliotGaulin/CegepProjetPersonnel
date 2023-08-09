import { useState } from "react";
import { default as FileModel } from "../../Models/File";
import { Box, Button, Icon, IconButton, Paper, Zoom } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { PageCallback } from "react-pdf/dist/cjs/shared/types";
import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from "@mui/icons-material";

//Importe le worker de pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

/**
 * Affiche le contenu d'un fichier PDF
 * @param contents Contenu du fichier PDF
 * @param file Modèle du fichier
 * @returns JSX.Element
 */
export default function PDFContents({ contents, file }: { contents: Blob, file: FileModel }) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<PageCallback>();
    const [scale, setScale] = useState<number>(1.5);
    const MIN_SCALE = 0.6;
    const MAX_SCALE = 2.5;

    /**
     * Met à jour le nombre de pages du document
     * @param numPages Nombre de pages du document
     */
    function handleLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    /**
     * Met à jour la page courante
     * @param page Page chargée
     */
    function handlePageLoadSuccess(page: PageCallback) {
        setCurrentPage(page);
    }

    return (
        <Box sx={{ width: currentPage?.originalWidth! * scale, margin: "auto", textAlign: "center" }}>
            <IconButton onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>
                <ArrowLeft />
            </IconButton>
            <IconButton onClick={() => setScale(scale - 0.1)} disabled={scale <= MIN_SCALE }>
                <ZoomOut />
            </IconButton>
            Page {pageNumber} de {numPages} (zoom: {scale.toFixed(1)})
            <IconButton onClick={() => setScale(scale + 0.1)} disabled={scale >= MAX_SCALE }>
                <ZoomIn />
            </IconButton>
            <IconButton onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === numPages}>
                <ArrowRight />
            </IconButton>

            <Document file={contents} onLoadSuccess={handleLoadSuccess}>
                <Page pageNumber={pageNumber} renderTextLayer={false} onLoadSuccess={handlePageLoadSuccess} scale={scale}/>
            </Document>
        </Box>
    );
}