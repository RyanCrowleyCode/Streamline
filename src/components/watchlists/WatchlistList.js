/*
    WatchlistsList.js

    Purpose:    This component is responsible for rendering WatchlistCards
                that the user has created.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import WatchlistForm from './WatchlistForm'
import Popup from "reactjs-popup";

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

    componentDidMount() {
        watchlistApiManager.getOwnWatchlists(getLoggedInUser())
            .then(watchlists => {
                this.setState({ watchlists: watchlists })
            })
    }

    render() {
        return (
            <React.Fragment>
                <h1>Watchlists</h1>
                <Popup
                    trigger={<button
                        className="btn btn-success new-watchlist-btn">
                        New Watchlist
                        </button>}
                    modal
                    closeOnDocumentClick>
                    <WatchlistForm close={this.close}/>
                </Popup>
                <section className="watchlist-list">
                    {this.state.watchlists.map(watchlist =>
                        <WatchlistCard
                            key={watchlist.id}
                            watchlist={watchlist}
                        />
                    )}
                </section>
            </React.Fragment>
        )
    }
}

export default Watchlists