import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

// import './Auth.scss';

class Auth extends React.Component {
    loginClickEvent = (e) => {
        e.preventDefault()
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
    }

    logMeOut = (e) => {
        e.preventDefault()
        firebase.auth().signOut()
    }

    render() {
        return (
            <div className="Auth">
              <h1>Auth</h1>
              <button className="btn btn-secondary" onClick={this.loginClickEvent}>Login with Google</button>
              <button className="btn btn-danger my-2 my-sm-0" onClick={this.logMeOut}>Logout</button>
            </div>
            
          )
    }
}

export default Auth