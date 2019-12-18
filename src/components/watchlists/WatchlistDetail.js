/*
    WatchlistDetail.js

    Purpose:    This component is responsible for rendering the detailed
                view of a single Watchlist. 

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from "react";
import { Form, Button } from 'react-bootstrap'

// COMPONENTS
import WatchlistMovieCard from './WatchlistMovieCard'

class WatchlistDetail extends Component {
    state = {
        listName: '',
        listDescription: '',
        sortedMovies: ''
    }


    render() {
        return(
            <WatchlistMovieCard />
        )
    }
}

export default WatchlistDetail