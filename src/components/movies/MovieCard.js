/*
    MovieCard.js

    Purpose:    This component is responsible for displaying the information
                for a single movie.

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


class MovieCard extends Component {
    baseUrlPoster = "https://image.tmdb.org/t/p/original/"
    movie = this.props.movieObj

    // add to or update a movie (internal database)
    addMovie = (movieObj, mode, score="", id="") => {
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
            moviesApiManager.postMovie(movie)
        } else {
            /*  score is an internal app measurement, not external. make sure
                score stays as whatever it was in Streamline, we are only trying
                to update items we are pulling from TMDb. 
            */
            movie.score = score
            movie.id = id
            moviesApiManager.editMovie(movie)
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
                // need to loop through movies using imdb_id
                // if movie in database, update movie with latest data.
                let movieInDatabase = false
                for (const m of movies) {
                    if (m.imdb_id === tmdbMovie.imdb_id) {
                        movieInDatabase = true
                        this.addMovie(tmdbMovie, "edit", m.score, m.id)
                    }
                }
                // if movie not in database, add movie to database.
                if (!movieInDatabase) {
                    this.addMovie(tmdbMovie, "create")
                }


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