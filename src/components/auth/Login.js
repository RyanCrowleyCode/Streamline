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
                console.log("user from fetch: ", user)
                if (user.length > 0) {
                    this.props.setUser({
                        email: loginName,
                        password: password,
                        username: user[0].username,
                        userId: user[0].id,
                        fullName: user[0].fullName
                    })
                } else {
                    authApiManager.getAllUsers(`username=${loginName}&password=${password}`)
                    .then(user => {
                        console.log("user from SECOND fetch: ", user)
                            if (user.length > 0) {
                                this.props.setUser({
                                    email: user[0].email,
                                    password: password,
                                    username: loginName,
                                    userId: user[0].id,
                                    fullName: user[0].fullName
                                })
                            } else {
                                window.alert("Hmm... please check your email/username and password")
                            }
                        })
                }
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="jumbotron text-center">
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