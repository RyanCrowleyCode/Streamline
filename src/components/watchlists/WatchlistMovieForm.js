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

    // updates comments
    handleCommentChange = e => {
        this.setState({ comments: e.target.value })
    }

    // handles putting to database
    updateComments = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true })
        // new object with updated comments]
        // get watchlist movie
        watchlistApiManager.getWatchlistMovieById(this.watchlistMovieId)
            .then(watchlistMovie => {
                const updatedObject = watchlistMovie[0]
                updatedObject.comments = this.state.comments
                // update watchlistMovie in database
                watchlistApiManager.updateWatchlistMovie(updatedObject)
                    .then(() => {
                        // close modal and reset state
                        this.close()
                        // call parent render function
                        this.props.getAndUpdate()
                    })
            })
    }

    componentDidMount() {
        // get watchlist movie
        watchlistApiManager.getWatchlistMovieById(this.watchlistMovieId)
            .then(watchlistMovie => {
                this.setState({
                    comments: watchlistMovie[0].comments,
                })
                // get movie
                movieApiManager.getOneMovie(watchlistMovie[0].movieId)
                    .then(movie => this.setState({ title: movie[0].title }))
            })
    }

    render() {
        return (
            <React.Fragment >
                <Button
                    variant="success"
                    className="edit-movie-button"
                    onClick={() => this.setState({ open: true })}>
                    Edit Movie
                </Button>
                <Modal
                    show={this.state.open}
                    onHide={() => this.close()}
                    centered>
                    <Form>
                        <h4>Edit Comments</h4>
                        <Form.Group>
                            <Form.Label>{this.state.title}</Form.Label>
                            <Form.Control
                                id={`comments-${this.watchlistMovieId}`}
                                type="text"
                                value={this.state.comments}
                                onChange={this.handleCommentChange} />
                        </Form.Group>
                        <Button
                            variant="success"
                            type="button"
                            onClick={this.updateComments}
                            disabled={this.state.loadingStatus}>
                            Update
                </Button>
                    </Form>
                </Modal>
            </React.Fragment >
        )
    }
}

export default WatchlistMovieForm