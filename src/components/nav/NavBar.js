/*
    NavBar.js

    Purpose:    This component is responsible for rendering the NavBar.
                NavBar will render dynamically based on whether a user is
                logged in or not. NavBar handles the logout functionality
                via a dropdown on the dynamically rendered "username" button.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DropdownButton from 'react-bootstrap/DropdownButton'

// STYLES
import './NavBar.css'

// MODULES
import { activeUsername } from '../../modules/activeUser'
import Dropdown from 'react-bootstrap/Dropdown'

class NavBar extends Component {
    render() {

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
                        <DropdownButton
                            id="username-btn"
                            title={activeUsername()}
                            variant="link"
                        >
                            <Dropdown.Item onClick={this.props.clearUser}>
                                Logout
                            </Dropdown.Item>
                        </DropdownButton>
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