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
import watchlistApiManager from '../watchlists/watchlistApiManager'

// HELPER FUNCTIONS
import { getLoggedInUser } from '../../modules/helper'

// STYLES
import './MovieList.css'


class MovieList extends Component {
    state = {
        movies: [],
        popularMovies: [],
        watchlists: [],
        searchWord: '',
        searching: false
    }

    // Update searchWord in state as user types
    handleEventChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // Use searchWord to search external api
    handleSearch = e => {
        e.preventDefault()
        this.setState({searching: true, popularMovies: []})
        if (this.state.searchWord) {
            ExternalApiManager.searchTitle(this.state.searchWord)
                .then(response => {
                    this.setState({ movies: response.results })
                })
        }
    }

    // gets watchlists for user
    getLists = () => {
        watchlistApiManager.getOwnWatchlists(getLoggedInUser())
            .then(watchlists => {
                this.setState({ watchlists: watchlists })
            })
    }

    componentDidMount() {
        this.getLists()
        if (!this.state.searching) {
            ExternalApiManager.getPopular()
            .then(popular => this.setState({popularMovies: popular.results.slice(0,18)}))
        }
    }

    render() {
        return (
            <React.Fragment>
                <h1>Movies</h1>
                <form className="search-area" onSubmit={this.handleSearch}>
                    <input
                        id="searchWord"
                        type="search"
                        placeholder="search by title"
                        onChange={this.handleEventChange}

                    >
                    </input>
                    <button
                        type="submit"
                        value="Submit"
                        className="btn btn-primary search-button"
                        onClick={this.handleSearch}
                    >
                        Search
                    </button>
                </form>
                <section className="movie-list">
                    {this.state.movies.map(movie =>
                        <MovieCard
                            key={movie.id}
                            movieObj={movie}
                            movieKey={movie.id}
                            watchlists={this.state.watchlists}
                            getLists={this.getLists}
                        />
                    )}
                    {this.state.popularMovies.map(movie =>
                        <MovieCard
                            key={movie.id}
                            movieObj={movie}
                            movieKey={movie.id}
                            watchlists={this.state.watchlists}
                            getLists={this.getLists}
                        />
                    )}
                </section>
            </React.Fragment>
        )
    }
}

export default MovieList