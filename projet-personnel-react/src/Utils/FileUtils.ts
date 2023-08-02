/**
 * Retourne la taille lisible d'un fichier
 * @param filesize la taille du fichier en octets
 * @returns la taille lisible
 */
export function getReadableSize(filesize: number) : string {
    let size = filesize;
    let unit = 'o';
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
