import { API_URL } from "../config";
import BaseService from "./BaseService";
import { default as FileModel } from "../Models/File";

/**
 * Service pour les appels API des dossiers
 */
export default class DirectoryService extends BaseService {

    /**
     * Retourne le contenu d'un dossier
     * @param id l'id du dossier
     * @returns File[] le contenu du dossier
     * @throws Error si une erreur est survenue
     */
    public static async getContents(id: number|null) {
        let response = await fetch(API_URL + '/dir/' + (id ?? ""), {
            method: 'GET',
            headers: this.getAuthHeadersWithContentType(),
        })

        let data = await response.json();
        if (response.ok) {
            return data.files as FileModel[];
        } else {
            throw new Error(data.message ?? "Une erreur est survenue");
        }
    }

    /**
     * Crée un dossier
     * @param name le nom du dossier
     * @param parent_id l'id du dossier parent
     * @returns File le dossier créé
     * @throws Error si une erreur est survenue
     */
    public static async createDirectory(name: string, parent_id: number|null) {
        let response = await fetch(API_URL + '/dir', {
            method: 'POST',
            headers: this.getAuthHeadersWithContentType(),
            body: JSON.stringify({
                directory: name,
                parent_id: parent_id,
            })
        })

        let data = await response.json();
        if (response.ok) {
            return data.file as FileModel;
        } else {
            throw new Error(data.message ?? "Une erreur est survenue");
        }
    }
}