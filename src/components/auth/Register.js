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


// MODULES

class Register extends Component {
    state = {
        fullName: '',
        email: '',
        username: '',
        password1: '',
        password2: '',
        buttonDisabled: true
    }

    // update properties in state with every keystroke in input field
    handleFieldChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    render() {
        return (
            <React.Fragment>
                <div className="jumbotron text-center welcome-view">
                    <header className="welcome-header">
                        <h1 className="font-weight-light text-center">STREAMLINE</h1>
                        <h3 className="font-weight-light text-center">New to Streamline? Sign up. It's free!</h3>
                    </header>
                </div>
            </React.Fragment>
        )
    }
}

export default Register