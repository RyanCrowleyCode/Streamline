import React, { Component } from 'react'
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
