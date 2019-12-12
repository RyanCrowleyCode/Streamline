/*
    authApiManager.js

    Purpose:    This module contains authorization specific fetch calls to database.json.
                This module leverages the power of StreamlineApiManager.js

    Author(s): Ryan Crowley
*/
import StreamlineApiManager from '../../modules/StreamlineApiManager'

export default {
    getAllUsers(params ="") {
        return StreamlineApiManager.getAll("users", params=`${params}`)
    },

    createNewUser(userObj) {
        return StreamlineApiManager.post("users", userObj)
    }

}