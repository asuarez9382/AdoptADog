import React, { useContext } from "react";
import { useFormik } from "formik";
import { DogContext } from "./AppContext";
import { userFormSchema } from "../formSchema";


function UserForm() {

    const { userList, setUserList } = useContext(DogContext)

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: userFormSchema,
        onSubmit: values => {
            fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: values.username,
                    email: values.email,
                    password: values.password
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('New user data:', data);
                return setUserList([...userList, data])
    
            })
            .catch(error => {
                console.error('Error adding new dog:', error);
            });
            formik.resetForm();
        }
    });

    return(
        <div className="signup-form">
            <h1>Sign up</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={formik.username}
                        onChange={formik.handleChange}
                    />
                    <p className="form-error"> {formik.errors.username}</p>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="text"
                        name="email"
                        placeholder="Enter a valid email"
                        value={formik.email}
                        onChange={formik.handleChange}
                    />
                    <p className="form-error"> {formik.errors.email}</p>
                </div>
                <div className="form-group">
                    <label>Create a Password</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formik.password}
                        onChange={formik.handleChange}
                    />
                    <p className="form-error"> {formik.errors.password}</p>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input 
                        type="password"
                        name="password-confirmation"
                        placeholder="Confirm Password"
                        value={formik.confirm_password}
                        onChange={formik.handleChange}
                    />
                    <p className="form-error"> {formik.errors.confirm_password}</p>
                </div>
            </form>
        </div>
    );
}

export default UserForm;