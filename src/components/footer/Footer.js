import React, { Component } from 'react'

import './Footer.css'

class Footer extends Component {
    render() {
        return (
            <footer className="footer bg-dark text-white">
                <div className="tmbd-credit">
                    <picture>
                        <img id="tmbd-logo" src="https://www.themoviedb.org/assets/2/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg" alt="The Movie Database" />
                    </picture>
                    <p>This product uses the TMDb API but is not endorsed or certified by TMDb.
                    </p>
                    <a href="https://www.themoviedb.org/" target="_blank">www.themoviedb.org</a>
                </div>
            </footer>
        )
    }
}

export default Footer