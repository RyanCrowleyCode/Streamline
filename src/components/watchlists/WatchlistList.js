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
import { Form, Button } from 'react-bootstrap'

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
        watchlists: [],
        listName: '',
        listDescription: '',
        loadingStatus: false
    }

    // update listName and Description in state with every keystroke in input field
    handleFieldChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // handle adding new watchlist
    handleSubmit = e => {
        e.preventDefault()
        const { listName, listDescription } = this.state

        // make sure fields are filled out
        if (listName && listDescription) {
            this.setState({ loadingStatus: true })

            const newWatchlist = {
                listName: this.state.listName,
                listDescription: this.state.listDescription,
                userId: getLoggedInUser()
            }

            // get watchlists for user. If no watchlist with the same name
            // exists, create new watchlist. Otherwise, let the user know
            // that they already have a watchlist with this name.
            watchlistApiManager.getOwnWatchlists(getLoggedInUser())
                .then(watchlists => {
                    let isNew = true
                    watchlists.map(list => {
                        if (newWatchlist.listName === list.listName) {
                            isNew = false
                        }
                    })
                    return isNew
                })
                .then(isNew => {
                    if (isNew) {
                        // post newWatchlist to the database and close modal

                    } else {
                        window.alert("You already have a Watchlist with that name.")
                        this.setState({ loadingStatus: false })
                    }
                })


        } else {
            window.alert("Please fill out all of the fields.")
            this.setState({ loadingStatus: false })
        }
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
                    <Form>
                        <h4>New Watchlist</h4>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                id="listName"
                                type="text"
                                placeholder="Funny Movies"
                                onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                id="listDescription"
                                type="text"
                                placeholder="Write something to describe your list."
                                onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Button
                            variant="success"
                            type="button"
                            onClick={this.handleSubmit}
                            disabled={this.state.loadingStatus}>
                            Submit
                </Button>
                    </Form>
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