import React, {useState} from "react";
import { useParams } from "react-router-dom";


function Appointment(){

    const { name } = useParams();

    const [selectedType, setSelectedType] = useState('');

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    return(
        <div className="appointment-container">
            <h1 className="appointment-title">Make an Appointment for {name}</h1>
            <form>
                <div className="form-group">
                    <label>Date: </label>
                    <input 
                    
                    />
                </div>
                <div className="form-group">
                    <label>Type: </label>
                    <select id="type" value={selectedType} onChange={handleTypeChange}>
                        <option value="">Select a type</option>
                        <option value="check-up">Check-up</option>
                        <option value="vaccination">Vaccination</option>
                        <option value="surgery">Surgery</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Notes: </label>
                    <input 
                    placeholder="Anything you would like the vet to know"
                    text="text"
                    name="notes"
                    />
                </div>
            </form>
        </div>
        
    );
}

export default Appointment;