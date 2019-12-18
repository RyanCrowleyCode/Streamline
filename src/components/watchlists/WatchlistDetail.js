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
        sources: []
    }

    // handles deleting a watchlist
    deleteWatchlist = id => {
        watchlistApiManager.deleteWatchlist(id)
            .then(() => {
                this.getListsUpdateState()
            })
    }

    componentDidMount() {
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
                console.log(sources)
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="watchlist-detail-container">
                    <h1>{this.state.listName}</h1>
                    <p>{this.state.listDescription}</p>
                    {this.state.sortedMovies.map(watchlistMovie =>
                        <WatchlistDetailCard 
                        key={watchlistMovie.id}
                        watchlistMovie={watchlistMovie}
                        sources={this.state.sources}/>
                    )}
                </div>
            </React.Fragment>
        )
    }
}

export default WatchlistDetail