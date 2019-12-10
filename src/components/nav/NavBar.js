/*
    NavBar.js

    Purpose: This component is responsible for rendering the NavBar.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// Styles
import './NavBar.css'

class NavBar extends Component {
    render () {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Movies</Link>
                    </li>
                    <li>
                        <Link to="/watchlists">Watchlists</Link>
                    </li>
                    <li>
                        <button>USERNAME</button>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar