import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { DogContext } from './AppContext'; // Assuming this is where your DogContext is defined

const AppointmentForm = () => {
    const { name } = useParams();
    const { dogList, setShowConfirmation } = useContext(DogContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            selectedType: '',
            date: null,
            notes: '',
            time: ''
        },
        validationSchema: Yup.object({
            selectedType: Yup.string().required('Type is required'),
            date: Yup.string()
                        .transform((value, originalValue) => {
                            const formattedDate = moment(originalValue).format('MM-DD-YYYY');
                            return formattedDate === 'Invalid date' ? originalValue : formattedDate;
                        })
                        .required('Date is required')
                        .test('date-format', 'Date format should be MM-DD-YYYY and a valid date', value => {
                            return moment(value, 'MM-DD-YYYY', true).isValid();
                        })
                        .test('date-not-past', 'Date cannot be in the past', value => {
                            return moment(value, 'MM-DD-YYYY').isSameOrAfter(moment(), 'day');
                        }),
                    time: Yup.string().required('Time is required'),
                    notes: Yup.string()
                            }),
        onSubmit: (values) => {
            const datetime = moment.utc(values.date).hour(parseInt(values.time)).minute(0).second(0).toISOString();
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
                body: JSON.stringify({
                    dog_id: dog_id,
                    type: values.selectedType,
                    date: datetime,
                    notes: values.notes
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                dog.appointments.push(data);
                setShowConfirmation(prevState => !prevState);
                setTimeout(() => {
                    setShowConfirmation(prevState => !prevState);
                    navigate("/");
                }, 1000);
            })
            .catch(error => console.error("Error:", error));
        }
    });

    const valid = (current) => {
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
        <div className="appointment-container">
            <h1 className="appointment-title">Make an Appointment for {name}</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="date">Appointment Date and Time:</label>
                    <Datetime
                        value={formik.values.date}
                        onChange={(value) => formik.setFieldValue('date', value)}
                        dateFormat="MM-DD-YYYY"
                        timeFormat={false}
                        className="date-picker"
                        isValidDate={valid}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.date && formik.errors.date && (
                        <div className="form-error">{formik.errors.date}</div>
                    )}
                </div>
                {formik.values.date && (
                    <div className="form-group">
                        <label htmlFor="time">Select Time:</label>
                        <select
                            id="time"
                            className="form-control custom-select"
                            value={formik.values.time}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            <option value="">Select a time</option>
                            {renderTimeOptions()}
                        </select>
                        {formik.touched.time && formik.errors.time && (
                            <div className="form-error">{formik.errors.time}</div>
                        )}
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="selectedType">Type:</label>
                    <select
                        id="selectedType"
                        className="form-control custom-select"
                        value={formik.values.selectedType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="">Select a type</option>
                        <option value="check-up">Check-up</option>
                        <option value="vaccination">Vaccination</option>
                        <option value="surgery">Surgery</option>
                    </select>
                    {formik.touched.selectedType && formik.errors.selectedType && (
                        <div className="form-error">{formik.errors.selectedType}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <textarea
                        id="notes"
                        className="form-control"
                        value={formik.values.notes}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.notes && formik.errors.notes && (
                        <div className="form-error">{formik.errors.notes}</div>
                    )}
                </div>
                <div className="form-button-container">
                    <button type="submit" className="form-submit-button">Book Appointment</button>
                </div>
            </form>
        </div>
    );
}

export default AppointmentForm;
