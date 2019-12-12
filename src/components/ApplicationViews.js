/*
    ApplicationViews.js

    Purpose: This component is responsible for rendering components based on the url path.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

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
                    return !this.props.isLoggedIn ?
                        <Login
                            setUser={this.props.setUser}
                            getLoggedInUser={this.props.getLoggedInUser}
                            {...props} />
                        :
                        <Redirect to="/" />
                }} />
                <Route path="/register" render={props => {
                    return !this.props.isLoggedIn ?
                        <Register />
                        :
                        <Redirect to="/" />
                }} />
                <Route exact path="/" render={props => {
                    return this.props.isLoggedIn ?
                        <MovieList />
                    :
                        <Redirect to="/login" />
                }} />
                <Route exact path="/movies" render={props => {
                    return this.props.isLoggedIn ?
                        <MovieList />
                    :
                        <Redirect to="/login" />
                }} />
                <Route path="/watchlists" render={props => {
                    return this.props.isLoggedIn ?
                        <Watchlists />
                    :
                        <Redirect to="/login" />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationsView