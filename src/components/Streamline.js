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
                a single Watchlist to the Watchlists view.

    Author(s): Ryan Crowley
*/

import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

import './Streamline.css'
import NavBar from './nav/NavBar'
import ApplicationsView from './ApplicationViews'
import Footer from './footer/Footer'

class Streamline extends Component {

  render() {
    
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationsView />
        <Footer />
      </React.Fragment>
    )
  }
}

export default Streamline;
