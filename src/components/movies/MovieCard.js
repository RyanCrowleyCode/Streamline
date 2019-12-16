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

// MODULES
import { toDatePhrase } from '../../modules/helper'

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
                        >
                            <Dropdown.Item>
                                Test dropdown option
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Test dropdown option2
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default MovieCard