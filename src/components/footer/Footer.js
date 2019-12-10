import React, { Component } from 'react'

import './Footer.css'

class Footer extends Component {
    render() {
        return (
            <footer id="app-footer" className="footer bg-dark text-white">
                <div className="footer-content">
                    <div className="tmbd-credit">
                        <picture>
                            <img id="tmbd-logo" src={require("../../images/tmbd-logo.svg")} alt="The Movie Database" />
                        </picture>
                        <div className="tmbd-text">
                            <p>This product uses the TMDb API but is not endorsed or certified by TMDb.
                    </p>
                            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">www.themoviedb.org</a>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer