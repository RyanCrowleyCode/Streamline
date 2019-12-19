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
import { Form, Button } from 'react-bootstrap'
import Popup from "reactjs-popup";

// DATA
import watchlistApiManager from './watchlistApiManager'


class WatchlistMovieForm extends Component {

    state = {
        comments: '',
        loadingStatus: false
    }

    // update listName and Description in state with every keystroke in input field
    handleFieldChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }


    render() {
        return (
            // <Popup
            //     trigger={<button
            //         className="btn btn-success"
            //         // THIS IS WHERE YOU LEFT OFF. HAVING TROUBLE SENDING PROPS INTO POPUPS.
            //         onClick={() => console.log(this.props.watchlistMovie)} 
            //         >
            //         Edit
            //         </button>}
            //         modal
            //         closeOnDocumentClick>
            <Form>
                <h4>Edit Comments</h4>
                <Form.Group>
                    <Form.Label>Comments</Form.Label>
                    <Form.Control
                        id="comments"
                        type="text"
                        // value={COMMENTS}
                        onChange={this.handleFieldChange} />
                </Form.Group>
                <Button
                    variant="success"
                    type="button"
                    // onClick={this.handleSubmit}
                    disabled={this.state.loadingStatus}>
                    Update
                </Button>
            </Form>
            // </Popup>
        )
    }
}

export default WatchlistMovieForm