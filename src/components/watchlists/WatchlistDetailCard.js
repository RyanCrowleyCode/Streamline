/*
    WatchlistMovieCard.js

    Purpose:    This component is responsible for rendering a card for
                a movie when user is on the WatchlistDetail view.

    Author(s): Ryan Crowley
*/

/*
    WatchlistDetail.js

    Purpose:    This component is responsible for rendering the detailed
                view of a single Watchlist. 

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

// DATA
import movieApiManager from '../movies/moviesApiManager'
import watchlistApiManager from "./watchlistApiManager";

// STYLES
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import './WatchlistDetailCard.css'


class WatchlistDetailCard extends Component {
    baseUrlPoster = "https://image.tmdb.org/t/p/original/"
    watchlistMovie = this.props.watchlistMovie

    state = {
        title: '',
        releaseDate: '',
        runtime: null,
        synopsis: '',
        image: '',
        comments: this.watchlistMovie.comments,
        movieSource: 1,
        sourceName: ''
    }

    componentDidMount() {
        Promise.all([
            // get movie
            movieApiManager.getOneMovie(this.watchlistMovie.movieId),

            // get movieSource
            watchlistApiManager.getMovieSource(this.watchlistMovie.movieSourceId)

        ])
            .then(([movie, movieSource]) => {
                const m = movie[0]
                const mSource = movieSource[0]
                this.setState({
                    title: m.title,
                    releaseDate: m.releaseDate,
                    runtime: m.runtime,
                    synopsis: m.synopsis,
                    image: m.image,
                    movieSource: mSource.id,
                    sourceName: mSource.sourceName
                })
            })
    }

    render() {
        const { title, releaseDate, runtime, synopsis, image, comments, movieSource, sourceName } = this.state
        return (
            <React.Fragment>
                <div className="detail-card">
                    <div className="detail-card-top">
                        {image ?
                            <img src={`${this.baseUrlPoster}${image}`} alt={title} />
                            :
                            <FontAwesomeIcon className="default-icon" icon={faFilm} size="6x" />
                        }
                        <h3>{title}</h3>
                        <p className="year-runtime">
                            <span>{releaseDate}</span>
                            <span>{runtime}</span>
                        </p>
                        <p>{synopsis}</p>
                    </div>
                    <p>{synopsis}</p>
                    <div className="detail-card-bottom">
                        <DropdownButton
                            id={this.watchlistMovie.id}
                            title={sourceName}
                            variant="primary"
                        >
                            {this.props.sources.map(source =>
                                <Dropdown.Item
                                    id={source.id}
                                    key={`${this.watchlistMovie.id}-source-${source.id}`}
                                // onClick={this.DOSOMETHING}
                                >
                                    {source.sourceName}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>
                        <button
                            type="button"
                            className="btn btn-success"
                        >
                            Edit Movie
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                        >
                            Delete List
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default WatchlistDetailCard