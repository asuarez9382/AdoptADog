import React from "react";
import { useParams } from "react-router-dom";


function Appointment(){

    const { name } = useParams();

    return(
        <h1>Make an Appoinment for {name}</h1>
    );
}

export default Appointment;