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

class MovieCard extends Component {
    baseUrlPoster = "https://image.tmdb.org/t/p/original/"
    render() {
        return (
            <React.Fragment>
                <div className="movie-card">
                    <img src={`${this.baseUrlPoster}${this.props.movie.poster_path}`} alt={this.props.movie.title} />
                    <h4>{this.props.movie.title}</h4>
                </div>
            </React.Fragment>
        )
    }

}

export default MovieCard