/*
    EditWatchlistForm.js

    Purpose:    This component is responsible for rendering a form that allows
                the user to edit an existing Watchlist. Once the form is filled 
                out and submitted, the updated Watchlist will post to the database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from "react";
import { Form, Button, Modal } from 'react-bootstrap'

// DATA
import watchlistApiManager from './watchlistApiManager'
import moviesApiManager from '../movies/moviesApiManager'

// MODULES
import { getLoggedInUser } from '../../modules/helper'

class EditWatchlistForm extends Component {
    watchlist = this.props.watchlist

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
        // call parent render function
        this.props.parentFunction()
    }

    // update listName and Description in state with every keystroke in input field
    handleFieldChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // handle updating watchlist
    handleSubmit = e => {
        e.preventDefault()
        const { listName, listDescription } = this.state

        // make sure fields are filled out
        if (listName && listDescription) {
            this.setState({ loadingStatus: true })

            const updatedWatchlist = {
                id: this.watchlist.id,
                listName: this.state.listName,
                listDescription: this.state.listDescription,
                userId: parseInt(getLoggedInUser())
            }

            // post updatedWatchlist to the database
            watchlistApiManager.updateWatchlist(updatedWatchlist)
                .then(() => {
                    // close modal and reset state
                    this.close()

                })
        } else {
            window.alert("Please fill out all of the fields.")
            this.setState({ loadingStatus: false })
        }
    }

    componentDidMount() {
        moviesApiManager.getWatchlist(this.watchlist.id, getLoggedInUser())
            .then(watchlist => {
                this.setState({
                    listName: watchlist[0].listName,
                    listDescription: watchlist[0].listDescription
                })
            })
    }


    render() {
        return (
            <React.Fragment>
                <Button
                    variant="dark"
                    size="sm"
                    className="new-watchlist-button"
                    onClick={() => this.setState({ open: true })}>
                    Edit
                </Button>

                <Modal
                    show={this.state.open}
                    onHide={() => this.close()}
                    centered>
                    <Form>
                        <h4>Edit Watchlist</h4>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                id="listName"
                                type="text"
                                value={this.state.listName}
                                onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                id="listDescription"
                                type="text"
                                value={this.state.listDescription}
                                onChange={this.handleFieldChange} />
                        </Form.Group>
                        <div className="form-buttons">
                            <Button
                                variant="success"
                                type="button"
                                onClick={this.handleSubmit}
                                disabled={this.state.loadingStatus}>
                                Update
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

export default EditWatchlistForm