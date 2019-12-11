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
        email: '',
        password: ''
    }

    handleFieldChange = e => {
        // update email and password in state with every keystroke in input field
        this.setState({[e.target.id]: e.target.value})
    }

    handleLogin = e => {
        e.preventDefault()
        const { email, password } = this.state
        authApiManager.getAllUsers(`email=${email.toLowerCase()}&password=${password}`)
        .then(user => {
            if (user.length > 0) {
                
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
                            id="email"
                            type="text"
                            placeholder="email@email.com"
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