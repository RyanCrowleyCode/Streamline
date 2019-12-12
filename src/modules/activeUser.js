/*
    activeUser.js

    Purpose:    This module exports helper functions that can be imported into
                components. The helper functions are designed to get the userId
                and username for the active (logged in) user as a component may
                need to know one or both pieces of information.

    Author(s): Ryan Crowley
*/

// Use this function to get the active userId
export function activeUserId() {
    return localStorage.getItem("userId")
}

// User this function to get the active username
export function activeUsername() {
    return localStorage.getItem("username")
}