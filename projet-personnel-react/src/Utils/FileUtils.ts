/**
 * Retourne la taille lisible d'un fichier
 * @param filesize la taille du fichier en octets
 * @returns la taille lisible
 */
export function getReadableSize(filesize: number): string {
    let size = filesize;
    let unit = 'o';
    if (size === 0) {
        return ''; // Pas de taille (répertoire)
    }
    if (size > 1024) {
        size /= 1024;
        unit = 'ko';
    }
    if (size > 1024) {
        size /= 1024;
        unit = 'Mo';
    }
    if (size > 1024) {
        size /= 1024;
        unit = 'Go';
    }
    return size.toFixed(2) + unit;
}

/**
 * Retourne l'extension d'un fichier
 * @param filename le nom du fichier
 * @returns l'extension du fichier
 */
export function getFileExtension(filename: string){
    return filename.split('.').pop() || '';
}

/**
 * Retourne le langage d'un fichier en fonction de son extension
 * @param filename le nom du fichier
 * @returns le langage du fichier en fonction de son extension
 */
export function getLanguageFromFilename(filename: string){
    const extension = getFileExtension(filename);
    return LANGUAGE_EXTENSIONS[extension] || 'text';
}

/**
 * Retourne si un fichier est lisible
 * @param filename le nom du fichier
 * @returns boolean si un fichier est lisible
 */
export function isReadableFile(filename: string){
    const extension = getFileExtension(filename);
    return READABLE_EXTENSIONS.includes(extension);
}

/**
 * Associe une extension à un langage
 */
export const LANGUAGE_EXTENSIONS : any = {

    "ino":"arduino",
    "sh":"bash",
    "bas":"basic",
    "c":"c",
    "clj":"clojure",
    "cljs":"clojure",
    "cljc":"clojure",
    "edn":"clojure",
    "cmake":"cmake",
    "coffee":"coffeescript",
    "litcoffee":"coffeescript",
    "cpp":"cpp",
    "h":"cpp",
    "cs":"csharp",
    "css":"css",
    "d":"d",
    "dart":"dart",
    "dpr":"delphi",
    "dockerfile":"dockerfile",
    "f":"fortran",
    "f90":"fortran",
    "fs":"fsharp",
    "go":"go",
    "gradle":"gradle",
    "hs":"haskell",
    "ini":"ini",
    "java":"java",
    "js":"javascript",
    "json":"json",
    "kt":"kotlin",
    "php":"php",
    "txt":"plaintext",
    "ps1":"powershell",
    "py":"python",
    "rs":"rust",
    "scss":"scss",
    "sql":"sql",
    "swift":"swift",
    "ts":"typescript",
    "tsx":"typescript",
    "vbs":"vbscript",
    "yml":"yaml",
    "yaml":"yaml",
}

/**
 * Liste des extensions lisible
 */
export const READABLE_EXTENSIONS : string[] = [
    ...Object.keys(LANGUAGE_EXTENSIONS),
    "pdf",
    "md",
]
