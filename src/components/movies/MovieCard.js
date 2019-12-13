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

class MovieCard extends Component {
    baseUrlPoster = "https://image.tmdb.org/t/p/original/"
    movie = this.props.movieObj

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
                            <h6>{this.movie.release_date}</h6>
                            <p>{this.movie.overview}</p>
                        </div>
                    </div>
                    <DropdownButton
                        id={this.props.movieKey}
                        title="Watch"
                        variant="success"
                        className="watchlist-button"
                    >
                        <Dropdown.Item>
                            Test dropdown option
                            </Dropdown.Item>
                        <Dropdown.Item>
                            Test dropdown option2
                            </Dropdown.Item>
                    </DropdownButton>
                </div>
            </React.Fragment>
        )
    }

}

export default MovieCard