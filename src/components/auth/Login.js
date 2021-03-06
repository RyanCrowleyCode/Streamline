/*
    Login.js

    Purpose:    This component is responsible for rendering the login form
                for returning users.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// STYLES
import './auth.css'

// DATABASE
import authApiManager from './authApiManager'


class Login extends Component {
    state = {
        loginName: '',
        password: ''
    }

    // update email and password in state with every keystroke in input field
    handleFieldChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    // Login the user when they press the login button
    handleLogin = e => {
        e.preventDefault()
        const { loginName, password } = this.state
        authApiManager.getAllUsers(`email=${loginName.toLowerCase()}&password=${password}`)
            .then(user => {
                // The fetch call worked, user is signing in with their
                // email and the password is correct.
                if (user.length > 0) {
                    this.props.setUser({
                        email: user[0].email,
                        password: user[0].password,
                        username: user[0].username,
                        id: user[0].id,
                        fullName: user[0].fullName
                    })
                    this.props.history.push("/")
                } else {
                    // perhaps the user is trying to login with their user name?
                    // let's give it a try.
                    authApiManager.getAllUsers(`username=${loginName}&password=${password}`)
                        .then(user => {
                            if (user.length > 0) {
                                this.props.setUser({
                                    email: user[0].email,
                                    password: user[0].password,
                                    username: user[0].username,
                                    id: user[0].id,
                                    fullName: user[0].fullName
                                })
                                this.props.history.push("/")
                            } else {
                                // at this point, either the email/username 
                                // is wrong, or the password is wrong.
                                window.alert("Hmm... please check your email/username and password")
                            }
                        })
                }
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="jumbotron text-center welcome-view">
                    <header className="welcome-header">
                        <h1 className="font-weight-light text-center">STREAMLINE</h1>
                        <h3 className="font-weight-light text-center">Watch how you want</h3>
                    </header>
                    <form
                        id="login-form"
                        onSubmit={this.handleLogin}>
                        <input
                            id="loginName"
                            type="text"
                            placeholder="email or username"
                            onChange={this.handleFieldChange}
                            required
                        />
                        <br />
                        <input
                            id="password"
                            type="password"
                            placeholder="password"
                            onChange={this.handleFieldChange}
                            required
                        />
                        <br />
                        <button
                            type="submit"
                            value="Submit"
                            className="btn-primary">
                            Login
                    </button>
                    </form>
                </div>

            </React.Fragment>
        )
    }
}

export default Login