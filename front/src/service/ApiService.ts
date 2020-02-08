import axios from 'axios';
import {API_BASE_URL} from "../environment";

export type User = {
    email: string
    password: string
}

export type AuthResponse = {
    success: boolean
    message: string
}

export type FrequentWord = {
    word: string
    count: bigint
}

export type FrequentWordsResponse = {
    success: boolean
    frequentWords: FrequentWord[]
}

export type RssFeedResponse = {
    success: boolean
    items: any[] // not in control of structure, not enforcing type
}

class ApiService {

    async register(user: User): Promise<AuthResponse> {
        return await axios.post(API_BASE_URL + "/auth/register", user)
            .then(response => {
                return {success: true, message: response.data.success}
            }).catch(error => {
                return {success: false, message: error.response.data.error || 'Unknown API error'}
            });
    }

    async login(user: User): Promise<AuthResponse> {
        return await axios.post(API_BASE_URL + "/auth/login", {
            username: user.email,
            password: user.password
        }).then( (response) => {
            localStorage.setItem("token", response.data.token);
            return {success: true, message: ''}
        }).catch(error => {
            console.log("login ERROR");
            return {
                success: false,
                message: error.response.status === 401
                    ? 'Wrong user/email'
                    : 'Unknown server error'
            }
        });
    }

    async checkEmail(email: string): Promise<boolean> {
        return await axios.get(API_BASE_URL + '/validate/email/' + encodeURIComponent(email))
            .then(response => { return response.data.valid; })
            .catch(() => { return true; });
    }

    getToken() {
        return localStorage.getItem("token");
    }

    logOut() {
        localStorage.removeItem("token");
    }

    getAuthHeader() {
        return {Authorization: 'Bearer ' + this.getToken()};
    }

    isAuthorized() {
        return !!this.getToken();
    }

    async frequentWords(): Promise<FrequentWordsResponse> {
        return await axios.get(API_BASE_URL + "/api/frequentWords", {headers: this.getAuthHeader()})
            .then(response => {return {success: true, frequentWords: response.data.items}})
            .catch(error => {
                if (error.response.status === 401) {
                    localStorage.removeItem("token");
                }
                return {success: false, frequentWords: []}
            });
    }

    async rssFeed(): Promise<RssFeedResponse> {
        return await axios.get(API_BASE_URL + "/api/rss", {headers: this.getAuthHeader()})
            .then(response => {return {success: true, items: response.data.feed.entry}})
            .catch(error => {
                if (error.response.status === 401) {
                    localStorage.removeItem("token");
                }
                return {success: false, items: []}
            });
    }
}

export default new ApiService();
