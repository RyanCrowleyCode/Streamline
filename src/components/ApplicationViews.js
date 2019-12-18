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

// Views
import MovieList from './movies/MovieList'
import Watchlists from './watchlists/WatchlistList'
import WatchlistDetail from './watchlists/WatchlistDetail'


class ApplicationsView extends Component {
    render() {
        return (
            <React.Fragment>
                <Route exact path="/login" render={props => {
                    return !this.props.isLoggedIn ?
                        <Login
                            setUser={this.props.setUser}
                            {...props} />
                        :
                        <Redirect to="/" />
                }} />
                <Route exact path="/register" render={props => {
                    return !this.props.isLoggedIn ?
                        <Register
                            setUser={this.props.setUser}
                            {...props} 
                        />
                        :
                        <Redirect to="/" />
                }} />
                <Route exact path="/" render={props => {
                    return this.props.isLoggedIn ?
                        <MovieList
                            getLoggedInUser={this.props.getLoggedInUser}
                            {...props}
                        />
                        :
                        <Redirect to="/login" />
                }} />
                <Route exact path="/movies" render={props => {
                    return this.props.isLoggedIn ?
                        <MovieList
                            getLoggedInUser={this.props.getLoggedInUser}
                            {...props}
                        />
                        :
                        <Redirect to="/login" />
                }} />
                <Route exact path="/watchlists" render={props => {
                    return this.props.isLoggedIn ?
                        <Watchlists
                            getLoggedInUser={this.props.getLoggedInUser}
                            {...props}
                        />
                        :
                        <Redirect to="/login" />
                }} />
                <Route exact path="/watchlists/:watchlistId(\d+)" render={props => {
                    return this.props.isLoggedIn ?
                    <WatchlistDetail watchlistId={props.match.params.watchlistId}
                    {...props} />
                    :
                        <Redirect to="/login" />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationsView