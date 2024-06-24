import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { DogContext } from "../components/AppContext";
import AppointmentConfirmation from "../components/AppointmentConfirmation";
import AppointmentList from "../components/AppointmentList";
import AppointmentForm from "../components/AppointmentForm";


function Appointment(){

    const { name } = useParams();
    
    const { showConfirmation } = useContext(DogContext);

    // style filtered dogs page to look like available dogs page
    // make about page
    // make error page
    //make a footer

    

    return (
        showConfirmation ? (
            <AppointmentConfirmation />
        ) : (
            <div className="appointment-page">
                <AppointmentList name={name} />
                <AppointmentForm />
            </div>
        )
    );
}

export default Appointment;