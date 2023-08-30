import { httpMethods } from '../constants/constants';

class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    };

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: httpMethods.post,
            headers: this._headers,
            body: JSON.stringify({
                name,
                email,
                password
            }),
            credentials: 'include',
        })
            .then(this._handleResponse)
    }

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: httpMethods.post,
            headers: this._headers,
            body: JSON.stringify({
                email,
                password
            }),
            credentials: 'include',
        })
            .then(this._handleResponse)
    }

    checkToken() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: httpMethods.get,
            headers: {
                ...this._headers
            },
            credentials: 'include',
        })
            .then(this._handleResponse)
    }

    logOut() {
        return fetch(`${this._baseUrl}/users/logout`, {
            method: httpMethods.delete,
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._handleResponse)
    }

    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: httpMethods.get,
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._handleResponse);
    }

    editProfile(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: httpMethods.patch,
            headers: this._headers,
            body: JSON.stringify({ name, email }),
            credentials: 'include',
        })
            .then(this._handleResponse);
    };

    saveMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: httpMethods.post,
            headers: this._headers,
            body: JSON.stringify(movie),
            credentials: 'include',
        })
            .then(this._handleResponse)
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: httpMethods.get,
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._handleResponse);
    };

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: httpMethods.delete,
            headers: this._headers,
            credentials: 'include',
        })
            .then(this._handleResponse);
    }

}

export const mainApi = new MainApi({
    baseUrl: 'https://api.bitfilms-andreikodev.nomoreparties.sbs',
    headers: { "Content-Type": "application/json" }
})
