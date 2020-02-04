import firebase from 'firebase/app'
import firebaseConfig from '../firebaseApiKeys.json'

const firebaseApp = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig.firebaseKeys)
    }
}

export default firebaseApp