/*
    moviesApiManager.js

    Purpose:    This module contains movie specific fetch calls to database.json.
                This module leverages the power of StreamlineApiManager.js

    Author(s): Ryan Crowley
*/

// INTERNAL API FACTORY
import StreamlineApiManager from '../../modules/StreamlineApiManager'

export default {
    getMovies() {
        return StreamlineApiManager.getAll("movies")
    },

    postMovie(movieObj) {
        return StreamlineApiManager.post("movies", movieObj)
    },

    editMovie(movieObj) {
        return StreamlineApiManager.update("movies", movieObj)
    },

    getUserMovie(userId, movieId) {
        return StreamlineApiManager.getAll("userMovies", `?userId=${userId}&movieId=${movieId}`)
    },

    postUserMovie(userMovieObj) {
        return StreamlineApiManager.post("userMovies", userMovieObj)
    }
}