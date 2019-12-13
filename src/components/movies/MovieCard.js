/*
    MovieCard.js

    Purpose:    This component is responsible for displaying the information
                for a single movie.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// STYLES
import './MovieCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

class MovieCard extends Component {
    baseUrlPoster = "https://image.tmdb.org/t/p/original/"
    movie = this.props.movieObj

    render() {
        return (
            <React.Fragment>
                <div className="movie-card">
                    {this.movie.poster_path ?
                        <img src={`${this.baseUrlPoster}${this.movie.poster_path}`} alt={this.movie.title} />
                        :
                        <FontAwesomeIcon className="default-icon" icon={faFilm} size="6x" />
                    }
                    <div className="movie-card-details">
                        <h4>{this.movie.title}</h4>
                        <h6>{this.movie.release_date}</h6>
                        <p>{this.movie.overview}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default MovieCard