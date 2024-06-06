import React from "react";

export function getUserPage({ id, username }){
    fetch(`/users/${id}`)
    .then(response => {
        if(!response){
            throw new Error('Network response was not ok');
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
}

