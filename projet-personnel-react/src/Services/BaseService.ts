/**
 * Service de base pour les appels API
 */
export default class BaseService {
    /**
     * Retourne les headers pour les requêtes API
     * @returns les headers pour les requêtes API
     */
    public static getHeaders() {
        return {
            'Content-Type': 'application/json',
        }
    }

    /**
     * Retourne les headers pour les requêtes API avec l'authentification
     * @returns les headers pour les requêtes API avec l'authentification
     */
    public static getAuthHeaders() {
        const user = JSON.parse(localStorage.getItem('user') ?? 'null');
        if (!user) {
            return this.getHeaders();
        }

        return {
            'Authorization': 'Bearer ' + user.authorization.token ?? '',
        };
    }

    /**
     * Retourne les headers pour les requêtes API avec l'authentification et le content-type
     */
    public static getAuthHeadersWithContentType() {
        return {
            ...this.getAuthHeaders(),
            ...this.getHeaders(),
        };
    }
}