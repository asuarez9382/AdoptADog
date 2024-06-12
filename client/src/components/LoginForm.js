import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DogContext } from "./AppContext";

function LoginForm(){

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [ loginFail, setLoginFail ] = useState(false)

    const { userData, setUserData, showLogOn, setShowLogOn } = useContext(DogContext)
    const navigate = useNavigate();

    function handleChange(e) {
        setLoginFail(false)
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        //Calls login endpoint in API
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
                setLoginFail(true)
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setFormData({
                username: "",
                password: ""
            })
            //Starts calling userByID endpoint in api
            fetch(`/users/${data['id']}`)
            .then(response => {
                if(!response){
                    throw new Error('Network response was not ok');
                }
                return response.json()
            })
            .then(userData => {
                setUserData({
                    username: userData.username,
                    email: userData.email
                })
                setShowLogOn(false)
                navigate(`/users/${userData.id}`);
            })
        })
        .catch(error => {
            console.error('Error adding new dog:', error);
        });
    }


    useEffect(() => {
        if (userData.username) {
          console.log('User data updated:', userData);
        }
      }, [userData]);

    return(
        <div className="login-container">
            <h1>Login</h1>
            { loginFail ? <p>Invalid Username or Password</p> : "" }
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