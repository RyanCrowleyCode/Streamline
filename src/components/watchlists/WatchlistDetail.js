/*
    WatchlistDetail.js

    Purpose:    This component is responsible for rendering the detailed
                view of a single Watchlist. 

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from "react";

// COMPONENTS
import WatchlistDetailCard from './WatchlistDetailCard'

// DATA
import watchlistApiManager from '../watchlists/watchlistApiManager'
import movieApiManager from '../movies/moviesApiManager'

// HELPER FUNCTIONS
import { getLoggedInUser } from '../../modules/helper'

class WatchlistDetail extends Component {
    watchlistId = parseInt(this.props.watchlistId)

    state = {
        listName: '',
        listDescription: '',
        sortedMovies: [],
        sources: [],
        loadingStatus: false
    }

    // handles deleting a watchlist
    deleteWatchlist = id => {
        this.setState({loadingStatus: true})
        watchlistApiManager.deleteWatchlist(id)
            .then(() => {
                this.props.history.push('/watchlists')
            })
    }

    // handles deleting a movie from a watchlist
    deleteMovie = id => {
        watchlistApiManager.deleteWatchlistMovie(id)
            .then(() => {
                return this.getListsUpdateState()
            })
    }

    // gets watchlists and updates state
    getListsUpdateState = () => {
        Promise.all([
            // get watchlist
            movieApiManager.getWatchlist(this.watchlistId, getLoggedInUser()),
    
            // get watchlist movies
            movieApiManager.getAllWatchlistMovies(this.watchlistId),
    
            // get sources
            watchlistApiManager.getAllMovieSources()
    
        ])
            .then(([watchlist, watchlistMovies, sources]) => {
                this.setState({
                    listName: watchlist[0].listName,
                    listDescription: watchlist[0].listDescription,
                    sortedMovies: watchlistMovies,
                    sources: sources
                })
            })
            // console.log.("state from GLUS: ", this.state)
    }

    componentDidMount() {
        this.getListsUpdateState()
    }

    render() {
        return (
            <React.Fragment>
                <div className="watchlist-detail-container">
                    <h1>{this.state.listName}</h1>
                    <p>{this.state.listDescription}</p>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.deleteWatchlist(this.watchlistId)}
                        disabled={this.state.loadingStatus}
                    >
                        Delete List
                        </button>
                    {this.state.sortedMovies.map(watchlistMovie =>
                        <WatchlistDetailCard
                            loadingStatus={this.state.loadingStatus}
                            key={watchlistMovie.id}
                            watchlistMovie={watchlistMovie}
                            sources={this.state.sources} 
                            deleteMovie={this.deleteMovie}/>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default WatchlistDetail