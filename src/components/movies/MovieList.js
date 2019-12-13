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

// REACT
import React, { Component } from 'react'

// COMPONENTS
import MovieCard from './MovieCard'

// DATA
import ExternalApiManager from '../../modules/ExternalApiManager'

class MovieList extends Component {
    state = {
        movies: [],
        searchWord: '',
    }

    // Update searchWord in state as user types
    handleEventChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // Use searchWord to search external api
    handleSearch = e => {
        if (this.state.searchWord) {
            ExternalApiManager.searchTitle(this.state.searchWord)
                .then(response => {
                    console.log(response.results)
                    this.setState({ movies: response.results })
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                <section >
                    <h2>Movies</h2>
                    <input
                        id="searchWord"
                        type="search"
                        onChange={this.handleEventChange}
                    >
                    </input>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.handleSearch}
                    >
                        Search
                    </button>
                </section>
                {this.state.movies.map(movie =>
                    <MovieCard
                        key={movie.id}
                        movieObj={movie}
                    />
                )}
            </React.Fragment>
        )
    }
}

export default MovieList