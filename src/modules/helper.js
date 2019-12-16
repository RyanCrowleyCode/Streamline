/*
    helper.js

    Purpose:    This module exports helper functions that can be imported into
                components. 

    Author(s): Ryan Crowley
*/


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// Converts a date in the form of 'YYYY-MM-DD' to 'Month Day, Year'
export function toDatePhrase(date) {
    const month = parseInt(date.slice(5, 7))
    const monthName = months[month -1]
    const year = date.slice(0, 4)
    const day = date.slice(8, 10)

    return `${monthName} ${day}, ${year}`
    
}

// gets current logged in user
export function getLoggedInUser() {
    return localStorage.getItem("userId")
}