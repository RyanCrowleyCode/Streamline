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

const apiKey = apiKeys.TMDbKey
const baseUrl = "https://api.themoviedb.org/3/search/movie?"


export default {
    search(movie) {
        return fetch(`${baseUrl}api_key=${apiKey}&language=en-US&query=${movie}&page=1&include_adult=false`)
        .then(result => result.json())
    }
}