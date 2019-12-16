/*
    MovieCard.js

    Purpose:    This component is responsible for displaying the information
                for a single movie. This handles functionality for adding a
                movie to a watchlist, including posting movies to the database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'

// STYLES
import './MovieCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-bootstrap/Dropdown'

// DATA
import ExternalApiManager from '../../modules/ExternalApiManager'

// MODULES
import { toDatePhrase } from '../../modules/helper'
import moviesApiManager from './moviesApiManager'
import { addMovie } from '../../modules/helper'


class MovieCard extends Component {
    baseUrlPoster = "https://image.tmdb.org/t/p/original/"
    movie = this.props.movieObj


    // Loop through Movies in Database to determine if movie exists in database.
    // Call correct post or edit function based on results.
    loopThroughMovies = (tmdbMovie, movies) => {
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

    // Add movie to a watchlist when user selects watchlist
    addToWatchlist = e => {
        const watchlist = e.target.id
        const movieId = this.movie.id

        ExternalApiManager.getMovie(movieId)
            .then(tmdbMovie => {
                // get movies from internal database. 
                moviesApiManager.getMovies()
                    .then(movies => {
                        // add or edit movie in database with tmdbMovie
                        return this.loopThroughMovies(tmdbMovie, movies)
                    })
                    .then(response => {
                        // simultaneously, get userMovies and create if not there
                        // AND get watchlistMovie and create if not there
                    })
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="movie-card">
                    <div className="movie-card-top">

                        {this.movie.poster_path ?
                            <img src={`${this.baseUrlPoster}${this.movie.poster_path}`} alt={this.movie.title} />
                            :
                            <FontAwesomeIcon className="default-icon" icon={faFilm} size="6x" />
                        }
                        <div className="movie-card-details">
                            <h5>{this.movie.title}</h5>
                            {/* Convert date to phrase if present */}
                            {this.movie.release_date
                                ?
                                <h6>{toDatePhrase(this.movie.release_date)}</h6>
                                :
                                null
                            }
                            {/* keep paragraph from getting too long */}
                            {this.movie.overview.length <= 375
                                ?
                                <p>{this.movie.overview}</p>
                                :
                                <p>{this.movie.overview.slice(0, 375) + "..."}</p>
                            }
                        </div>
                    </div>
                    <div className="movie-card-bottom">
                        <DropdownButton
                            id={this.props.movieKey}
                            title="Watch"
                            variant="success"
                            className="watchlist-button"
                        >{this.props.watchlists.map(watchlist =>
                            <Dropdown.Item
                                key={`${this.props.movieKey}-${watchlist.id}`}
                                id={watchlist.id}
                                onClick={this.addToWatchlist}
                            >
                                {watchlist.listName}
                            </Dropdown.Item>
                        )}
                        </DropdownButton>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default MovieCard