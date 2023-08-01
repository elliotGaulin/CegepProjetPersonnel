import { API_URL } from "../config";

class AuthService {
    public static isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return token !== null;
    }

    public static async login(email: string, password: string) {
        let response = await fetch(API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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

    public static async logout() {
        const user = JSON.parse(localStorage.getItem('user') ?? 'null');
        if (!user) {
            return;
        }
        console.log(user ?? "AAAH");

        let response = await fetch(API_URL + '/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + user.authorization.token ?? '',
            },
        })

        let data = await response.json();
        localStorage.removeItem('user')
        return data;
    }

    public static async signUp(email: string, name: string, password: string) {
        let response = await fetch(API_URL + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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

    public static async getCurrentUser() {
        const user = JSON.parse(localStorage.getItem('user') ?? 'null');
        return user ?? undefined;
    }
}

export default AuthService;