/*
    watchlistApiManager.js

    Purpose:    This module contains watchlist specific fetch calls to 
                database.json. This module leverages the power of 
                StreamlineApiManager.js

    Author(s): Ryan Crowley
*/

// INTERNAL API FACTORY
import StreamlineApiManager from '../../modules/StreamlineApiManager'

export default {
    getOwnWatchlists(userId) {
        return StreamlineApiManager.getAll("watchlists", `userId=${userId}`)
    },

    createNewWatchlist(watchlistObj) {
        return StreamlineApiManager.post("watchlists", watchlistObj)
    },

    deleteWatchlist(watchlistId) {
        return StreamlineApiManager.delete("watchlists", watchlistId)
    },

    deleteWatchlistMovie(watchlistMovieId) {
        return StreamlineApiManager.delete("watchlistMovies", watchlistMovieId)
    },

    getMovieSource(id) {
        return StreamlineApiManager.getAll("movieSources", `id=${id}`)
    },

    getAllMovieSources() {
        return StreamlineApiManager.getAll("movieSources")
    },

    updateWatchlistMovie(watchlistMovie) {
        return StreamlineApiManager.update("watchlistMovies", watchlistMovie)
    },

    getWatchlistMovieById(watchlistMovieId) {
        return StreamlineApiManager.getAll("watchlistMovies", `id=${watchlistMovieId}`)
    }
}