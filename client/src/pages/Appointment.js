import React, {useContext, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { DogContext } from "../components/AppContext";
import moment from 'moment';


function Appointment(){

    const { name } = useParams();

    const [selectedType, setSelectedType] = useState('');
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const [time, setTime] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const { dogList } = useContext(DogContext);

    const navigate = useNavigate();

    const selectedDog = dogList.find(dog => dog.name === name)


    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form logic


        const datetime = moment.utc(date).hour(parseInt(time)).minute(0).second(0).toISOString();

        const appointmentData = {
            date: datetime,
            type: selectedType,
            notes: notes
        };


        const dog = dogList.find(dog => dog.name === name);

        
        if (!dog) {
            console.error("Dog not found");
            return;
        }

        const dog_id = dog.id;


        fetch("http://127.0.0.1:5555/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                dog_id: dog_id,
                type: selectedType,
                date: datetime,
                notes: notes
            })
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            return response.json()
        })
        .then(data => {
            dog.appointments.push(data)
            setShowConfirmation( prevState => !prevState)
            setTimeout(() => {
                navigate("/"); 
            }, 1000);
        })
    };


    const valid = (current) => {
        // Can only select dates from today onwards
        return current.isAfter(moment().subtract(1, 'day'));
    };


    const renderTimeOptions = () => {
        const times = Array.from({ length: 24 }, (_, i) => i); // Array of hours from 0 to 23
        return times.map(hour => (
            <option key={hour} value={hour}>
                {hour.toString().padStart(2, '0')}:00
            </option>
        ));
    };

    return (
        showConfirmation ? (
            <div className="confirmation-container">
                <div className="confirmation-card">
                    <h1 className="confirmation-message">Appointment Confirmed!</h1>
                </div>
            </div>
        ) : (
            <div className="appointment-page">
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
                <div className="appointment-container">
                    <h1 className="appointment-title">Make an Appointment for {name}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="date">Appointment Date and Time:</label>
                            <Datetime
                                value={date}
                                onChange={setDate}
                                dateFormat="MM-DD-YYYY"
                                timeFormat={false}
                                className="date-picker"
                                isValidDate={valid}
                            />
                        </div>
                        {date && (
                            <div className="form-group">
                                <label htmlFor="time">Select Time:</label>
                                <select id="time" className="form-control custom-select" value={time} onChange={handleTimeChange}>
                                    <option value="">Select a time</option>
                                    {renderTimeOptions()}
                                </select>
                            </div>
                        )}
                        <div className="form-group">
                            <label>Type: </label>
                            <select id="type" className="form-control custom-select" value={selectedType} onChange={handleTypeChange}>
                                <option value="">Select a type</option>
                                <option value="check-up">Check-up</option>
                                <option value="vaccination">Vaccination</option>
                                <option value="surgery">Surgery</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Notes: </label>
                            <textarea
                                id="notes"
                                className="form-control"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-button-container">
                            <button type="submit" className="form-submit-button">Book Appointment</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
}

export default Appointment;