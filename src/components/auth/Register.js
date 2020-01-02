/*
    Register.js

    Purpose:    This component is responsible for rendering the Registration form
                for new users. This component will use the createNewUser method
                from authApiManagers.js to add a new user to the database.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// STYLES
import './auth.css'

// DATABASE
import authApiManager from './authApiManager'
import watchlistApiManager from '../watchlists/watchlistApiManager'


class Register extends Component {
    state = {
        fullName: '',
        email: '',
        username: '',
        password1: '',
        password2: '',
        loadingStatus: false
    }

    // update properties in state with every keystroke in input field
    handleFieldChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // if user has completed all fields and all fields meet the requirements,
    // then register new user and log in new user.
    handleRegister = e => {
        e.preventDefault()
        const { password1, password2 } = this.state

        // Check if passwords match
        if (password1 === password2 && password1 !== "") {
            this.setState({ loadingStatus: true })
            const newUser = {
                fullName: this.state.fullName,
                email: this.state.email.toLowerCase(),
                username: this.state.username,
                password: this.state.password1
            }

            // Make sure email is unique
            authApiManager.getAllUsers(`email=${newUser.email}`)
                .then(users => {
                    if (users.length === 0) {
                        // Make sure username is unique
                        authApiManager.getAllUsers(`username=${newUser.username}`)
                            .then(users => {
                                if (users.length === 0) {
                                    // Valid new user, POST to database and setUser
                                    authApiManager.createNewUser(newUser)
                                        .then(user => {
                                            // create a first watchlist for that user
                                            const defaultWatchlist = {
                                                listName: "My First Watchlist",
                                                listDescription: "Add movies to your watchlist.",
                                                userId: user.id
                                            }
                                            watchlistApiManager.createNewWatchlist(defaultWatchlist)
                                            .then(watchlist => {
                                                // get user
                                                authApiManager.getAllUsers(`id=${watchlist.userId}`)
                                                .then(user => {
                                                    // setUser and enter logged in view of application
                                                    this.props.setUser(user[0])
                                                })
                                            })
                                        })
                                } else {
                                    window.alert("There is already an account with that username.")
                                    this.setState({ loadingStatus: false })
                                }
                            })
                    } else {
                        window.alert("There is already an account with that email address.")
                        this.setState({ loadingStatus: false })
                    }
                })
        } else {
            window.alert("Please make sure your passwords match")
            this.setState({ loadingStatus: false })

        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="jumbotron text-center welcome-view">
                    <header className="welcome-header">
                        <h1 className="font-weight-light text-center">STREAMLINE</h1>
                        <h3 className="font-weight-light text-center">New to Streamline? Sign up. It's free!</h3>
                    </header>
                    <form
                        id="register-form"
                        onSubmit={this.handleRegister}>
                        <div className="input-field-container">
                            <div className="register-category">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Tony Stark"
                                    onChange={this.handleFieldChange}
                                    required
                                />
                            </div>
                            <div className="register-category">
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="smartguy@stark.com"
                                    onChange={this.handleFieldChange}
                                    required
                                />
                            </div>
                            <div className="register-category">
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="ironGiant1"
                                    onChange={this.handleFieldChange}
                                    required
                                />
                            </div>
                            <div className="register-category">
                                <label htmlFor="password1">Password</label>
                                <input
                                    id="password1"
                                    type="password"
                                    placeholder="password"
                                    onChange={this.handleFieldChange}
                                    required
                                />
                            </div>
                            <div className="register-category">

                                <label htmlFor="password2">Password Again</label>
                                <input
                                    id="password2"
                                    type="password"
                                    placeholder="confirm password"
                                    onChange={this.handleFieldChange}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            value="Submit"
                            className="btn-primary"
                            disabled={this.state.loadingStatus}
                        >
                            Submit
                    </button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Register