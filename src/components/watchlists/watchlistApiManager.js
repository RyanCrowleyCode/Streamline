/*
    watchlistApiManager.js

    Purpose:    This module contains watchlist specific fetch calls to 
                database.json. This module leverages the power of 
                StreamlineApiManager.js

    Author(s): Ryan Crowley
*/

// INTERNAL API FACTORY
import StreamlineApiManager from '../../modules/StreamlineApiManager'

export default {
    getOwnWatchlists(userId) {
        return StreamlineApiManager.getAll("watchlists", `userId=${userId}`)
    }
}