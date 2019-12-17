/*
    WatchlistCard.js

    Purpose:    This component is responsible for rendering the information for
                a single Watchlist to the Watchlists view.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// STYLES
import './WatchlistCard.css'

// DATA
import movieApiManager from '../movies/moviesApiManager'


class WatchlistCard extends Component {
    baseUrlPoster = "https://image.tmdb.org/t/p/original/"
    watchlist = this.props.watchlist

    // array of movies to pass to getPosters
    movies = []
    // array of images to update state
    images = []

    state = {
        posters: []
    }

    getPosters(movieArray) {
        console.log("Movie Array: ", movieArray)
        for (const movie of movieArray) {
            console.log("Movie: ", movie)
        //     if (this.images.length <= 3 && movie.image) {
        //         this.images.push(movie.image)
        //     }
        }

        // this.setState({ posters: this.images })
        // console.log("STATE: ", this.state)
    }

    componentDidMount() {
        // getting posters for each movie in watchlist.

        // First, get watchlistMovies for this watchlist
        movieApiManager.getAllWatchlistMovies(this.watchlist.id)
            .then(watchlistMovies => {
                watchlistMovies.map(watchlistMovie => {
                    // Then, get movie for each watchlist movie
                    movieApiManager.getOneMovie(watchlistMovie.movieId)
                        .then(movieArray => {
                            // then, add movie to movies array
                            this.movies.push(movieArray[0])
                        })
                })
            })
            // Then, update state by calling getPoster on the movies array
            .then(() => this.getPosters(this.movies))
    }


    render() {
        return (
            <React.Fragment>
                <div className="watchlist-card">
                    <h4>{this.watchlist.listName}</h4>
                    <p>{this.watchlist.listDescription}</p>
                    <section className="watchlist-posters">

                    </section>
                    <section className="watchlist-buttons"></section>

                </div>
            </React.Fragment>
        )
    }
}

export default WatchlistCard