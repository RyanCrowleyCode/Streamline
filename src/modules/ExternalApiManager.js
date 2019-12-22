/*
    ExternalApiManager.js

    Purpose:    This module is responsible for making fetch calls to an external
                API to obtain movie information. API used is "The Movie Database"
                (https://www.themoviedb.org/). This product uses the TMDb API but
                is not endorsed or certified by TMDb.

    Author(s): Ryan Crowley
*/

// TMDb apiKey
import apiKeys from '../apiKeys'

// &language=en-US&page=1&include_adult=false

const apiKey = apiKeys.TMDbKey
const baseUrlTitle = "https://api.themoviedb.org/3/search/movie?"
const baseUrlPopular = "https://api.themoviedb.org/3/discover/movie?api_key="
const baseUrlMovie = "https://api.themoviedb.org/3/movie/"



export default {
    searchTitle(movie) {
        return fetch(`${baseUrlTitle}api_key=${apiKey}&language=en-US&query=${movie}&page=1&include_adult=false`)
        .then(result => result.json())
    },

    getPopular() {
        return fetch(`${baseUrlPopular}${apiKey}&language=en-US&page=1&include_adult=false`)
        .then(result => result.json())

    },

    getMovie(movieId) {
        return fetch(`${baseUrlMovie}${movieId}?language=en-US&api_key=${apiKey}`)
        .then(result => result.json())
    }
}