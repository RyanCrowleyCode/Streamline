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
    const monthName = months[month -1]
    const year = date.slice(0, 4)
    const day = date.slice(8, 10)

    return `${monthName} ${day}, ${year}`
    
}

// gets current logged in user
export function getLoggedInUser() {
    return localStorage.getItem("userId")
}

// add to or update a movie (internal database)
export function addMovie (movieObj, mode, score = "", id = "") {
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