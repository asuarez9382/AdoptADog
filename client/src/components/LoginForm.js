import React, { useState } from "react";


function LoginForm(){

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            })
        })
        .then(response => {
            if (!response.ok) {
                setFormData({
                    username: "",
                    password: ""
                })
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login data:', data);
            setFormData({
                username: "",
                password: ""
            })
        })
        .catch(error => {
            console.error('Error adding new dog:', error);
        });
    }


    return(
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}> 
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-input"
                        value= {formData.username} 
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password" 
                        name="password"
                        className="form-input"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="form-button">Login</button> 
            </form>
        </div>

    );
}

export default LoginForm;