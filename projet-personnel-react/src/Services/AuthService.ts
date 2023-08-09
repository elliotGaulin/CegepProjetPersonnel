import { API_URL } from "../config";
import BaseService from "./BaseService";

/**
 * Service de gestion de l'authentification
 * Effectue les requêtes vers l'API pour l'authentification
 */
class AuthService extends BaseService {

    /**
     * Connecte l'utilisateur
     * @param email Adresse email de l'utilisateur
     * @param password Mot de passe de l'utilisateur
     * @returns les données de l'utilisateur connecté
     */
    public static async login(email: string, password: string) {
        let response = await fetch(API_URL + '/login', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email, password })
        })
        let data = await response.json();
        if (response.ok) {
            let user = data.user;
            user.authorization = data.authorization;
            localStorage.setItem('user', JSON.stringify(user));
            return data;
        } else {
            throw new Error(data.message ?? "Une erreur est survenue");
        }
    }

    /**
     * Déconnecte l'utilisateur
     * @returns un message de confirmation de déconnexion
     */
    public static async logout() {

        let response = await fetch(API_URL + '/logout', {
            method: 'POST',
            headers: this.getAuthHeaders(),
        })

        let data = await response.json();
        localStorage.removeItem('user');
        localStorage.removeItem('currentDir');
        return data;
    }

    /**
     * Inscription et connexion d'un nouvel utilisateur
     * @param email Adresse email de l'utilisateur
     * @param name Nom de l'utilisateur
     * @param password Mot de passe de l'utilisateur
     * @returns les données de l'utilisateur connecté
     */
    public static async signUp(email: string, name: string, password: string) {
        let response = await fetch(API_URL + '/register', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ email, name, password })
        })

        if (response.ok) {
            let loginData = await this.login(email, password);
            return loginData;
        }
        else {
            let data = await response.json();
            throw new Error(data.message ?? "Une erreur est survenue");
        }
    }

    /**
     * Récupère les données de l'utilisateur connecté
     * @returns les données de l'utilisateur connecté
     */
    public static async getCurrentUser() {
        const user = JSON.parse(localStorage.getItem('user') ?? 'null');
        return user ?? undefined;
    }
}

export default AuthService;