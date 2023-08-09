/**
 * Modèle de données pour les fichiers
 */
export default interface File {
    id: number | null
    filename: string,
    path: string,
    filesize: number,
    updated_at: Date,
    created_at: Date,
    user_id: number,
    public : boolean,
    is_directory: boolean,
    parent_id: number | null,
    mime_type: string,
}