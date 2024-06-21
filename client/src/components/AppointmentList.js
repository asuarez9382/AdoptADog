import React from "react";
import { useContext } from "react";
import moment from 'moment';
import { DogContext } from "./AppContext";

function AppointmentList({ name }) {

    const { dogList } = useContext(DogContext);

    const selectedDog = dogList.find(dog => dog.name === name)

    return(
        <div className="appointment-list-container">
            <h2>Appointments for {name}</h2>
            {selectedDog && selectedDog.appointments && selectedDog.appointments.length > 0 ? selectedDog['appointments'].map(appointment => (
            <div className="single-appointment-container">
                <ul>
                    <p>Date: {moment(appointment['date']).format('MM/DD/YYYY')}</p>
                    <p>Time: {moment(appointment['date']).format('HH:mm')}</p>
                    <p>Type: {appointment['type']}</p>
                    <p>Notes: {appointment['notes']}</p>
                </ul>
            </div>
            ))
            : <p>No appointments</p> }
        </div>
    );
}

export default AppointmentList;