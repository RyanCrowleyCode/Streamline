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

    getOneMovie(movieId) {
        return StreamlineApiManager.getAll("movies", `id=${movieId}` )
    },

    postMovie(movieObj) {
        return StreamlineApiManager.post("movies", movieObj)
    },

    editMovie(movieObj) {
        return StreamlineApiManager.update("movies", movieObj)
    },

    getUserMovie(userId, movieId) {
        return StreamlineApiManager.getAll("userMovies", `userId=${userId}&movieId=${movieId}`)
    },

    postUserMovie(userMovieObj) {
        return StreamlineApiManager.post("userMovies", userMovieObj)
    },

    getWatchlist (watchlistId, userId) {
        return StreamlineApiManager.getAll("watchlists", `id=${watchlistId}&userId=${userId}`)
    },

    getWatchlistMovie(watchlistId, movieId) {
        return StreamlineApiManager.getAll("watchlistMovies", `watchlistId=${watchlistId}&movieId=${movieId}`)
    },

    getAllWatchlistMovies(watchlistId) {
        return StreamlineApiManager.getAll("watchlistMovies", `watchlistId=${watchlistId}&_sort=listIndex&_order=asc`)
    },

    postWatchilstMovie(watchlistMovieObj) {
        return StreamlineApiManager.post("watchlistMovies", watchlistMovieObj)
    }
}