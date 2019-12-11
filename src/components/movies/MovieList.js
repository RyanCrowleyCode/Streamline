/*
    MovieList.js

    Purpose:    This component is responsible for rendering the MovieCard component. 
                When a user is first logged in, they will see the MovieList. A
                user can search for movies on the movie list, and the MovieCard
                for each result will render. The default view of MovieList
                before a search will be top/popular movies. A user can add
                movies to their watchlist from MovieList by selecting the button
                to add a movie to a watchlist.

    Author(s): Ryan Crowley
*/

import React, { Component } from 'react'

class MovieList extends Component {
    render () {
        return (
            <React.Fragment>
                <h1>MovieList!</h1>
            </React.Fragment>
        )
    }
}

export default MovieList