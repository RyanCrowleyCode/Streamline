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


class WatchlistCard extends Component {
    baseUrlPoster = "https://image.tmdb.org/t/p/original/"
    watchlist = this.props.watchlist

    state = {
        posters: []
    }

    // adds up to 3 posters to state.posters. only adds if movie has image.
    getPosters = (movie) => {
        const images = this.state.posters
        if (movie.image && this.state.posters.length < 3) {
            images.push(movie.image)
        }
        this.setState({ posters: images })
    }

    componentDidMount() {
        // getting posters for each movie in watchlist.
        // first, get watchlistMovies for this watchlist
        movieApiManager.getAllWatchlistMovies(this.watchlist.id)
            .then(watchlistMovies => {
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


    render() {
        return (
            <React.Fragment>
                <div className="watchlist-card">
                    <h4>{this.watchlist.listName}</h4>
                    <p>{this.watchlist.listDescription}</p>
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
                        <Link to={`/watchlists/${this.watchlist.id}`}>
                            <button
                                type="button"
                                className="btn btn-primary btn-sm"
                            >
                                See List
                        </button>
                        </Link>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => this.props.deleteWatchlist(this.watchlist.id)}
                        >
                            Delete List
                        </button>
                    </section>

                </div>
            </React.Fragment>
        )
    }
}

export default WatchlistCard