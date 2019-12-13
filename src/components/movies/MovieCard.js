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
    movie = this.props.movieObj

    render() {
        return (
            <React.Fragment>
                <div className="movie-card">
                    {this.movie.poster_path ?
                    <img src={`${this.baseUrlPoster}${this.movie.poster_path}`} alt={this.movie.title} />
                    :
                    <h2>NO POSTER</h2>
                    }
                    <h4>{this.movie.title}</h4>
                </div>
            </React.Fragment>
        )
    }

}

export default MovieCard