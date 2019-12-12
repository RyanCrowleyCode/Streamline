/*
    StreamlineApiManager.js

    Purpose:    This module is responsible for making fetch calls to the
                internal API (database.json). This module is leveraged by
                other ApiManager modules, as this StreamlineApiManager.js
                is the template by which the other internal API Managers
                are created. Other API Managers will pass paramaters to
                StreamlineApiManager.js for their own specific requests.

    Author(s): Ryan Crowley
*/

const baseUrl = 'http://localhost:5002'

export default {
    getAll(endpoint, params ="") {
        return fetch(`${baseUrl}/${endpoint}?${params}`)
        .then(result => result.json())
    },

    post(endpoint, newObject) {
        return fetch(`${baseUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        }).then(data => data.json())
    }
}