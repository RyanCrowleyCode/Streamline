/*
    helper.js

    Purpose:    This module exports helper functions that can be imported into
                components. 

    Author(s): Ryan Crowley
*/

// DATA
import moviesApiManager from '../components/movies/moviesApiManager'


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Converts a date in the form of 'YYYY-MM-DD' to 'Month Day, Year'
export function toDatePhrase(date) {
    const month = parseInt(date.slice(5, 7))
    const monthName = months[month - 1]
    const year = date.slice(0, 4)
    const day = date.slice(8, 10)

    return `${monthName} ${day}, ${year}`

}

// gets current logged in user
export function getLoggedInUser() {
    return localStorage.getItem("userId")
}

// add to or update a movie (internal database)
export function addMovie(movieObj, mode, score = "", id = "") {
    const movie = {
        imdb_id: movieObj.imdb_id,
        title: movieObj.title,
        releaseDate: movieObj.release_date,
        runtime: movieObj.runtime,
        synopsis: movieObj.overview,
        image: movieObj.poster_path,
        score: null
    }
    if (mode === "create") {
        return moviesApiManager.postMovie(movie)
    } else {
        /*  score is an internal app measurement, not external. make sure
            score stays as whatever it was in Streamline, we are only trying
            to update items we are pulling from TMDb. 
        */
        movie.score = score
        movie.id = id
        return moviesApiManager.editMovie(movie)
    }
}

// Loop through Movies in Database to determine if movie exists in database.
// Call correct post or edit function based on results.
export function loopMoviesAddOrEdit (tmdbMovie, movies) {
    // need to loop through movies using imdb_id
    // if movie in database, update movie with latest data.
    let movieInDatabase = false
    for (const m of movies) {
        if (m.imdb_id === tmdbMovie.imdb_id) {
            movieInDatabase = true
            return addMovie(tmdbMovie, "edit", m.score, m.id)
        }
    }
    // if movie not in database, add movie to database.
    if (!movieInDatabase) {
        return addMovie(tmdbMovie, "create")
    }
}

export function createUserMovie (userId, movieId) {
    const newUserMovie = {
        userId: userId,
        movieId: movieId,
        score: null
    }

    moviesApiManager.postUserMovie(newUserMovie)
}

export function createWatchlistMovie (watchlistId, movieId, listIndex) {
    const newWatchlistMovie = {
        watchlistId: watchlistId,
        movieId: movieId,
        comments: "",
        listIndex: listIndex,
        movieSourceId: 1,
    }

    moviesApiManager.postWatchilstMovie(newWatchlistMovie)
}