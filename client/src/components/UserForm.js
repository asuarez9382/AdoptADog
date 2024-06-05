import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { DogContext } from "./AppContext";
import { userFormSchema } from "../formSchema";



function UserForm() {

    const handleUsernameChange = (e) => {
        // Clear unique username error when user starts typing in username field
        setUniqueUsernameError(false);
        // Call formik's handleChange to update the form values
        formik.handleChange(e);
      };

      const handleEmailChange = (e) => {
        // Clear unique username error when user starts typing in username field
        setUniqEmailError(false);
        // Call formik's handleChange to update the form values
        formik.handleChange(e);
      };

    const { userList, setUserList } = useContext(DogContext)
    const [ uniqueUsernameError, setUniqueUsernameError ] = useState(false)
    const [ uniqueEmailError, setUniqEmailError ] = useState(false)

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
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
                if(data.length == 2){
                    console.log(data)
                    const error_messages = data[0]
                    setUniqueUsernameError(false);
                    setUniqEmailError(false);
                    for(let error of error_messages){
                        const error_words = error.split(" ")
                        if (error_words[0] == "Username"){
                            setUniqueUsernameError(true)
                        }
                        if (error_words[0] == "Email"){
                            setUniqEmailError(true)
                        }
                    }
                }
                else {
                    // Reset state variables if no error messages
                    setUniqueUsernameError(false);
                    setUniqEmailError(false);
                    formik.resetForm();
                    setUserList([...userList, data]);
                    console.log('New user data:', data);
                }
            })
            .catch(error => {
                console.error('Error adding new user:', error);
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
                        value={formik.values.username}
                        onChange={handleUsernameChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.errors.username && formik.touched.username ? <p className="form-error"> {formik.errors.username}</p> : ""}
                    { uniqueUsernameError ? <p className="form-error">Username already taken</p> : "" }
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="text"
                        name="email"
                        placeholder="Enter a valid email"
                        value={formik.values.email}
                        onChange={handleEmailChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.errors.email && formik.touched.email ? <p className="form-error"> {formik.errors.email}</p> : ""}
                    { uniqueEmailError ? <p className="form-error">Email already taken</p> : "" }
                </div>
                <div className="form-group">
                    <label>Create a Password</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.errors.password && formik.touched.password ? <p className="form-error"> {formik.errors.password}</p> : ""}
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input 
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    { formik.errors.confirmPassword && formik.touched.confirmPassword ? <p className="form-error"> {formik.errors.confirmPassword}</p> : ""}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UserForm;