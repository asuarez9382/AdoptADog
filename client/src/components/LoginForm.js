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
        console.log("submitted!")
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