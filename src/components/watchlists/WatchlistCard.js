/*
    WatchlistCard.js

    Purpose:    This component is responsible for rendering the information for
                a single Watchlist to the Watchlists view.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// STYLES
import './WatchlistCard.css'

// DATA
import movieApiManager from '../movies/moviesApiManager'

// COMPONENTS
import EditWatchlistForm from './EditWatchlistForm'
import { getLoggedInUser } from '../../modules/helper'


class WatchlistCard extends Component {
    baseUrlPoster = "https://image.tmdb.org/t/p/original/"
    watchlistId = this.props.watchlist.id

    state = {
        title: '',
        description: '',
        posters: []
    }

    // adds up to 3 posters to state.posters. only adds if movie has image.
    getPosters = (movie) => {
        const images = this.state.posters
        if (movie.image && this.state.posters.length < 3) {
            images.push(movie.image)
        }
        if (images) {
            this.setState({ posters: images })
        }
    }

    getWatchlist = () => {
        // reset state to force re-render of Edit form button
        this.setState({
            title: '',
            description: ''
        })
        // get Watchlist
        movieApiManager.getWatchlist(this.watchlistId, getLoggedInUser())
            .then(watchlist => {
                // update title and description for this watchlist
                this.setState({
                    title: watchlist[0].listName,
                    description: watchlist[0].listDescription
                })
            })
    }


    getWatchlistMovies = () => {
        // get watchlistMovies for this watchlist
        movieApiManager.getAllWatchlistMovies(this.watchlistId)
            .then(watchlistMovies => {
                // getting  posters for each movie in watchlist.
                watchlistMovies.map(watchlistMovie => {
                    // Then, get movie for each watchlist movie
                    return movieApiManager.getOneMovie(watchlistMovie.movieId)
                        .then(movieArray => {
                            // then, getPoster and add to state
                            this.getPosters(movieArray[0])
                        })
                })
            })
    }

    getListUpdateState = () => {
        // reset state 
        this.setState({
            title: '',
            description: '',
            posters: []
        })
        this.getWatchlist()
        this.getWatchlistMovies()

    }

    componentDidMount() {
        this.getListUpdateState()
    }


    render() {
        return (
            <React.Fragment>
                <div className="watchlist-card">
                    <h4>{this.state.title}</h4>
                    <p>{this.state.description}</p>
                    <section className="watchlist-posters">
                        {this.state.posters.map(poster =>
                            <img
                                className="watchlist-poster"
                                src={`${this.baseUrlPoster}${poster}`}
                                alt={"movie poster"}
                                key={poster} />
                        )}
                    </section>
                    <section className="watchlist-buttons">
                        <Link to={`/watchlists/${this.watchlistId}`}>
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                            >
                                Select
                        </button>
                        </Link>
                        {/* conditional to force EditWatchlistForm button to 
                        re-render after submitting*/}
                        {this.state.title ?
                            <EditWatchlistForm
                                key={this.watchlistId}
                                watchlist={this.props.watchlist}
                                parentFunction={this.getWatchlist} />
                            : null

                        }
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => this.props.deleteWatchlist(this.watchlistId)}
                        >
                            Delete
                        </button>
                    </section>

                </div>
            </React.Fragment>
        )
    }
}

export default WatchlistCard