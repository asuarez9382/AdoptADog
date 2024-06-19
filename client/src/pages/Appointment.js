import React, {useState} from "react";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function Appointment(){

    const { name } = useParams();

    const [selectedType, setSelectedType] = useState('');
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState('');

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form logic
        console.log({ date, selectedType, notes });
    };

    //Next steps:
    //make api endpoint for get by name
    //add post method to appointments
    //add confirmation message
    //add appointments list

    return(
        <div className="appointment-container">
            <h1 className="appointment-title">Make an Appointment for {name}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Appointment Date:</label>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="MM/dd/yyyy"
                        className="date-picker"
                        minDate={new Date()}
                    />
                </div>
                <div className="form-group">
                    <label>Type: </label>
                    <select id="type" className="form-control custom select" value={selectedType} onChange={handleTypeChange}>
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
        
    );
}

export default Appointment;