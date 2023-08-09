import { API_URL } from "../config";
import BaseService from "./BaseService";
import { default as FileModel } from "../Models/File";

/**
 * Service pour la gestion des fichiers
 */
export default class FileService extends BaseService {

    /**
     * Récupère un fichier
     * @param id l'identifiant du fichier
     * @returns le fichier
     */
    public static async get(id: number) {
        let response = await fetch(API_URL + '/files/' + id, {
            method: 'GET',
            headers: this.getAuthHeaders(),
        })

        let data = await response.json();
        if (response.ok) {
            return data.file as FileModel;
        } else {
            throw new Error(data.message ?? "Une erreur est survenue");
        }
    }

    /**
     * Récupère la liste des fichiers
     * @returns la liste des fichiers
     */
    public static async getAll(): Promise<FileModel[]> {
        let response = await fetch(API_URL + '/files', {
            method: 'GET',
            headers: this.getAuthHeaders(),
        })

        let data = await response.json();
        if (response.ok) {
            return data.files as FileModel[];
        } else {
            throw new Error(data.message ?? "Une erreur est survenue");
        }
    }

    /**
     * Récupère un fichier
     * @param id l'identifiant du fichier
     * @returns le fichier
     */
    public static async delete(id: number) {
        let response = await fetch(API_URL + '/files/' + id, {
            method: 'DELETE',
            headers: this.getAuthHeaders(),
        })

        let data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message ?? "Une erreur est survenue");
        }
    }

    /**
     * Récupère le contenu d'un fichier
     * @param id l'identifiant du fichier
     * @returns le blob du fichier
     */
    public static async download(id: number) {
        let response = await fetch(API_URL + '/files/' + id + '/download', {
            method: 'GET',
            headers: this.getAuthHeaders(),
        })

        let data = await response.blob();
        if (response.ok) {
            return data;
        }
        else {
            throw new Error("Une erreur est survenue");
        }
    }

    /**
     * Téléverse un fichier
     * @param file le fichier à téléverser 
     * @returns le fichier téléversé
     */
    public static async upload(file: File, parent_id: number | null): Promise<FileModel> {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('parent_id', parent_id?.toString() ?? "");
        let response = await fetch(API_URL + '/files', {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: formData,
        })

        let data = await response.json();
        if (response.ok) {
            return data.file as FileModel;
        }
        else {
            throw new Error(data.message ?? "Une erreur est survenue");
        }
    }

    /**
     * Change la visibilité d'un fichier
     * @param id l'identifiant du fichier
     * @param isPublic la nouvelle visibilité du fichier
     * @returns le fichier
     */
    public static async setPublic(id: number, isPublic: boolean) {
        let response = await fetch(API_URL + '/files/' + id + '/public', {
            method: 'PATCH',
            headers: this.getAuthHeadersWithContentType(),
            body: JSON.stringify({ public: isPublic }),
        });
        let data = await response.json();
        if (response.ok) {
            return data.file as FileModel;
        } else {
            throw new Error(data.message ?? "Une erreur est survenue");
        }

    }
}