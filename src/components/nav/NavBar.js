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
    render() {
        // styles for button link
        const btnLink = {
            border: "none",
            background: "none",
            color: "white"
        }

        return (
            <nav className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
                <h3>STREAMLINE</h3>
                {this.props.isLoggedIn ?
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/watchlists">Watchlists</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" style={btnLink}>USERNAME</button>
                        </li>
                    </ul>
                    :
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </ul>
                }
            </nav>
        )
    }
}

export default NavBar