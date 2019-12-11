/*
    Streamline.js

    Welcome to Streamline! Streamline is a user-based single-page application
    that allows a user to search for movies and add them to custom watchlists.
    Users can search by movie title or genre. Users can add notes to movies
    in their watchlists, and track where the movie is streaming so that they
    can view the movie later.

    LEGAL:      This application uses an external API to obtain movie information.
                API used is "The Movie Database" (https://www.themoviedb.org/). 
                This product uses the TMDb API but is not endorsed or certified by
                TMDb.

    Purpose:    This component is responsible for rendering the information for
                a single Watchlist to the Watchlists view. This component checks
                to see if a user is logged in. This component sets user 
                credentials to local storage to log in a user, and passes the 
                setUser method as props. This component uses a clearUser method 
                to log a user out of the application. This component uses a 
                loggedInUser function that gets the logged in user and passes 
                that method as props.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// STYLES
import "bootstrap/dist/css/bootstrap.min.css"
import './Streamline.css'

// COMPONENTS
import NavBar from './nav/NavBar'
import ApplicationsView from './ApplicationViews'
import Footer from './footer/Footer'

class Streamline extends Component {
  state = {
    isLoggedIn: false,
    user: {}
  }

  // check for logged in user in localStorage
  isAuthenticated = () => localStorage.getItem("streamlineCredentials") !== null


  /*  adds user info into local storage, calls isAuthenticated, and updates 
      state with user information. */
  setUser = (authObj) => {
    localStorage.setItem(
      "streamlineCredentials",
      JSON.stringify(authObj)
    )
    this.setState({
      isLoggedIn: this.isAuthenticated(),
      user: authObj
    })
  }

  // handles logout functionality
  clearUser = () => {
    localStorage.removeItem('streamlineCredentials')
  }

  // check for logged in user on rerender
  componentDidMount() {
    this.setState({
      isLoggedIn: this.isAuthenticated()
    })
  }


  render() {
    return (
      <React.Fragment>
        <NavBar isLoggedIn={isLoggedIn} />
        <ApplicationsView isLoggedIn={isLoggedIn} setUser={this.setUser} />
        <Footer />
      </React.Fragment>
    )
  }
}

export default Streamline;
