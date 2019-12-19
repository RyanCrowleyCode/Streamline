/*
    WatchlistMovieForm.js

    Purpose:    This component is responsible for rendering a form that allows
                the user to edit their comments on a movie. Once the form is filled 
                out and submitted, the updated watchlistMovie object will be PUT to
                the database..

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from "react";
import { Form, Button, Modal } from 'react-bootstrap'


// DATA
import watchlistApiManager from './watchlistApiManager'
import movieApiManager from '../movies/moviesApiManager'


class WatchlistMovieForm extends Component {
    watchlistId = parseInt(this.props.watchlistId)
    watchlistMovieId = parseInt(this.props.watchlistMovieId)

    state = {
        comments: '',
        title: '',
        watchlistMovie: {},
        loadingStatus: false,
        open: false
    }

    // close modal and reset state
    close() {
        this.setState({
            comments: '',
            title: '',
            watchlistMovie: {},
            loadingStatus: false,
            open: false
        })
    }

    // update listName and Description in state with every keystroke in input field
    handleFieldChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // handles putting to database
    updateComments = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true })
        // new object with updated comments]
        const updatedObject = this.state.watchlistMovie
        updatedObject.comments = this.state.comments
        // update watchlistMovie in database
        watchlistApiManager.updateWatchlistMovie(updatedObject)
            // then, return user back to watchlist view
            .then(() => this.props.history.push(`/watchlists/${this.watchlistId}`))
    }

    componentDidMount() {
        // get watchlist movie
        watchlistApiManager.getWatchlistMovieById(this.watchlistMovieId)
            .then(watchlistMovie => {
                this.setState({
                    comments: watchlistMovie[0].comments,
                    watchlistMovie: watchlistMovie[0]
                })
                // get movie
                movieApiManager.getOneMovie(watchlistMovie[0].movieId)
                    .then(movie => this.setState({ title: movie[0].title }))
            })
    }

    render() {
        return (
            <React.Fragment>
                <Button
                    variant="success"
                    className="edit-movie-button"
                    onClick={() => this.setState({open: true})>
                    Edit Movie
                        </Button>
                <Form>
                    <h4>Edit Comments</h4>
                    <Form.Group>
                        <Form.Label>{this.state.title}</Form.Label>
                        <Form.Control
                            id="comments"
                            type="text"
                            value={this.state.comments}
                            onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button
                        variant="success"
                        type="button"
                        onClick={this.updateComments}
                        disabled={this.state.loadingStatus}>
                        Update
                </Button>
                </Form>
            </React.Fragment>
        )
    }
}

export default WatchlistMovieForm