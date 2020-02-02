import axios from 'axios';
import {API_BASE_URL} from "../environment";

class ApiService {

    register(user) {
        return axios.post(API_BASE_URL + "/auth/register", user);
    }

    login(credentials) {
        return axios.post(API_BASE_URL + "/auth/login", credentials);
    }

    async checkEmail(email) {
        return await axios.get(API_BASE_URL + '/validate/email/' + encodeURIComponent(email))
            .then(response => { return response.data.valid; })
            .catch(() => { return false; });
    }

    rssFeed() {
        return axios.get(API_BASE_URL + "/api/rss", {headers: this.getAuthHeader()});
    }

    frequentWords() {
        return axios.get(API_BASE_URL + "/api/frequentWords", {headers: this.getAuthHeader()});
    }

    setToken(token) {
        localStorage.setItem("token", token);
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
}

export default new ApiService();
