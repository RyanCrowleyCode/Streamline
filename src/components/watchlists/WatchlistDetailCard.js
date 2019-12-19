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

// COMPONENTS
import WatchlistMovieForm from './WatchlistMovieForm'
import moviesApiManager from "../movies/moviesApiManager";


class WatchlistDetailCard extends Component {
    baseUrlPoster = "https://image.tmdb.org/t/p/original/"

    state = {
        title: '',
        releaseDate: '',
        runtime: null,
        synopsis: '',
        image: '',
        comments: '',
        movieSource: 1,
        sourceName: '',
        watchlistMovie: ''
    }

    // updates where a user wants to watch a movie
    updateMovieSource = (source) => {
        const updatedWatchlistMovie = this.state.watchlistMovie
        updatedWatchlistMovie.movieSourceId = source.id
        watchlistApiManager.updateWatchlistMovie(updatedWatchlistMovie)
            .then((wlMovie) => this.setState({
                movieSource: wlMovie.movieSourceId,
                sourceName: source.sourceName
            })
            )

    }

    getAndUpdate = () => {
        this.setState({watchlistMovie: ''})
        Promise.all([
            // get movie
            movieApiManager.getOneMovie(this.props.watchlistMovie.movieId),

            // get movieSource
            watchlistApiManager.getMovieSource(this.props.watchlistMovie.movieSourceId),

            // get watchlistMovie for comment's sake
            moviesApiManager.getWatchlistMovie(this.props.watchlistMovie.watchlistId, this.props.watchlistMovie.movieId)

        ])
            .then(([movie, movieSource, wlMovie]) => {
                const m = movie[0]
                const mSource = movieSource[0]
                this.setState({
                    title: m.title,
                    releaseDate: m.releaseDate,
                    runtime: m.runtime,
                    synopsis: m.synopsis,
                    comments: wlMovie[0].comments,
                    image: m.image,
                    movieSource: mSource.id,
                    sourceName: mSource.sourceName,
                    watchlistMovie: wlMovie[0]
                })
            })
    }

    componentDidMount() {
        this.getAndUpdate()
    }

    render() {
        const { title, releaseDate, runtime, synopsis, image, comments, sourceName } = this.state
        return (
            <React.Fragment>
                <div className="detail-card">
                    <div className="detail-card-top">
                        {image ?
                            <img src={`${this.baseUrlPoster}${image}`} alt={title} />
                            :
                            <FontAwesomeIcon className="default-icon" icon={faFilm} size="6x" />
                        }
                        <div className="detail-card-details">
                            <h3>{title}</h3>
                            <p className="year-runtime">
                                <span>{releaseDate}</span>
                                <span>{runtime}</span>
                            </p>
                            <p>{synopsis}</p>
                        </div>
                    </div>
                    <p>{comments}</p>
                    <div className="detail-card-bottom">
                        <DropdownButton
                            id={this.state.watchlistMovie.id}
                            title={sourceName}
                            variant="primary"
                        >
                            {this.props.sources.map(source =>
                                <Dropdown.Item
                                    id="sourceName"
                                    key={`${this.state.watchlistMovie.id}-source-${source.id}`}
                                    onClick={() => this.updateMovieSource(source)}
                                >
                                    {source.sourceName}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>
                        {this.state.watchlistMovie ?
                            <WatchlistMovieForm
                                key={this.state.watchlistMovie.id}
                                watchlistMovie={this.state.watchlistMovie}
                                getAndUpdate={this.getAndUpdate} />
                            : null
                        }
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => this.props.deleteMovie(this.state.watchlistMovie.id)}
                            disabled={this.props.loadingStatus}>
                            Delete
                        </button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default WatchlistDetailCard