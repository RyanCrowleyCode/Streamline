/*
    ApplicationViews.js

    Purpose: This component is responsible for rendering components based on the url path.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// Authorization
import Login from './auth/Login'
import Register from './auth/Register'

// Movies
import MovieList from './movies/MovieList'
import Watchlists from './watchlists/WatchlistList'

// Watchlists


class ApplicationsView extends Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/login" render={props => {
                    return <Login
                        setUser={this.props.setUser} 
                        getLoggedInUser={this.props.getLoggedInUser}
                        {...props}
                    />
                }} />
                <Route path="/register" render={props => {
                    return <Register />
                }} />
                <Route exact path="/" render={props => {
                    return <MovieList />
                }} />
                <Route path="/watchlists" render={props => {
                    return <Watchlists />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationsView