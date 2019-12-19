/*
    WatchlistForm.js

    Purpose:    This component is responsible for rendering a form that allows
                the user to create a new Watchlist. Once the form is filled out
                and submitted, a new Watchlist will be posted to the database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from "react";
import { Form, Button, Modal } from 'react-bootstrap'

// DATA
import watchlistApiManager from './watchlistApiManager'

// MODULES
import { getLoggedInUser } from '../../modules/helper'

class WatchlistForm extends Component {

    state = {
        listName: '',
        listDescription: '',
        loadingStatus: false,
        open: false
    }

    // close modal and reset state
    close() {
        this.setState({
            listName: '',
            listDescription: '',
            loadingStatus: false,
            open: false
        })
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
                userId: parseInt(getLoggedInUser())
            }

            // get watchlists for user. If no watchlist with the same name
            // exists, create new watchlist. Otherwise, let the user know
            // that they already have a watchlist with this name.
            watchlistApiManager.getOwnWatchlists(getLoggedInUser())
                .then(watchlists => {
                    let isNew = true
                    for (const list of watchlists) {
                        if (newWatchlist.listName === list.listName) {
                            isNew = false
                        }
                    }
                    return isNew
                })
                .then(isNew => {
                    if (isNew) {
                        // post newWatchlist to the database
                        watchlistApiManager.createNewWatchlist(newWatchlist)
                            .then(() => {
                                // close modal and reset state
                                this.close()
                                // call parent render function
                                this.props.parentFunction()
                            })
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


    render() {
        return (
            <React.Fragment>
                <Button
                    variant="success"
                    className="new-watchlist-button"
                    onClick={() => this.setState({ open: true })}>
                    New Watchlist
                </Button>

                <Modal
                    show={this.state.open}
                    onHide={() => this.close()}
                    centered>
                    <Form>
                        <h4>New Watchlist</h4>
                        <Form.Group onSubmit={this.handleSubmit}>
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
                        <div className="form-buttons">
                            <Button
                                variant="success"
                                type="submit"
                                onClick={this.handleSubmit}
                                disabled={this.state.loadingStatus}>
                                Submit
                        </Button>
                            <Button
                                onClick={() => this.close()}
                                variant="dark">
                                Cancel
                        </Button>
                        </div>
                    </Form>
                </Modal>
            </React.Fragment>
        )
    }
}

export default WatchlistForm