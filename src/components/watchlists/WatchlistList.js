/*
    WatchlistsList.js

    Purpose:    This component is responsible for rendering WatchlistCards
                that the user has created.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import WatchlistForm from './WatchlistForm'

// STYLES
import './WatchlistList.css'

// COMPONENTS
import WatchlistCard from './WatchlistCard'

// DATA
import watchlistApiManager from '../watchlists/watchlistApiManager'

// HELPER FUNCTIONS
import { getLoggedInUser } from '../../modules/helper'


class Watchlists extends Component {
    state = {
        watchlists: []
    }

    // handles deleting a watchlist
    deleteWatchlist = id => {
        watchlistApiManager.deleteWatchlist(id)
            .then(() => {
                this.getListsUpdateState()
            })
    }

    // gets watchlists and updates state
    getListsUpdateState = () => {
        watchlistApiManager.getOwnWatchlists(getLoggedInUser())
            .then(watchlists => {
                this.setState({ 
                    watchlists: watchlists,
                    modalOpen: false})
            })
    }

    componentDidMount() {
        this.getListsUpdateState()
    }

    render() {
        return (
            <React.Fragment>
                <h1>Watchlists</h1>
                <WatchlistForm 
                    parentFunction={this.getListsUpdateState}
                    />
                <section className="watchlist-list">
                    {this.state.watchlists.map(watchlist =>
                        <WatchlistCard
                            key={watchlist.id}
                            watchlist={watchlist}
                            deleteWatchlist={this.deleteWatchlist}
                        />
                    )}
                </section>
            </React.Fragment>
        )
    }
}

export default Watchlists