import { httpMethods } from '../constants/constants';

class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    };

    getMovies() {
        return fetch(`${this._baseUrl}`, {
            method: httpMethods.get,
            headers: this._headers,
        })
            .then(this._handleResponse);
    };
}

export const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: { "Content-Type": "application/json" }
})